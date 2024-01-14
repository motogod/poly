import React, { useEffect, useState } from 'react';
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
		{
			price: 0.75,
			quantity: 100,
		},
	],
};

// const dummyNoData = {
// 	bids: [
// 		{
// 			price: 0.75,
// 			quantity: 100,
// 		},
// 		{
// 			price: 0.75,
// 			quantity: 100,
// 		},
// 	],
// 	asks: [
// 		{
// 			price: 0.75,
// 			quantity: 100,
// 		},
// 	],
// };
const dummyNoData = {
	bids: [],
	asks: [],
};

function OrderBookCard() {
	const dispatch = useDispatch<AppDispatch>();

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

	const renderTableRow = (orderData: OrderBookDataType) => {
		return (
			<>
				{orderData.asks.map(value => {
					return (
						<>
							<Tr>
								<Td
									bg={'red.100'}
									fontSize={'md'}
									color={'gray.700'}
									fontWeight={'500'}
									lineHeight={'20px'}
								>
									Ask
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{`${value.price} USDT`}
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{value.quantity.toFixed(2)}
								</Td>
							</Tr>
						</>
					);
				})}
				{orderData.bids.map(value => {
					return (
						<>
							<Tr>
								<Td
									bg={'green.100'}
									fontSize={'md'}
									color={'gray.700'}
									fontWeight={'500'}
									lineHeight={'20px'}
								>
									Bids
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{`${value.price} USDT`}
								</Td>
								<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
									{value.quantity.toFixed(2)}
								</Td>
								{/* <Td
													fontSize={'md'}
													color={'gray.700'}
													fontWeight={'500'}
													lineHeight={'20px'}
													isNumeric
												>
													27.00 USDT
												</Td> */}
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
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Trade Type
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
													Quantity
												</Th>
												{/* <Th
												fontSize={'xs'}
												color={'gray.700'}
												fontWeight={'700'}
												lineHeight={'16px'}
												isNumeric
											>
												Total
											</Th> */}
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
													fontSize={'xs'}
													color={'gray.700'}
													fontWeight={'700'}
													lineHeight={'16px'}
												>
													Trade Type
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
													Quantity
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
