import React, { useEffect, useState } from 'react';
import {
	Container,
	HStack,
	Heading,
	Text,
	Grid,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
	RootState,
	selectedTabsIndex,
	AppDispatch,
	getUserPortfolioPositions,
	getPortfolioOrders,
	getPortfolioHistory,
} from '@/store';
import AppContainer from '@/components/common/Container';
import PositionsTableCard from './PositionsTableCard';
import OrdersTableCard from './OrdersTableCard';
import HistoryTableCard from './HistoryTableCard';

function Portfolio() {
	const dispatch = useDispatch<AppDispatch>();

	const { t } = useTranslation();

	const { portfolioValue } = useSelector((state: RootState) => state.authReducer);
	const { portfolioOrdersData, portfolioTabsIndex, portfolioPositionsListData } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	const activePostionsCount = portfolioPositionsListData?.filter(
		value => value.status === 'OPEN'
	).length;

	const handleTabsChange = (index: number) => {
		dispatch(selectedTabsIndex(index));

		if (index === 0) {
			dispatch(getUserPortfolioPositions({ marketId: '' }));
		}

		if (index === 1) {
			dispatch(getPortfolioOrders());
		}

		if (index === 2) {
			dispatch(getPortfolioHistory());
		}
	};

	const handleTabsClick = () => {
		if (portfolioTabsIndex === 0) {
			dispatch(getUserPortfolioPositions({ marketId: '' }));
		}

		if (portfolioTabsIndex === 1) {
			dispatch(getPortfolioOrders());
		}

		if (portfolioTabsIndex === 2) {
			dispatch(getPortfolioHistory());
		}
	};

	return (
		<AppContainer>
			<HStack>
				<Grid
					w={'100%'}
					templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
					gap={'10px'}
				>
					<Container
						p={'24px'}
						borderRadius={'6px'}
						bg="linear-gradient(#D69E2E, #D69E2E);"
						color="white"
					>
						<Heading size={'xs'} color={'#fff'}>
							{t('portfolio_value')}
						</Heading>
						<Text fontSize={'24px'} color={'#fff'}>
							{`${portfolioValue?.toFixed(2)} USDT`}
						</Text>
					</Container>
					<Container
						p={'24px'}
						borderRadius={'6px'}
						bg="linear-gradient(#319795, #319795);"
						color="white"
					>
						<Heading size={'xs'} color={'#fff'}>
							{t('active_positions')}
						</Heading>
						<Text fontSize={'24px'} color={'#fff'}>
							{activePostionsCount}
						</Text>
					</Container>
					<Container
						p={'24px'}
						borderRadius={'6px'}
						bg="linear-gradient(#D53F8C, #D53F8C);"
						color="white"
					>
						<Heading size={'xs'} color={'#fff'}>
							{t('orders')}
						</Heading>
						<Text fontSize={'24px'} color={'#fff'}>
							{
								portfolioOrdersData?.filter(value => {
									if (value.status === 'PENDING' || value.status === 'PARTIALLY_FILLED') {
										return value;
									}
								}).length
							}
						</Text>
					</Container>
				</Grid>
			</HStack>
			<Tabs
				mt={'68px'}
				index={portfolioTabsIndex}
				onChange={handleTabsChange}
				// onClick={handleTabsClick}
			>
				<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						{t('positions')}
					</Tab>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						{t('orders')}
					</Tab>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						{t('history')}
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel p={0}>
						<PositionsTableCard />
					</TabPanel>
					<TabPanel p={0}>
						<OrdersTableCard />
					</TabPanel>
					<TabPanel p={0}>
						<HistoryTableCard />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</AppContainer>
	);
}

export default Portfolio;
