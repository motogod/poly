import React, { useEffect } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import HowItWorkSection from './HowItWorkSection';
import { paddingMainHorizontal, paddingMainVertical } from '../../utils/screen';

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

function Home() {
	return (
		<Stack backgroundColor="gray.50">
			<Stack>
				{/* <LineChart
					width={600}
					height={300}
					data={data}
					margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
				>
					<Line type="monotone" dataKey="uv" stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					<XAxis dataKey="name" />
					<YAxis />
				</LineChart> */}
				<Stack pt={paddingMainVertical}>
					<TopTopicSection />
				</Stack>
				<Stack px={paddingMainHorizontal} py={0}>
					<CategorySection />
				</Stack>
			</Stack>
			<Stack>
				<HowItWorkSection />
			</Stack>
			<Stack
				display={{ lg: 'none', md: 'inline', sm: 'inline' }}
				w={'100%'}
				flexDirection="row"
				position="fixed"
				bottom={0}
				zIndex={5}
				pl={6}
				pr={6}
				pt={4}
				pb={4}
				bg={'#FFFFFF'}
				borderColor={'black'}
				borderTop="1px solid #E2E8F0;"
			>
				<Button
					leftIcon={<HamburgerIcon />}
					w={'100%'}
					size="lg"
					bg="#D53F8C"
					borderColor="#D53F8C"
					color="#fff"
				>
					Connect Wallet
				</Button>
			</Stack>
		</Stack>
	);
}

export default Home;
