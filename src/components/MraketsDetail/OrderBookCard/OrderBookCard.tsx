import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import {
	Stack,
	Text,
	Card,
	CardBody,
	Heading,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, getMarketOrderBookYes, getMarketOrderBookNo } from '@/store';
import { transform } from 'typescript';
import { OrderBookDataType } from '@/api';

const dummyYesData = {
	bids: [
		{
			price: 0.95,
			quantity: 100,
		},
		{
			price: 0.75,
			quantity: 100,
		},
	],
	asks: [
		{
			price: 0.85,
			quantity: 100,
		},
		{
			price: 0.75,
			quantity: 100,
		},
	],
};

const dummyNoData = {
	bids: [
		{
			price: 0.75,
			quantity: 100,
		},
		{
			price: 0.75,
			quantity: 100,
		},
	],
	asks: [
		{
			price: 0.75,
			quantity: 100,
		},
	],
};

function OrderBookCard() {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const [tabIndex, setTabIndex] = useState(0);

	const { orderBookYesData, orderBookNoData, marketDetailData, isUserClickYesOrNo } = useSelector(
		(state: RootState) => state.homeReducer
	);

	useEffect(() => {
		// 使用者有點擊切換 Yes No then switch tab
		if (isUserClickYesOrNo) {
			setTabIndex(0); // Yes
		} else {
			setTabIndex(1); // No
		}
	}, [isUserClickYesOrNo]);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (router.isReady) {
			const { marketSlug } = router.query;

			// call API 取得的 marketDetailData 資料 在 redux 裡與網址的一樣，才去 call YES NO 的相關 API資料
			if (Object.keys(marketDetailData).length > 0 && marketDetailData.slug === marketSlug) {
				dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
				dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));

				interval = setInterval(() => {
					dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
					dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));
				}, 60000);
			}
		}

		return () => {
			clearInterval(interval);
		};
	}, [dispatch, marketDetailData, router]);

	const getLargetstTotalPrice = (orderData: [{ price: number; quantity: number }]) => {
		const totalPriceArray = orderData.map(
			value => Number(value.price) * Number(value.quantity.toFixed(2))
		);

		const largestToalPrice = totalPriceArray.reduce(
			(largest, current) => (current * current > largest * largest ? current : largest),
			totalPriceArray[0]
		);

		return largestToalPrice;
	};

	const renderTableRow = (orderData: OrderBookDataType) => {
		// const largestAskTotalPrice = getLargetstTotalPrice(orderData.asks);
		// const largestBidsTotalPrice = getLargetstTotalPrice(orderData.bids);

		// Asks 金額從下到上累加
		let asksAccumulationTotalPrice: number[] = [];

		if (orderData.asks.length > 0) {
			const totalPriceArray = orderData?.asks.map(value => value.price * value.quantity);

			const reverseArray = totalPriceArray.reverse(); // 倒轉原本 array of object 的順序 方便後續金額加總

			reverseArray.reduce((accumulator, currentValue) => {
				asksAccumulationTotalPrice.push(accumulator + currentValue);
				return accumulator + currentValue;
			}, 0);

			asksAccumulationTotalPrice.reverse(); // 再倒轉 呈現畫面想要的金額 下到上累加
		}

		// Bids 金額從上到下累加
		let bidsAccumulationTotalPrice: number[] = [];

		if (orderData.bids.length > 0) {
			const totalPriceArray = orderData.bids.map(value => value.price * value.quantity);

			totalPriceArray.reduce((accumulator, currentValue) => {
				bidsAccumulationTotalPrice.push(accumulator + currentValue);
				return accumulator + currentValue;
			}, 0);
		}

		return (
			<>
				{orderData.asks.map((value, index) => {
					const barPercent =
						Number(asksAccumulationTotalPrice[index] / asksAccumulationTotalPrice[0]) * 100;

					return (
						<>
							<Tr key={index}>
								<Td
									p={0}
									position={'relative'}
									fontSize={'md'}
									color={'gray.700'}
									fontWeight={'500'}
									lineHeight={'20px'}
								>
									<Stack
										justifyContent={'center'}
										position={'absolute'}
										bg={'red.100'}
										w={`${barPercent > 10 ? barPercent : 10}%`}
										h={'56px'}
									>
										<Text pl={6}>Ask</Text>
									</Stack>
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{`$${value.price}`}
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{value.quantity.toFixed(2)}
								</Td>
								<Td
									fontSize={'md'}
									color={'gray.700'}
									fontWeight={'500'}
									lineHeight={'20px'}
									isNumeric
								>
									{`$${asksAccumulationTotalPrice[index].toFixed(2)}`}
								</Td>
							</Tr>
						</>
					);
				})}
				{orderData.bids.map((value, index) => {
					const barPercent =
						Number(bidsAccumulationTotalPrice[index] / bidsAccumulationTotalPrice.slice(-1)[0]) *
						100;
					return (
						<>
							<Tr key={index}>
								<Td
									p={0}
									position={'relative'}
									fontSize={'md'}
									fontWeight={'500'}
									lineHeight={'20px'}
								>
									<Stack
										justifyContent={'center'}
										position={'absolute'}
										bg={'green.100'}
										w={`${barPercent > 10 ? barPercent : 10}%`}
										h={'56px'}
									>
										<Text pl={6}>Bids</Text>
									</Stack>
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{`$${value.price}`}
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{value.quantity.toFixed(2)}
								</Td>
								<Td
									fontSize={'md'}
									color={'gray.700'}
									fontWeight={'500'}
									lineHeight={'20px'}
									isNumeric
								>
									{`$${bidsAccumulationTotalPrice[index].toFixed(2)}`}
								</Td>
							</Tr>
						</>
					);
				})}
			</>
		);
	};

	return (
		<Card minH={'434px'} shadow="lg" border="1px solid #E2E8F0;" borderRadius="3xl">
			<CardBody>
				<Heading size={'md'} color={'gray.800'}>
					Order Book
				</Heading>
				<Tabs mt={'28px'} index={tabIndex} onChange={handleTabsChange}>
					<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
						<Tab
							_hover={{ color: 'blue.600' }}
							onClick={() => dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }))}
							fontSize={'16px'}
							color={'blue.400'}
							fontWeight={'500'}
							lineHeight={'24px'}
						>
							Trade Yes
						</Tab>
						<Tab
							_hover={{ color: 'blue.600' }}
							onClick={() => dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }))}
							fontSize={'16px'}
							color={'blue.400'}
							fontWeight={'500'}
							lineHeight={'24px'}
						>
							Trade No
						</Tab>
					</TabList>
					{/* <TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" /> */}
					<TabPanels>
						<TabPanel p={0}>
							{orderBookYesData?.asks?.length > 0 || orderBookYesData?.bids?.length > 0 ? (
								<TableContainer
									p={'12px'}
									mt={'20px'}
									border="1px solid #E2E8F0;"
									borderRadius={'10px'}
								>
									<Table
										variant="unstyled"
										style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}
									>
										<Thead>
											<Tr>
												<Th
													w={'50%'}
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Trade Yes
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Price
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Shares
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
													isNumeric
												>
													Total
												</Th>
											</Tr>
										</Thead>
										<Tbody>{renderTableRow(orderBookYesData)}</Tbody>
									</Table>
								</TableContainer>
							) : (
								<Text pt={34} textAlign={'center'} color={'gray.500'} fontSize={'md'}>
									No orders found
								</Text>
							)}
						</TabPanel>
						<TabPanel p={0}>
							{orderBookNoData?.asks?.length > 0 || orderBookNoData?.bids?.length > 0 ? (
								<TableContainer
									p={'12px'}
									mt={'20px'}
									border="1px solid #E2E8F0;"
									borderRadius={'10px'}
								>
									<Table
										variant="unstyled"
										style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}
									>
										<Thead>
											<Tr>
												<Th
													w={'50%'}
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Trade No
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Price
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Shares
												</Th>
												<Th
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
													isNumeric
												>
													Total
												</Th>
											</Tr>
										</Thead>
										<Tbody>{renderTableRow(orderBookNoData)}</Tbody>
									</Table>
								</TableContainer>
							) : (
								<Text pt={34} textAlign={'center'} color={'gray.500'} fontSize={'md'}>
									No orders found
								</Text>
							)}
						</TabPanel>
					</TabPanels>
				</Tabs>
			</CardBody>
		</Card>
	);
}

export default OrderBookCard;
