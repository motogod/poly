import React, { useEffect } from 'react';
import {
	Box,
	Select,
	Image,
	Text,
	Button,
	Tag,
	TagLabel,
	Badge,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Stack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioOrders, AppDispatch, RootState } from '@/store';
import { useMediaQuery } from 'react-responsive';

const dummyOrdersData = [
	{
		id: 'cc8efed9-5cc6-4f75-911f-47f1f3d688b5',
		status: 'PENDING',
		type: 'LIMIT',
		direction: 'SELL',
		outcome: 'NO',
		market: {
			id: '09aac6be-1067-4db2-8dd9-ac86a2eabc0a',
			slug: 'test',
			title: 'Test',
		},
		price: 0.7,
		closingPrice: 0,
		closedAmount: 0,
		totalAmount: 100,
	},
];

function OrdersTableCard() {
	const dispatch = useDispatch<AppDispatch>();

	const { portfolioOrdersData } = useSelector((state: RootState) => state.portfolioReducer);

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	useEffect(() => {
		dispatch(getPortfolioOrders());
	}, [dispatch]);

	const renderTableRow = () => {
		return dummyOrdersData.map(value => {
			return (
				<>
					<Tr>
						<Td verticalAlign={'middle'}>
							<Stack align={'center'} direction={'row'}>
								<Image
									height="48px"
									width="48px"
									src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Text fontSize={'14px'} color={'gray.700'} mr={'16px'}>
									{value?.market?.title}
								</Text>
							</Stack>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value?.direction}</Text>
						</Td>
						<Td verticalAlign={'middle'}>
							<Badge
								px={'14px'}
								py={'4px'}
								variant="solid"
								colorScheme={`${value?.outcome === 'NO' ? 'red' : 'green'}`}
							>
								{value?.outcome}
							</Badge>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value?.price}</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text></Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value?.totalAmount}</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						></Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Button
								top={'26%'}
								size="sm"
								bg="#fff"
								border={'1px'}
								borderColor={'pink.500'}
								color="pink.500"
							>
								{value?.status}
							</Button>
						</Td>
					</Tr>
				</>
			);
		});
	};

	return (
		<>
			<Box
				align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
				mt="10px"
				mb={'-10px'}
				as={Stack}
			>
				<Select
					_hover={{ bg: 'gray.100' }}
					cursor={'pointer'}
					_focusVisible={{
						outline: 'none',
					}}
					border={'1px'}
					borderColor={'gray.200'}
					bg={'#fff'}
					w={isDesktop ? '200px' : '100%'}
					placeholder=""
					size="md"
					defaultValue={'all'}
				>
					<option value="all">All</option>
					<option value="active">Active</option>
					<option value="redeem">Redeem</option>
					<option value="resolved">Resolved</option>
				</Select>
			</Box>
			<TableContainer p={'12px'} mt={'20px'} border="1px solid #E2E8F0;" borderRadius={'10px'}>
				<Table variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
					<Thead>
						<Tr>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Market
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Side
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Outcome
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Price
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Filled
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Total
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Expiration
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>{renderTableRow()}</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}

export default OrdersTableCard;
