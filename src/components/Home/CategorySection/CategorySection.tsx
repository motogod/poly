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
		<Stack>
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
						backgroundColor="gray.50"
						borderColor="gray.50"
						size="lg"
						colorScheme="undefined"
						borderRadius="full"
						shadow="md"
					>
						<TabList>
							<Tab color="gray.800">All</Tab>
							<Tab color="gray.800">Business</Tab>
							<Tab color="gray.800">Crypto</Tab>
							<Tab color="gray.800">AI</Tab>
							<Tab color="gray.800">Politics</Tab>
							<Tab color="gray.800">Sports</Tab>
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
		</Stack>
	);
}

export default CategorySection;
