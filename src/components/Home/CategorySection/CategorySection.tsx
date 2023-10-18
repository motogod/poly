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
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>All</Tab>
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>Business</Tab>
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>Crypto</Tab>
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>AI</Tab>
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>Politics</Tab>
							<Tab _selected={{ bg: 'teal.500', color: '#fff' }}>Sports</Tab>
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
						bg="teal.500"
						color="#fff"
					>
						View More
					</Button>
				</Center>
			</Tabs>
		</Stack>
	);
}

export default CategorySection;
