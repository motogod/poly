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
	UserPortfolioDataType,
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

	const getProfieOrLoasePercent = (currentValue: number, holdValue: number) => {
		let percentValueString = '';
		const value = Number(((currentValue - holdValue) / holdValue).toFixed(2)) * 100;

		if (value > 0) {
			percentValueString = '+' + String(value) + '%';
		}

		if (value < 0) {
			percentValueString = '-' + String(value) + '%';
		}

		return percentValueString;
	};

	const renderActionButton = (status: PortfoioPostionTableStatus) => {
		let color = '';
		let buttonText = '';

		if (status === 'OPEN') {
			color = 'teal.500';
			buttonText = 'Trade';
		}

		if (status === 'CLOSED') {
			color = 'teal.500';
			buttonText = '';
		}

		if (status === 'RESOLVED') {
			color = 'red.500';
			buttonText = 'Redeem';
		}

		if (status === 'OPEN' || status === 'RESOLVED') {
			return (
				<Button top={'26%'} size="sm" bg="#fff" border={'1px'} borderColor={color} color={color}>
					{buttonText}
				</Button>
			);
		}

		return '';
	};

	const renderTableRow = () => {
		return filterPortfolioPositionsListData.map((value: UserPortfolioDataType, index: number) => {
			return (
				<>
					<Tr
						key={index}
						onClick={() => router.push(`/marketsDetail?marketSlug=${value?.market?.slug}`)}
						cursor={'pointer'}
						_hover={{ bg: 'gray.100', borderRadius: 18 }}
					>
						<Td verticalAlign={'middle'}>
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
							<Text>{value.last24HrPrice.toFixed(2)}</Text>
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
								<Text
									color={
										getProfieOrLoasePercent(value.last24HrPrice, value.price).includes('+')
											? 'red.500'
											: 'green.500'
									}
								>
									{getProfieOrLoasePercent(value.last24HrPrice, value.price)}
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
