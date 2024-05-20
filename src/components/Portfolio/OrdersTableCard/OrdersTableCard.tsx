import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
import {
	getPortfolioOrders,
	AppDispatch,
	RootState,
	deleteOrder,
	selectPortfolioOrders,
} from '@/store';
import { useMediaQuery } from 'react-responsive';
import { OrderStatusType, PortfolioOrderSelectorStatus } from '@/api';

const selectorOptions = Object.entries(PortfolioOrderSelectorStatus).map(([value, label]) => ({
	value,
	label,
}));

function OrdersTableCard() {
	// 使用者當下點選刪除的 order id
	const [userClickDeleteOrderId, setUserClickDeleteOrderId] = useState('');
	const dispatch = useDispatch<AppDispatch>();

	const { t } = useTranslation();

	const router = useRouter();

	const { isDeleteOrderLoading, filteredPortfolioOrdersData, portfolioSelectorStatus } =
		useSelector((state: RootState) => state.portfolioReducer);

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	useEffect(() => {
		dispatch(getPortfolioOrders());
	}, [dispatch]);

	const renderExpirationText = (status: OrderStatusType) => {
		if (status !== 'CANCELED') {
			return 'Until Cancelled';
		}

		return '-';
	};

	const renderActionButton = (status: OrderStatusType, orderId: string) => {
		const buttonText = () => {
			if (status === 'PENDING' || status === 'PARTIALLY_FILLED' || status === 'EXPIRED') {
				return t('cancel');
			}

			if (status === 'CANCELED') {
				return t('cancel');
			}

			if (status === 'FILLED') {
				return t('filled');
			}

			return status;
		};

		return (
			<Button
				isLoading={userClickDeleteOrderId === orderId && isDeleteOrderLoading}
				isDisabled={status !== 'PENDING' && status !== 'PARTIALLY_FILLED' && status !== 'EXPIRED'}
				onClick={e => {
					e.stopPropagation();

					// Delete
					if (status === 'PENDING' || status === 'PARTIALLY_FILLED' || status === 'EXPIRED') {
						setUserClickDeleteOrderId(orderId);
						dispatch(deleteOrder({ id: orderId }));
					}
				}}
				top={'26%'}
				size="sm"
				bg="#fff"
				border={'1px'}
				borderColor={'pink.500'}
				color="pink.500"
			>
				{buttonText()}
			</Button>
		);
	};

	const renderTableRow = () => {
		return filteredPortfolioOrdersData.map((value, index) => {
			if (value.status === 'CANCELED' || value.status === 'FILLED') {
				return null;
			}

			const totalPrice = (Number(value.price) * Number(value.quantity)).toFixed(2);

			return (
				<>
					<Tr
						key={index}
						onClick={() => router.push(`/marketsDetail?marketSlug=${value?.market?.slug}`)}
						cursor={'pointer'}
						_hover={{ bg: 'gray.100', borderRadius: 18 }}
					>
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
							<Text letterSpacing={1}>{`${value.closedQuantity}/${value.quantity}`}</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{totalPrice}</Text>
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							{renderExpirationText(value.status)}
						</Td>
						<Td
							textAlign={'center'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							{renderActionButton(value?.status, value.id)}
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
					onChange={event => dispatch(selectPortfolioOrders(event.target.value))}
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
					defaultValue={portfolioSelectorStatus}
				>
					{selectorOptions.map(value => (
						<>
							<option value={value.value}>
								{t(value.label.toLowerCase() as unknown as 'all' | 'active')}
							</option>
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
								{t('markets')}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('side')}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('outcome')}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('prices')}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('filled')}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('total')}
							</Th>
							<Th
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('expiration')}
							</Th>
							<Th
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('action')}
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
