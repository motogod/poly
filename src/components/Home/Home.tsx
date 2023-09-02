import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import HowItWorkSection from './HowItWorkSection';
import { paddingMainHorizontal, paddingMainVertical } from '../../utils/screen';
import styles from './home.module.scss';

const data = [
	{ name: 'A', uv: 400, pv: 2400, amt: 2400 },
	{ name: 'B', uv: 300, pv: 2400, amt: 2400 },
	{ name: 'C', uv: 200, pv: 2400, amt: 2400 },
	{ name: 'D', uv: 260, pv: 2400, amt: 2400 },
	{ name: 'E', uv: 333, pv: 2400, amt: 2400 },
	{ name: 'F', uv: 176, pv: 2400, amt: 2400 },
	{ name: 'G', uv: 234, pv: 2400, amt: 2400 },
];

function Home() {
	return (
		<Stack>
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
				<Stack py={paddingMainVertical}>
					<TopTopicSection />
				</Stack>
				<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
					<CategorySection />
				</Stack>
			</Stack>
			<Stack>
				<HowItWorkSection />
			</Stack>
		</Stack>
	);
}

export default Home;
