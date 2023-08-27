import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';

import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import styles from './home.module.scss';

function Home() {
	return (
		<Stack px={{ md: 116, sm: 2 }} py={{ md: 116, sm: 12 }}>
			<Stack>
				<TopTopicSection />
				<CategorySection />
			</Stack>
		</Stack>
	);
}

export default Home;
