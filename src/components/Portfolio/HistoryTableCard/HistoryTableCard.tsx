import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPortfolioOrders,
	AppDispatch,
	RootState,
	deleteOrder,
	selectPortfolioOrders,
	getPortfolioHistory,
	selectPortfolioHistory,
} from '@/store';
import { useMediaQuery } from 'react-responsive';
import {
	OrderStatusType,
	PortfolioOrderSelectorStatus,
	PortfoioHistoryActionType,
	PortfolioHistorySelectorStatus,
} from '@/api';

const dummyHistoryData = [
	{
		action: 'BUY',
		market: {
			id: '85050c9d-8269-41f7-8811-005a6970b8ef',
			slug: 'will-joe-biden-be-president-of-the-united-states-on',
			title: 'Will Joe Biden be President of the United States on...?',
			image: 'https://google.com',
		},
		outcome: 'YES',
		time: '2024-02-01T07:55:11.739Z',
		price: 0.6,
		quantity: 100,
		value: 60,
	},
	{
		action: 'REDEEM',
		market: {
			id: '85050c9d-8269-41f7-8811-005a6970b8ef',
			slug: 'will-joe-biden-be-president-of-the-united-states-on',
			title: 'Will Joe Biden be President of the United States on...?',
			image: 'https://google.com',
		},
		outcome: 'NO',
		time: '2024-01-01T07:55:11.739Z',
		price: 0.6,
		quantity: 100,
		value: 60,
	},
	{
		action: 'SELL',
		market: {
			id: '85050c9d-8269-41f7-8811-005a6970b8ef',
			slug: 'will-joe-biden-be-president-of-the-united-states-on',
			title: 'Will Joe Biden be President of the United States on...?',
			image: 'https://google.com',
		},
		outcome: 'YES',
		time: '2024-01-31T07:55:11.739Z',
		price: 0.6,
		quantity: 100,
		value: 60,
	},
];

const selectorOptions = Object.entries(PortfolioHistorySelectorStatus).map(([value, label]) => ({
	value,
	label,
}));

function HistoryTableCard() {
	// 使用者當下點選刪除的 order id
	const [userClickDeleteOrderId, setUserClickDeleteOrderId] = useState('');
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const { portfolioHistorySelectorStatus, filterPortfolioHistoryListData } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	useEffect(() => {
		dispatch(getPortfolioHistory());
	}, [dispatch]);

	const renderActionText = (action: PortfoioHistoryActionType) => {
		switch (action) {
			case 'BUY':
				return 'Buy';
			case 'SELL':
				return 'Sell';
			case 'REDEEM':
				return 'Redeem';
			default:
				return '';
		}
	};

	const renderTimeDiff = (time: string) => {
		const givenTime = moment(time);

		const currentTime = moment();

		const minutes = currentTime.diff(givenTime, 'minutes');

		if (minutes < 60) {
			return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
		}

		const hours = currentTime.diff(givenTime, 'hours');

		if (hours < 24) {
			return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
		}

		const days = currentTime.diff(givenTime, 'days');

		if (days < 32) {
			return `${days} ${days === 1 ? 'day' : 'days'} ago`;
		}

		const months = currentTime.diff(givenTime, 'months');

		if (months < 12) {
			return `${months} ${months === 1 ? 'month' : 'months'} ago`;
		}

		const years = currentTime.diff(givenTime, 'years');

		return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	};

	const renderTableRow = () => {
		return filterPortfolioHistoryListData.map((value, index) => {
			const totalPrice = (Number(value.price) * Number(value.quantity)).toFixed(2);

			return (
				<>
					<Tr
						key={index}
						onClick={() => router.push(`/marketsDetail?marketSlug=${value?.market?.slug}`)}
						cursor={'pointer'}
						_hover={{ bg: 'gray.100', borderRadius: 18 }}
					>
						<Td
							w={'0px'}
							pr={10}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{renderActionText(value?.action)}</Text>
						</Td>
						<Td verticalAlign={'middle'} w={'0px'} pr={10}>
							<Stack align={'center'} direction={'row'}>
								<Image
									height="48px"
									width="48px"
									src={value?.market?.image ? value?.market?.image : ''}
									alt={value?.market?.title}
									borderRadius="lg"
								/>
								<Text minWidth={30} fontSize={'14px'} color={'gray.700'} mr={'16px'}>
									{value?.market?.title}
								</Text>
							</Stack>
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
							<Text>{value?.quantity}</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value?.value}</Text>
						</Td>
						<Td
							textAlign={'end'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{renderTimeDiff(value?.time)}</Text>
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
					onChange={event => dispatch(selectPortfolioHistory(event.target.value))}
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
					defaultValue={portfolioHistorySelectorStatus}
				>
					{selectorOptions.map(value => (
						<>
							<option value={value.value}>{value.label}</option>
						</>
					))}
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
								Action
							</Th>
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
								Shares
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Value
							</Th>
							<Th
								textAlign={'end'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Date
							</Th>
						</Tr>
					</Thead>
					<Tbody>{renderTableRow()}</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}

export default HistoryTableCard;
