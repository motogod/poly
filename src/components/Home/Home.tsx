import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import HowItWorkSection from './HowItWorkSection';
import { paddingMainHorizontal, paddingMainVertical } from '../../utils/screen';

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
