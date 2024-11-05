import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { getUserPortfolioPositions, AppDispatch, RootState } from '@/store';
import {
	Box,
	Select,
	Text,
	Button,
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
import { PositionsDataType, PortfoioPostionTableStatus, Point } from '@/api/type';
import { getPoints } from '@/store/thunks/fetchPoint';
import { useUtility } from '@/hooks';

type Category = 'volume' | 'referral' | 'referral_volume' | 'other' | 'redemption' | 'reward_tasks';

type Props = {
	pageCount: number;
};

function PointsHistoryTable({ pageCount = 5 }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const { t } = useTranslation();

	const { formatAllDate } = useUtility();

	const selectorOptions = Array.from({ length: pageCount }).map((value, index) => ({
		label: index + 1,
		value: index + 1,
	}));

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { userPointData } = useSelector((state: RootState) => state.pointReducer);

	const renderCategory = (category: Category) => {
		switch (category) {
			case 'volume':
				return 'Volume';
			case 'referral':
				return t('referral_for_category');
			case 'referral_volume':
				return t('referral_volume');
			case 'other':
				return t('other');
			case 'redemption':
				return t('points_redemption');
			case 'reward_tasks':
				return t('transaction_rewards');
			default:
				return '';
		}
	};

	const renderValue = (type: 'Positive' | 'Negative', value: number) => {
		if (type === 'Positive' && value >= 0) {
			return value;
		}

		if (type === 'Negative' && value < 0) {
			return value;
		}

		return '';
	};

	const renderTableRow = () => {
		return userPointData?.points?.map((value: Point, index: number) => {
			return (
				<>
					<Tr key={index} _hover={{ bg: 'gray.100', borderRadius: 18 }}>
						<Td w={'450px'} verticalAlign={'middle'}>
							<Stack align={'center'} direction={'row'}>
								<Text minW={30} fontSize={'14px'} color={'gray.700'} mr={'16px'}>
									{renderCategory(value?.type)}
								</Text>
							</Stack>
						</Td>
						<Td verticalAlign={'middle'} textAlign={'end'}>
							<Text color={'gray.700'}>{renderValue('Positive', value?.value)}</Text>
						</Td>
						<Td verticalAlign={'middle'}>
							<Text color={'gray.700'} textAlign={'end'}>
								{renderValue('Negative', value?.value)}
							</Text>
						</Td>
						<Td
							textAlign={'end'}
							verticalAlign={'middle'}
							fontSize={'md'}
							color={'gray.700'}
							fontWeight={'500'}
							lineHeight={'20px'}
						>
							<Text>{formatAllDate(value?.createdAt)}</Text>
						</Td>
					</Tr>
				</>
			);
		});
	};

	return (
		<>
			<TableContainer
				pl={'12px'}
				pr={'12px'}
				pb={'12px'}
				mt={'0px'}
				border="1px solid #E2E8F0;"
				borderRadius={'10px'}
				maxHeight={{ base: '600px', md: 'auto' }} // 設定最大高度
				overflowY="auto"
			>
				<Table
					// layout="fixed"
					variant="simple"
					style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}
				>
					<Thead position="sticky" top={0} bg={'white'} zIndex={10}>
						<Tr>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
								// p={'12px'}
							>
								{t('category')}
							</Th>
							<Th
								textAlign={'end'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('earned_points')}
							</Th>
							<Th
								textAlign={'end'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('redeemed_points')}
							</Th>
							<Th
								textAlign={'end'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{t('date')}
							</Th>
						</Tr>
					</Thead>
					<Tbody>{renderTableRow()}</Tbody>
				</Table>
			</TableContainer>
			{pageCount > 1 && (
				<Box
					align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
					mt="30px"
					mb={'10px'}
					as={Stack}
				>
					<Stack alignItems={'center'} direction={'row'} gap={4}>
						<Text color={'gray.700'} fontSize={'14px'}>
							{t('page')}
						</Text>
						<Select
							onChange={event =>
								dispatch(getPoints({ page: Number(event.target.value), take: 20 }))
							}
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
							defaultValue={'1'}
						>
							{selectorOptions.map((value, index) => (
								<>
									<option value={value.value}>{value.label}</option>
								</>
							))}
						</Select>
					</Stack>
				</Box>
			)}
		</>
	);
}

export default PointsHistoryTable;
