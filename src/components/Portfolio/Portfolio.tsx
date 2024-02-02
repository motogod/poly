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
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedTabsIndex, AppDispatch } from '@/store';
import AppContainer from '@/components/common/Container';
import PositionsTableCard from './PositionsTableCard';
import OrdersTableCard from './OrdersTableCard';
import HistoryTableCard from './HistoryTableCard';

function Portfolio() {
	const dispatch = useDispatch<AppDispatch>();

	const { userFunds } = useSelector((state: RootState) => state.authReducer);
	const { portfolioOrdersData, portfolioTabsIndex } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	const { load } = userFunds;

	const handleTabsChange = (index: number) => {
		dispatch(selectedTabsIndex(index));
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
							Portfolio Value
						</Heading>
						<Text fontSize={'24px'} color={'#fff'}>
							{`${load} USDT`}
						</Text>
					</Container>
					<Container
						p={'24px'}
						borderRadius={'6px'}
						bg="linear-gradient(#319795, #319795);"
						color="white"
					>
						<Heading size={'xs'} color={'#fff'}>
							Active Positions
						</Heading>
						<Text fontSize={'24px'} color={'#fff'}>
							0 (Test)
						</Text>
					</Container>
					<Container
						p={'24px'}
						borderRadius={'6px'}
						bg="linear-gradient(#D53F8C, #D53F8C);"
						color="white"
					>
						<Heading size={'xs'} color={'#fff'}>
							Orders
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
			<Tabs mt={'68px'} index={portfolioTabsIndex} onChange={handleTabsChange}>
				<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						Positions
					</Tab>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						Orders
					</Tab>
					<Tab
						fontSize={'16px'}
						color={'blue.400'}
						fontWeight={'500'}
						lineHeight={'20px'}
						_hover={{ color: 'blue.600' }}
					>
						History
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
