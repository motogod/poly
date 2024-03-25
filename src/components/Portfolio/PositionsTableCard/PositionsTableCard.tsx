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
		try {
			dispatch(getUserPortfolioPositions({ marketId: '' }));
		} catch (error) {
			console.log('catch error');
		}
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

		const profitRate = Number((((currentValue - holdValue) / holdValue) * 100).toFixed(2));

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

	const renderPrice = (price: number, status: PortfoioPostionTableStatus) => {
		if (status === 'CLOSED' || status === 'RESOLVED') {
			return '-';
		}

		return price.toFixed(2);
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
									alt={value?.market?.title}
									borderRadius="lg"
								/>
								<Text minW={30} fontSize={'14px'} color={'gray.700'} mr={'16px'}>
									{value?.market?.title}
								</Text>
							</Stack>
						</Td>
						<Td w={'0px'} verticalAlign={'middle'}>
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
							<Text>{value?.avgBuyPrice}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{renderPrice(value?.price, value.status)}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value?.hold}</Text>
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
								<Text color={checkColorStyle(value?.price, value?.avgBuyPrice)}>
									{getProfieOrLoasePercent(value?.price, value?.avgBuyPrice, value.status)}
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
				<Tag
					alignItems={'center'}
					justifyContent={'center'}
					w={'100%'}
					h={'56px'}
					flexWrap={'nowrap'}
					border="1px"
					backgroundColor="gray.50"
					borderColor="gray.50"
					size="lg"
					colorScheme="undefined"
					borderRadius={'md'}
				>
					<Text fontWeight={'400'} color={'gray.800'}>
						Once your order is created, it will appear after a 30-60 second delay.
					</Text>
				</Tag>
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
								Avg.Price
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
