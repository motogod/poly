import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserPortfolioPositions,
	AppDispatch,
	RootState,
	selectPortfolioPositions,
} from '@/store';
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
import { useMediaQuery } from 'react-responsive';
import {
	PositionsDataType,
	PortfoioPostionTableStatus,
	PortfoioPostionTableStatusEnum,
} from '@/api/type';

const selectorOptions = Object.entries(PortfoioPostionTableStatusEnum).map(([value, label]) => ({
	value,
	label,
}));

function PositionsTableCard() {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { filterPortfolioPositionsListData, portfolioPositionsSelectorStatus } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	useEffect(() => {
		dispatch(getUserPortfolioPositions({ marketId: '' }));
	}, [dispatch]);

	const checkColorStyle = (currentValue: number, holdValue: number) => {
		if (currentValue > holdValue) {
			return 'red.500';
		}

		if (currentValue < holdValue) {
			return 'green.500';
		}

		return 'gray.500';
	};

	const getProfieOrLoasePercent = (
		currentValue: number,
		holdValue: number,
		status: PortfoioPostionTableStatus
	) => {
		let percentValueString = '';

		const profitRate = Number(((currentValue - holdValue) / holdValue).toFixed(2)) * 100;

		if (holdValue === 0) {
			percentValueString = '+' + String(Number(currentValue.toFixed(2)) * 100) + '%';
			return `(${percentValueString})`;
		}

		if (profitRate > 0) {
			percentValueString = '+' + String(profitRate) + '%';
		}

		if (profitRate < 0) {
			// 顯示狀態為 Pending 或 Claim 的時候，輸錢一率顯示為 -100.00%
			if (status === 'CLOSED' || status === 'RESOLVED') {
				percentValueString = '-100.00%';
			}
			percentValueString = String(profitRate) + '%';
		}

		if (profitRate === 0) {
			percentValueString = '0%';
		}

		return `(${percentValueString})`;
	};

	const renderActionButton = (status: PortfoioPostionTableStatus) => {
		let color = '';
		let buttonText = '';
		let isDisabled = false;

		if (status === 'OPEN') {
			color = 'teal.500';
			buttonText = 'Trade';
			isDisabled = false;
		}

		if (status === 'CLOSED') {
			color = 'gray.800';
			buttonText = 'Pending';
			isDisabled = true;
		}

		if (status === 'RESOLVED') {
			color = 'red.500';
			buttonText = 'Redeem';
			isDisabled = false;
		}

		return (
			<Button
				isDisabled={isDisabled}
				top={'26%'}
				size="sm"
				bg="#fff"
				border={'1px'}
				borderColor={color}
				color={color}
			>
				{buttonText}
			</Button>
		);
	};

	const render24HourPrice = (last24HrPrice: number, status: PortfoioPostionTableStatus) => {
		if (status === 'CLOSED' || status === 'RESOLVED') {
			return '-';
		}

		return last24HrPrice.toFixed(2);
	};

	const renderTableRow = () => {
		return filterPortfolioPositionsListData.map((value: PositionsDataType, index: number) => {
			return (
				<>
					<Tr
						key={index}
						onClick={() => router.push(`/marketsDetail?marketSlug=${value?.market?.slug}`)}
						cursor={'pointer'}
						_hover={{ bg: 'gray.100', borderRadius: 18 }}
					>
						<Td w={'0px'} pr={10} verticalAlign={'middle'}>
							<Stack align={'center'} direction={'row'}>
								<Image
									height="48px"
									width="48px"
									src={value?.market?.image || ''}
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Text fontSize={'14px'} color={'gray.700'} mr={'16px'}>
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
								{value.outcome}
							</Badge>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value.price}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{render24HourPrice(value.last24HrPrice, value.status)}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value.total}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Stack justify={'center'} direction={'row'}>
								<Text>{value.value}</Text>
								<Text color={checkColorStyle(value.last24HrPrice, value.price)}>
									{getProfieOrLoasePercent(value.last24HrPrice, value.price, value.status)}
								</Text>
							</Stack>
						</Td>
						<Td
							textAlign={'end'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							{renderActionButton(value.status)}
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
					onChange={event => dispatch(selectPortfolioPositions(event.target.value))}
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
					defaultValue={portfolioPositionsSelectorStatus}
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
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Share Price
							</Th>
							<Th
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{`Price(24H)`}
							</Th>
							<Th
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Shares
							</Th>
							<Th
								textAlign={'center'}
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

export default PositionsTableCard;
