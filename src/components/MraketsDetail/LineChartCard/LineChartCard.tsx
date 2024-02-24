import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
	Stack,
	Card,
	CardBody,
	Heading,
	Text,
	Image,
	Tag,
	TagLabel,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Icon,
	SkeletonCircle,
	SkeletonText,
	useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getMarketDetail,
	AppDispatch,
	RootState,
	queryUrlToChangeMenuStatus,
	getMarketOrderBookYes,
	getMarketOrderBookNo,
	getMarketLineChart,
	getMarketLineChartYesAndNo,
} from '@/store';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import { SettingsIcon } from '@chakra-ui/icons';
import { HiChartBar, HiClock } from 'react-icons/hi';
import { LineChartTabsIntervalType } from '@/api';

const data = [
	{
		time: '01/31',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/01',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/02',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/03',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/04',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/05',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/04',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/05',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/04',
		Yes: 0.5,
		No: 0.8,
	},
	{
		time: '02/05',
		Yes: 0.5,
		No: 0.8,
	},
];
// const data = [
// 	{
// 		name: 'Page A',
// 		bu: 4000,
// 		pv: 2400,
// 		amt: 2400,
// 	},
// 	{
// 		name: 'Page B',
// 		uv: 3000,
// 		pv: 1398,
// 		amt: 2210,
// 	},
// 	{
// 		name: 'Page C',
// 		uv: 2000,
// 		pv: 9800,
// 		amt: 2290,
// 	},
// 	{
// 		name: 'Page D',
// 		uv: 2780,
// 		pv: 3908,
// 		amt: 2000,
// 	},
// ];

function LineChartCard() {
	const [selectedTab, setSelectedTab] = useState<LineChartTabsIntervalType>('6h');

	const {
		isMarketDetailLoading,
		marketDetailData,
		isUserClickYesOrNo,
		lineChartData,
		yesAndNoLineChartData,
	} = useSelector((state: RootState) => state.homeReducer);

	const router = useRouter();

	const toast = useToast();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (router.isReady) {
			const { marketSlug } = router.query;

			dispatch(
				getMarketLineChart({
					slug: marketSlug as string,
					outcome: isUserClickYesOrNo ? 'YES' : 'NO',
					interval: selectedTab,
				})
			);

			dispatch(getMarketLineChartYesAndNo({ slug: marketSlug as string, interval: selectedTab }));
		}
	}, [router, dispatch, isUserClickYesOrNo, selectedTab]);

	const renderBuyOrSellInfo = () => {
		const { outcome } = marketDetailData;

		return (
			<>
				<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
					{isUserClickYesOrNo ? 'Yes' : 'No'}
				</Heading>
				<Heading fontSize={'24px'} color={'gray.800'} fontWeight={'700'} lineHeight={'14px'}>
					{`${isUserClickYesOrNo ? outcome.yes : outcome.no} USDT`}
				</Heading>
			</>
		);
	};

	const checkIntervalDistance = (dataLength: number) => {
		const distance = Math.floor(dataLength / 8);

		return distance;
	};

	const renderLineChart = () => {
		// 若加入 ResponsiveContainer 會將所有x元素 限縮在表格裡面
		// 改用 ScrollContainer 讓x元素展開可以左右滑動
		if (yesAndNoLineChartData.length > 0) {
			return (
				<Stack w={'100%'} h={'100%'}>
					<Stack mt={'8px'} height={'415px'}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={yesAndNoLineChartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="Time"
									tick={{ fontSize: 14 }}
									interval={checkIntervalDistance(yesAndNoLineChartData.length)}
								/>
								<YAxis />
								<Tooltip />
								{/* <Legend /> */}
								<Line type="monotone" dataKey="Yes" stroke="#82ca9d" activeDot={{ r: 8 }} />
								<Line type="monotone" dataKey="No" stroke="red" activeDot={{ r: 8 }} />
							</LineChart>
						</ResponsiveContainer>
					</Stack>
				</Stack>
			);
			return (
				<Stack w={'100%'} h={'100%'}>
					<Stack mt={'8px'} height={'415px'}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={lineChartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="time" tick={{ fontSize: 14 }} />
								<YAxis dataKey="price" />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
								<Line type="monotone" dataKey="price" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</Stack>
				</Stack>
			);
		}

		return (
			<Text pt={34} textAlign={'center'} color={'gray.500'} fontSize={'md'}>
				No data found
			</Text>
		);

		// return (
		// 	<ScrollContainer>
		// 		<Stack width={'100%'}>
		// 			<LineChart width={1000} height={400} data={lineChartData}>
		// 				<CartesianGrid strokeDasharray="3 3" />
		// 				<XAxis dataKey="time" tick={{ fontSize: 14 }} />
		// 				<YAxis dataKey="price" />
		// 				<Tooltip />
		// 				<Legend />
		// 				<Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{ r: 8 }} />
		// 				<Line type="monotone" dataKey="price" stroke="#82ca9d" />
		// 			</LineChart>
		// 		</Stack>
		// 	</ScrollContainer>
		// );
	};

	const renderPercent = () => {
		const { outcome } = marketDetailData;

		let percent = '';

		const yesOrNoData = isUserClickYesOrNo ? outcome.yes : outcome.no;
		const isLargerThenInitData = yesOrNoData > 0.5;

		if (isLargerThenInitData) {
			percent += '+';
		}

		percent += `${((yesOrNoData - 0.5) / 0.5).toFixed(2)}%`;

		return (
			<>
				<Heading
					fontSize={'14px'}
					color={isLargerThenInitData ? 'red.400' : 'green.600'}
					fontWeight={'700'}
				>
					{percent}
				</Heading>
			</>
		);
	};

	return (
		<Card shadow="lg" border="1px solid #E2E8F0;" borderRadius="3xl">
			<CardBody>
				{isMarketDetailLoading ? (
					<>
						<Stack direction={'row'}>
							<SkeletonCircle borderRadius={8} size="120px" />
							<Stack pl={4} pt={{ base: '0px', sm: '0px', md: '0px', lg: '26px' }} pb={4}>
								<SkeletonText w={'60px'} noOfLines={1} spacing="0" skeletonHeight="4" />
								<SkeletonText mt="4" w={'120px'} noOfLines={1} spacing="0" skeletonHeight="4" />
							</Stack>
						</Stack>
						<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
					</>
				) : (
					<>
						<Stack direction="row">
							<Image
								height="120px"
								width="120px"
								src={marketDetailData?.image ? marketDetailData?.image : ''}
								alt="Green double couch with wooden legs"
								borderRadius="lg"
							/>
							<Stack
								pl={4}
								pt={{ base: '0px', sm: '0px', md: '0px', lg: '26px' }}
								pb={4}
								w={'100%'}
							>
								<Stack direction="row" justify="space-between">
									<Tag
										px={4}
										py={1}
										border="1px"
										bg="pink.500"
										borderColor="pink.500"
										size={'sm'}
										colorScheme="undefined"
										borderRadius={'md'}
									>
										<TagLabel
											cursor={'pointer'}
											onClick={() => {
												// 變更 /markets 路徑下的目錄選單選取狀態
												dispatch(
													queryUrlToChangeMenuStatus({
														queryString: `${marketDetailData.category.slug},`,
													})
												);
												// 接著將頁面導回 markets 並附上 qeury 參數 讓 Markets 底下的 useEffect 去 call API
												router.push(`/markets?categories=${marketDetailData.category.slug},`);
											}}
											color="#fff"
										>
											{marketDetailData?.category?.name}
										</TagLabel>
									</Tag>
									<AttachmentIcon
										cursor="pointer"
										onClick={() => {
											if (typeof window !== 'undefined') {
												const origin = window.location.origin;
												const URL = `${origin}${router.asPath}`;
												navigator.clipboard.writeText(URL);
												toast({
													title: 'Copied',
													position: 'top',
													status: 'success',
													duration: 1000,
													isClosable: true,
												});
											}
										}}
									/>
								</Stack>
								<Stack mt={'12px'}>
									<Heading noOfLines={3} size="md" color="gray.800" lineHeight={'5'}>
										{marketDetailData?.title}
									</Heading>
								</Stack>
							</Stack>
						</Stack>
						<Stack
							// alignItems="center"
							mt={'25px'}
							spacing={2}
							direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
						>
							<Stack align={'center'} direction={'row'}>
								<Icon as={HiChartBar} w={'16px'} h={'14px'} />
								<Text fontSize="sm" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
									{`Volume: $${marketDetailData?.volume.toLocaleString()} USDT`}
								</Text>
							</Stack>
							<Stack align={'center'} direction={'row'}>
								<Icon as={HiClock} w={'16px'} h={'16px'} />
								<Text fontSize="sm" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
									{`Expires: ${moment(marketDetailData?.endDate).format('MMM Do YYYY')}`}
								</Text>
							</Stack>
						</Stack>
						<Stack mt={'32px'} align={'start'}>
							{renderBuyOrSellInfo()}
						</Stack>
						<Stack align="start" direction={'row'} mt={'32px'}>
							{renderPercent()}
							<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'}>
								Since Market Creation
							</Heading>
						</Stack>
					</>
				)}
				<Tabs
					mt={'28px'}
					onChange={value => {
						if (value === 0) {
							setSelectedTab('all');
						}

						if (value === 1) {
							setSelectedTab('6h');
						}

						if (value === 2) {
							setSelectedTab('1d');
						}

						if (value === 3) {
							setSelectedTab('1w');
						}

						if (value === 4) {
							setSelectedTab('1m');
						}
					}}
				>
					<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							All
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							6H
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1D
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1W
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1M
						</Tab>
					</TabList>
					{/* <TabIndicator mt="-1.5px" height="0px" bg="pink" borderRadius="1px" /> */}
					<TabPanels>
						<TabPanel px={0}>{renderLineChart()}</TabPanel>
						<TabPanel px={0}>{renderLineChart()}</TabPanel>
						<TabPanel px={0}>{renderLineChart()}</TabPanel>
						<TabPanel px={0}>{renderLineChart()}</TabPanel>
						<TabPanel px={0}>{renderLineChart()}</TabPanel>
					</TabPanels>
				</Tabs>
			</CardBody>
		</Card>
	);
}

export default LineChartCard;
