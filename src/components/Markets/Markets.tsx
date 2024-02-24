import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Stack,
	Divider,
	Grid,
	Center,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Spinner,
	Text,
	Select,
	ScaleFade,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiFilter, BiX } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMarkets,
	AppDispatch,
	RootState,
	getCategories,
	resetVolumeAndDateStatus,
	resetRouterPath,
	filterSortSelector,
} from '@/store';
import { SkeletonCard } from '@/components/common';
import { useCategoryTabsList } from '@/hooks';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import useFilter from './useFilter';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';
import { zIndexMarket } from '@/utils/zIndex';
import { ChildrenCategoriesType, SubMenuType } from '@/api/type';
import {
	DateRadioType,
	VolumeType,
	SortDescType,
	sortSelectorArray,
	volumeRadioArray,
	dateRadioArray,
} from '@/store/slice/dataSlice';

const additionalHeight = '100px';

const dummyArrayCount = [...Array(20)];

let isFirstRender = true;

function Markets() {
	const { Filter, isOpen } = useFilter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
	const [TabDom, selectedTab] = useCategoryTabsList();
	const [selectorValue, setSelectorValue] = useState(sortSelectorArray[0]);

	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();
	const { markets, isMarketsLoading } = useSelector((state: RootState) => state.homeReducer);
	const { categoriesData, routerPath } = useSelector((state: RootState) => state.dataReducer);
	console.log('markets =>', markets);
	// 過濾 url stirng 去 call API
	// 預設網址 /markets
	// 有參數條件 /markets?categories=分類,分類,sort排序,volume,&startDate=timeStamp&endDate=timeStamp
	// 網址字串順序一定是： 1.分類在最前面  2.排序 3. Volume 4. date
	const filterQueryString = (
		categories: any,
		startDate: any,
		endDate: any
	): {
		queryString: string;
		volumeValue: VolumeType;
		dateValue: DateRadioType;
		startTimeStamp: number;
		endTimeStamp: number;
	} => {
		let queryString = '';

		const routerString = categories as string;
		let routerStringArray: string[] = [];

		if (routerString?.includes(',')) {
			routerStringArray = routerString?.split(',');
		}

		// 篩選各個分類的選單資料
		categoriesData[0].menuData[2].subMenuData.forEach((subMenuValue: SubMenuType) => {
			const subMenuExistedString = routerStringArray.find(value => value === subMenuValue.slug);
			if (subMenuExistedString) {
				subMenuValue.childrenCategories.forEach((childrenMenuData: ChildrenCategoriesType) => {
					if (queryString === '') {
						queryString += childrenMenuData.slug;
					} else {
						queryString += `,${childrenMenuData.slug}`;
					}
				});
			} else {
				subMenuValue?.childrenCategories?.forEach((childrenMenuData: ChildrenCategoriesType) => {
					const childrenMenuExistedString = routerStringArray.find(
						value => value === childrenMenuData.slug
					);
					if (childrenMenuExistedString) {
						if (queryString === '') {
							queryString += childrenMenuData.slug;
						} else {
							queryString += `,${childrenMenuData.slug}`;
						}
					}
				});
			}
		});

		// 篩選符合所篩選的 Volume 範圍設定值
		const volumeValue = routerStringArray.find(value => {
			// 排除 sort 選單的值 避免跟分類衝突
			if (
				value.indexOf('volume') > -1 &&
				sortSelectorArray.filter(sortValue => sortValue !== value)
			) {
				return value;
			}
		}) as VolumeType;

		// 篩選符合所篩選的 Sort 範圍設定值
		const sortValue = routerStringArray.find(value => {
			if (sortSelectorArray.find(sortValue => sortValue === value)) {
				return value;
			}
		}) as SortDescType;

		// 篩選符合所篩選的 Date radio 選取值
		const dateValue = routerStringArray.find(value => value.indexOf('date') > -1) as DateRadioType;

		// 若有排序 加排序加入至最後的 query 裡面
		if (sortValue) {
			queryString += `&sort=${sortValue}`;
		}

		return {
			queryString,
			volumeValue,
			dateValue,
			startTimeStamp: startDate ? Number(startDate) : 0,
			endTimeStamp: endDate ? Number(endDate) : 0,
		};
	};

	// 確認任一選單是否有被勾選
	const itemsIsClicked = () => {
		let isAtLeastOneItemClicked = false;

		categoriesData?.forEach(menuValue => {
			// 如果 Volume 不是第一個預設值
			if (menuValue?.menuData[0].selectedValue !== volumeRadioArray[0]) {
				isAtLeastOneItemClicked = true;
			}
			// 如果 Date 不是第一個預設值
			if (menuValue?.menuData[1].selectedValue !== dateRadioArray[0]) {
				isAtLeastOneItemClicked = true;
			}
			// 如果任一個分選選單有被勾選
			console.log('menuValue', menuValue);
			menuValue?.menuData[2].subMenuData?.forEach(subMenuValue => {
				subMenuValue?.childrenCategories?.forEach(childrenMenuValue => {
					if (childrenMenuValue.itemSelected) {
						isAtLeastOneItemClicked = true;
					}
				});
			});
		});

		return isAtLeastOneItemClicked;
	};

	// 使用者每次點擊 Filter 相關選單去更新 url 時，觸發該區段 call API
	useEffect(() => {
		if (router.isReady) {
			console.log('Markets useEffect 1');
			// let queryString = '';
			const { categories, startDate, endDate } = router.query;

			const { queryString, volumeValue, dateValue, startTimeStamp, endTimeStamp } =
				filterQueryString(categories, startDate, endDate);

			// 要有成功抓到分類資料選單 才 Call API
			if (categoriesData[0].menuData[2].subMenuData?.length <= 0) {
				return;
			}

			// routerPath 為空表示第一次進入 Markets 網頁 或 使用者有點擊選單更新過 url
			if (routerPath === '') {
				console.log('Markets useEffect CALL API old');
				dispatch(
					getMarkets({
						categories: queryString,
						volumeValue,
						dateValue,
						startDate: startTimeStamp,
						endDate: endTimeStamp,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, dispatch]);

	// 第一次進入 /markets 頁面時，只執行一次 call API
	useEffect(() => {
		if (router.isReady) {
			// 要有成功抓到分類資料選單 才 Call API
			if (categoriesData[0].menuData[2].subMenuData?.length <= 0) {
				return;
			}
			const { categories, startDate, endDate } = router.query;

			const { queryString, volumeValue, dateValue, startTimeStamp, endTimeStamp } =
				filterQueryString(categories, startDate, endDate);

			if (isFirstRender) {
				isFirstRender = false;
				dispatch(
					getMarkets({
						categories: queryString,
						volumeValue,
						dateValue,
						startDate: startTimeStamp,
						endDate: endTimeStamp,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoriesData]);

	// 根據 URL 設置 Sort 選單
	useEffect(() => {
		if (router.isReady) {
			const path = router.asPath;

			const sortValue = sortSelectorArray.find(value => path.includes(value));
			if (sortValue) {
				setSelectorValue(sortValue);
			}
		}
	}, [router]);

	// display={{ lg: 'none', md: 'inline', sm: 'inline' }}
	const handelScroll = (event: Event) => {
		const target = event.target as HTMLDivElement;

		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			// call API
			console.log('Call API');
		}
	};

	const renderSelector = () => {
		return (
			<Stack w={'100%'} align={'flex-end'}>
				<Select
					_hover={{ bg: 'gray.100' }}
					cursor={'pointer'}
					_focusVisible={{
						outline: 'none',
					}}
					border={'1px'}
					borderColor={'gray.200'}
					bg={'#fff'}
					w="220px"
					placeholder=""
					size="md"
					value={selectorValue}
					onChange={(e: any) => {
						setSelectorValue(e.target.value);
						dispatch(
							filterSortSelector({ sortValue: e.target.value, routerAsPath: router.asPath })
						);
					}}
				>
					<option value={sortSelectorArray[0]}>Trending</option>
					<option value={sortSelectorArray[1]}>Volume</option>
					<option value={sortSelectorArray[2]}>Newest</option>
					<option value={sortSelectorArray[3]}>Ending Soonest</option>
				</Select>
			</Stack>
		);
	};

	const resetDefautStatus = () => {
		setSelectorValue(sortSelectorArray[0]); // 排序 Selector 恢復第一個預設值
		dispatch(getCategories()); // 重新撈取分類選單
		dispatch(resetVolumeAndDateStatus({})); // 恢復 Volume 和 Date 相關選單資料為預設值
		router.push('/markets', undefined, { shallow: true }); // 恢復預設網址 但不重新刷新網頁
	};

	return (
		<Stack
			h={`calc(100vh - ${headerHeight} - ${additionalHeight})`}
			mt={headerHeight}
			// pl={{ md: '120px', sm: '16px' }}
			// pr={{ md: '116px', sm: '16px' }}
			pl={{ md: '3%', sm: '16px' }}
			pr={{ md: '3%', sm: '16px' }}
			py={{ lg: '40px' }}
		>
			{/* for Desktop filter */}
			<Stack
				direction={'row'}
				justify={'space-between'}
				display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
				mb="3"
			>
				<Stack w="290px">
					<Filter />
				</Stack>
				<Stack pl={4} direction={'row'} justify={'space-between'} flexShrink={36} w={'100%'}>
					{itemsIsClicked() ? (
						<ScaleFade initialScale={0.9} in={itemsIsClicked()}>
							<Button
								onClick={() => resetDefautStatus()}
								rightIcon={<BiX />}
								color={'gray.500'}
								variant="outline"
							>
								Clear All
							</Button>
						</ScaleFade>
					) : null}
					{renderSelector()}
				</Stack>
			</Stack>
			{/* for Mobile filter TabDom height is 64px */}
			{TabDom}
			<Stack
				direction={'row'}
				mt={'80px'}
				mb={'16px'}
				display={{ base: 'inline-flex', sm: 'inline-flex', md: 'inline-flex', lg: 'none' }}
			>
				<Button
					w={'100%'}
					onClick={onOpen}
					leftIcon={<Icon as={BiFilter} />}
					colorScheme="teal"
					variant="solid"
				>
					Filter
				</Button>
				{renderSelector()}
			</Stack>
			<Stack
				mt="0"
				direction="row"
				flex="auto"
				h={`calc(100vh - ${headerHeight} - ${additionalHeight})`}
			>
				<Stack
					display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline' }}
					w={isOpen ? '290px' : '0px'}
					mr={isOpen ? '3' : '-2'}
					flex="none"
					transition="all 0.5s ease-in-out;"
					transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<Stack h={`calc(100vh - ${headerHeight} - ${additionalHeight})`} overflow="auto">
						<LeftMenu />
						{/* <Divider mt={6} borderColor="gray.300" /> */}
					</Stack>
				</Stack>
				<Grid
					w="100%"
					onScroll={(event: any) => handelScroll(event)}
					overflowY={'scroll'}
					templateColumns={markets?.length === 0 ? '' : 'repeat(auto-fill, minmax(290px, 1fr))'}
					gap={'20px'}
					pt={'1px'}
					pb={{
						lg: `calc(100vh - ${headerHeight} - ${additionalHeight})`,
						md: `calc(100vh - ${headerHeight} - ${additionalHeight})`,
						sm: '40px',
					}}
				>
					{isMarketsLoading && markets?.length === 0 ? (
						dummyArrayCount.map((value, index) => {
							return <SkeletonCard key={index} />;
						})
					) : markets?.length === 0 ? (
						<ScaleFade initialScale={0.9} in={true}>
							<Text textAlign={'center'} color={'gray.500'} fontSize={'md'}>
								No results found
							</Text>
						</ScaleFade>
					) : (
						markets?.map((value, index) => {
							return <CategoryCard isLoading={isMarketsLoading} key={index} data={value} />;
						})
					)}
				</Grid>
			</Stack>

			<Modal size="full" isOpen={isModalOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800">
						Filter
					</ModalHeader>
					<ModalCloseButton size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack position={'relative'}>
							<LeftMenu />
							{/* <Center>
								<Divider m={8} borderColor="gray" />
							</Center> */}
						</Stack>
					</ModalBody>
					<Stack
						w={'100%'}
						flexDirection="row"
						position="fixed"
						bottom={0}
						zIndex={zIndexMarket}
						pl={6}
						pr={6}
						pt={4}
						pb={4}
						bg={'#FFFFFF'}
						borderColor={'black'}
						borderTop="1px solid #E2E8F0;"
					>
						<Button
							w={'100%'}
							onClick={() => resetDefautStatus()}
							bg="#fff"
							borderColor="#ccd0d5"
							color="teal.500"
							border="1px"
						>
							Clear All
						</Button>
						<Button w={'100%'} onClick={onClose} colorScheme="teal" variant="solid">
							Done
						</Button>
					</Stack>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default Markets;
