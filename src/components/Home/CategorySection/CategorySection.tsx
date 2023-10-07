import React, { useState, useMemo } from 'react';
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
	Button,
} from '@chakra-ui/react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import CategoryActivityList from './CategoryActivityList';
import CustomTabsOption from './CustomTabsOption';
import styles from './categorySection.module.scss';

function CategorySection() {
	const [value, setValue] = React.useState('1');

	return (
		<Stack>
			<Center h="120px" color="white">
				<Heading size="xl" color="gray.700">
					{'Markets'}
				</Heading>
			</Center>

			<Tabs variant="soft-rounded" colorScheme="purple">
				<Center className={styles.tabsContainer}>
					<CustomTabsOption>
						<TabList>
							<Tab color="gray.800">All</Tab>
							<Tab color="gray.800">Business</Tab>
							<Tab color="gray.800">Crypto</Tab>
							<Tab color="gray.800">AI</Tab>
							<Tab color="gray.800">Politics</Tab>
							<Tab color="gray.800">Sports</Tab>
						</TabList>
					</CustomTabsOption>
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
				<Center mt="20">
					<Button
						onClick={() => alert('View More')}
						px="7"
						py="6"
						borderRadius="3xl"
						colorScheme="orange"
					>
						View More
					</Button>
				</Center>
			</Tabs>
		</Stack>
	);
}

export default CategorySection;
