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
				return '交易满额';
			case 'referral':
				return '推荐奖励';
			case 'referral_volume':
				return '下线交易满额';
			case 'other':
				return '其他';
			case 'redemption':
				return '点数兑换';
			case 'reward_tasks':
				return '奖励任务';
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
						<Td w={'0px'} pr={380} verticalAlign={'middle'}>
							<Stack align={'center'} direction={'row'}>
								<Text minW={30} fontSize={'14px'} color={'gray.700'} mr={'16px'}>
									{renderCategory(value?.type)}
								</Text>
							</Stack>
						</Td>
						<Td w={'0px'} verticalAlign={'middle'}>
							<Text textAlign={'end'} color={'gray.700'}>
								{renderValue('Positive', value?.value)}
							</Text>
						</Td>
						<Td w={'0px'} verticalAlign={'middle'}>
							<Text textAlign={'end'} color={'gray.700'}>
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
			<TableContainer p={'12px'} mt={'0px'} border="1px solid #E2E8F0;" borderRadius={'10px'}>
				<Table variant="simple" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
					<Thead>
						<Tr>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Category
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Earned Points
							</Th>
							<Th
								textAlign={'center'}
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Redeemed Points
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
			{pageCount > 1 && (
				<Box
					align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
					mt="30px"
					mb={'10px'}
					as={Stack}
				>
					<Select
						onChange={event => dispatch(getPoints({ page: Number(event.target.value), take: 20 }))}
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
				</Box>
			)}
		</>
	);
}

export default PointsHistoryTable;
