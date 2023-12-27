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
	Select,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiFilter } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMarkets,
	AppDispatch,
	RootState,
	getCategories,
	resetVolumeAndDateStatus,
	resetRouterPath,
} from '@/store';
import { SkeletonCard } from '@/components/common';
import { useCategoryTabsList } from '@/hooks';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import useFilter from './useFilter';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';
import { zIndexMarket } from '@/utils/zIndex';
import { ChildrenCategoriesType, SubMenuType } from '@/api/type';
import { DateRadioType, VolumeType } from '@/store/slice/dataSlice';

const additionalHeight = '100px';

const dummyArrayCount = [...Array(20)];
const dummyArray = [
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
	{
		outcome: { yes: 0.6, no: 0.4 },
		id: 'e4aead1d-0b35-48df-ac15-5f4a85e93c89',
		slug: 'test',
		title: 'test1',
		image: 'https://google.com',
		startDate: '2023-12-07T18:46:53.807Z',
		endDate: '2023-12-07T18:46:53.807Z',
		initialPrice: 0.5,
		settlePrice: 1,
		volume: 0,
		liquidity: 0,
		category: { slug: 'exchanges', name: 'Exchanges' },
	},
];

let firstRender = true;

function Markets() {
	const { Filter, isOpen } = useFilter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
	const [TabDom, selectedTab] = useCategoryTabsList();
	const [selectorValue, setSelectorValue] = useState('trending');

	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();
	const { markets, isMarketsLoading, userSelectedMarketsStartDate, userSelectedMarketsEndDate } =
		useSelector((state: RootState) => state.homeReducer);
	const { categoriesData } = useSelector((state: RootState) => state.dataReducer);
	// useEffect(() => {
	// 	dispatch(getMarkets({ categories: '' }));
	// }, [dispatch]);
	console.log('markets =>', markets);
	// 第一次進網頁撈取 url query call API，使用者每次點擊 Filter 選單也會更新 url 再次觸發該區段 call API
	useEffect(() => {
		if (router.isReady) {
			console.log('Markets useEffect =>');
			setTimeout(() => {
				let queryString = '';
				const { categories } = router.query;
				const routerString = categories as string;
				let routerStringArray: string[] = [];

				if (routerString?.includes(',')) {
					routerStringArray = routerString?.split(',');
				}

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
						subMenuValue.childrenCategories.forEach((childrenMenuData: ChildrenCategoriesType) => {
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
				const volumeValue = routerStringArray.find(
					value => value.indexOf('volume') > -1
				) as VolumeType;

				// 篩選符合所篩選的 Date radio 選取值
				const dateValue = routerStringArray.find(
					value => value.indexOf('date') > -1
				) as DateRadioType;

				console.log('Markets useEffect dateValue', dateValue);
				console.log('Markets useEffect date', {
					userSelectedMarketsStartDate,
					userSelectedMarketsEndDate,
				});

				if (dateValue !== 'date-custom') {
					console.log('Markets useEffect => 1');
					dispatch(
						getMarkets({
							categories: queryString,
							volumeValue,
							dateValue,
						})
					);
				} else {
					// 使用者有輸入開始與結束時間區段 才去 call API
					if (userSelectedMarketsStartDate && userSelectedMarketsEndDate) {
						dispatch(
							getMarkets({
								categories: queryString,
								volumeValue,
								dateValue,
								startDate: userSelectedMarketsStartDate ? userSelectedMarketsStartDate : '',
								endDate: userSelectedMarketsEndDate ? userSelectedMarketsEndDate : '',
							})
						);
					} else if (firstRender) {
						// 第一次直接開啟網頁若為 date-custom 卻沒時間的值，預設 call API 全部資料
						dispatch(
							getMarkets({
								categories: queryString,
								volumeValue,
								dateValue,
							})
						);

						firstRender = false;
					}
				}
			}, 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, dispatch, userSelectedMarketsStartDate]);

	// display={{ lg: 'none', md: 'inline', sm: 'inline' }}
	const handelScroll = (event: Event) => {
		const target = event.target as HTMLDivElement;

		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			// call API
			console.log('Call API');
		}
	};
	console.log('markets data', JSON.stringify(markets.data));
	const renderSelector = () => {
		return (
			<Stack>
				<Select
					border={'1px'}
					borderColor={'gray.200'}
					bg={'#fff'}
					w="220px"
					placeholder=""
					size="md"
					value={selectorValue}
					onChange={e => setSelectorValue(e.target.value)}
				>
					<option value="trending">Trending</option>
					<option value="volume">Volume</option>
					<option value="newest">Newest</option>
					<option value="endingSoonest">Ending Soonest</option>
				</Select>
			</Stack>
		);
	};

	return (
		<Stack
			h={`calc(100vh - ${headerHeight} - ${additionalHeight})`}
			mt={headerHeight}
			pl={{ md: '120px', sm: '16px' }}
			pr={{ md: '116px', sm: '16px' }}
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
				{renderSelector()}
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
					templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'}
					gap={'20px'}
					pt={'1px'}
					pb={'190px'}
				>
					{Object.keys(markets).length === 0
						? dummyArrayCount.map((value, index) => {
								return <SkeletonCard key={index} />;
						  })
						: markets?.data?.map((value, index) => {
								return <CategoryCard isLoading={isMarketsLoading} key={index} data={value} />;
						  })}
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
							onClick={() => {
								dispatch(getCategories());
								dispatch(resetVolumeAndDateStatus({}));
								router.push('/markets', undefined, { shallow: true });
							}}
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
