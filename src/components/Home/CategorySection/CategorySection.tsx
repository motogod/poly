import React from 'react';
import { useRouter } from 'next/router';
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
import { paddingMainHorizontal } from '@/utils/screen';

function CategorySection() {
	const router = useRouter();
	const [value, setValue] = React.useState('1');

	return (
		<Stack>
			<Center mt={{ sm: '90px', md: '90px', lg: '240px' }} color="white">
				<Heading size="xl" color="gray.700">
					{'Markets'}
				</Heading>
			</Center>

			<Tabs variant="soft-rounded" colorScheme="purple">
				<Center className={styles.tabsContainer}>
					<CustomTabsOption>
						<TabList>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								All
							</Tab>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								Business
							</Tab>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								Crypto
							</Tab>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								AI
							</Tab>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								Politics
							</Tab>
							<Tab _hover={{ color: 'gray.800' }} _selected={{ bg: 'teal.500', color: '#fff' }}>
								Sports
							</Tab>
						</TabList>
					</CustomTabsOption>
				</Center>
				<TabPanels>
					<TabPanel px={paddingMainHorizontal}>
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
						onClick={() => router.push('./markets')}
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
