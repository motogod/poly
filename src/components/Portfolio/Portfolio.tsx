import React from 'react';
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
import AppContainer from '@/components/common/Container';
import PositionsTableCard from './PositionsTableCard';
import OrdersTableCard from './OrdersTableCard';

function Portfolio() {
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
							6210.78 USDT
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
							6
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
							2
						</Text>
					</Container>
				</Grid>
			</HStack>
			<Tabs mt={'68px'}>
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
					<TabPanel>
						<p>History</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</AppContainer>
	);
}

export default Portfolio;
