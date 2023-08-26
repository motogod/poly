import React, { useState } from 'react';
import {
	Heading,
	Center,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Tag,
	TagLabel,
} from '@chakra-ui/react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import CategoryActivityList from './CategoryActivityList';
import styles from './categorySection.module.scss';

function CategorySection() {
	const [value, setValue] = React.useState('1');

	return (
		<div className={styles.wrapper}>
			<Center h="120px" color="white">
				<Heading size="xl" color="gray.700">
					{'Markets'}
				</Heading>
			</Center>

			<Tabs variant="soft-rounded" colorScheme="purple">
				<Center>
					<Tag
						p={3}
						mb={12}
						border="1px"
						color="gray.50"
						backgroundColor="gray.50"
						borderColor="gray.50"
						size="lg"
						colorScheme="undefined"
						borderRadius="full"
						shadow="md"
					>
						<TabList>
							<Tab>All</Tab>
							<Tab>Business</Tab>
							<Tab>Crypto</Tab>
							<Tab>AI</Tab>
							<Tab>Politics</Tab>
							<Tab>Sports</Tab>
						</TabList>
					</Tag>
				</Center>
				<TabPanels>
					<TabPanel>
						<CategoryActivityList />
					</TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
				</TabPanels>
			</Tabs>
			<div className={styles.categoryContainer}></div>
		</div>
	);
}

export default CategorySection;
