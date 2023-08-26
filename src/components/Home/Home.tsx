import React, { useEffect } from 'react';
import { Heading, Center, Tabs, TabList, Tab, TabPanel, TabPanels, Text } from '@chakra-ui/react';

import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import styles from './home.module.scss';

function Home() {
	return (
		<div className={styles.homeWrapper}>
			<div className={styles.container}>
				<TopTopicSection />
				<CategorySection />
				<h1>Home1</h1>
				<h1>Home2</h1>
				<h1>Home3</h1>
				<h1>Home4</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
				<h1>Home</h1>
			</div>
		</div>
	);
}

export default Home;
