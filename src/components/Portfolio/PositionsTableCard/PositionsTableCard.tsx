import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPortfolioPositions, AppDispatch, RootState } from '@/store';
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
import { UserPortfolioDataType } from '@/api/type';

function PositionsTableCard() {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { portfolioPositionsListData } = useSelector((state: RootState) => state.portfolioReducer);

	useEffect(() => {
		dispatch(getUserPortfolioPositions({ marketId: '' }));
	}, [dispatch]);

	const renderTableRow = () => {
		return portfolioPositionsListData.map((value: UserPortfolioDataType, index: number) => {
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
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>0.60(Test)</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{value.last24HrPrice.toFixed(2)}</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>2.00(Test)</Text>
						</Td>
						<Td
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Stack align={'center'} direction={'row'}>
								<Text color={'gray.700'}>1.60(T)</Text>
								<Text color={'green.500'}>{`(+133.33%)`}</Text>
							</Stack>
						</Td>
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
								borderColor={'teal.500'}
								color="teal.500"
							>
								TradeTest
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
					<option value="all">All(Test)</option>
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
								Outcome
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Share Price
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{`Price(24H)`}
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
								textAlign={'end'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Value
							</Th>
							<Th
								textAlign={'center'}
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
