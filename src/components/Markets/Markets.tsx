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
import { useCategoryTabsList } from '@/hooks';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import useFilter from './useFilter';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';
import { zIndexMarket } from '@/utils/zIndex';
import { ChildrenCategoriesType, SubMenuType } from '@/api/type';
import { DateRadioType, VolumeType } from '@/store/slice/dataSlice';

const empty_array = [...Array(13)];

function Markets() {
	const { Filter, isOpen } = useFilter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
	const [TabDom, selectedTab] = useCategoryTabsList();

	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();
	const { markets, isMarketsLoading } = useSelector((state: RootState) => state.homeReducer);
	const { categoriesData } = useSelector((state: RootState) => state.dataReducer);
	// useEffect(() => {
	// 	dispatch(getMarkets({ categories: '' }));
	// }, [dispatch]);

	// 第一次進網頁撈取 url query call API，使用者每次點擊 Filter 選單也會更新 url 再次觸發該區段 call API
	useEffect(() => {
		if (router.isReady) {
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

				//
				const dateValue = routerStringArray.find(
					value => value.indexOf('date') > -1
				) as DateRadioType;
				console.log('dateValue is', dateValue);
				dispatch(
					getMarkets({
						categories: queryString,
						volumeValue,
						dateValue: dateValue === 'date-custom' ? 'date-default' : dateValue,
					})
				);
			}, 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router, dispatch]);

	// display={{ lg: 'none', md: 'inline', sm: 'inline' }}
	const handelScroll = (event: Event) => {
		const target = event.target as HTMLDivElement;

		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			// call API
			console.log('Call API');
		}
	};

	return (
		<Stack
			mt={headerHeight}
			pl={{ md: '120px', sm: '16px' }}
			pr={{ md: '116px', sm: '16px' }}
			py={{ lg: '40px' }}
		>
			{/* for Desktop filter */}
			<Stack display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline' }} w="290px" mb="3">
				<Filter />
			</Stack>
			{/* for Mobile filter TabDom height is 64px */}
			{TabDom}
			<Stack
				mt={'80px'}
				mb={'16px'}
				display={{ base: 'inline', sm: 'inline', md: 'inline', lg: 'none' }}
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
			</Stack>
			<Stack mt="0" direction="row" flex="auto" h={'100vh'}>
				<Stack
					display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline' }}
					w={isOpen ? '290px' : '0px'}
					mr={isOpen ? '3' : '-2'}
					flex="none"
					transition="all 0.5s ease-in-out;"
					transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<Stack h={'100vh'} overflow="auto">
						<LeftMenu />
						{/* <Divider mt={6} borderColor="gray.300" /> */}
					</Stack>
				</Stack>
				{isMarketsLoading ? (
					<Stack w={'100%'} align={'center'}>
						<Spinner
							thickness="4px"
							speed="0.65s"
							emptyColor="gray.200"
							color="blue.500"
							size="xl"
						/>
					</Stack>
				) : (
					<Grid
						w="100%"
						h="100%"
						onScroll={(event: any) => handelScroll(event)}
						overflowY={'scroll'}
						templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'}
						gap={'16px'}
						pt={'1px'}
						pb={'10px'}
					>
						{markets?.data?.map((value, index) => {
							return <CategoryCard key={index} data={value} />;
						})}
					</Grid>
				)}
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
