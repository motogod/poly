import React, { useMemo, useState } from 'react';
import {
	Stack,
	IconButton,
	Heading,
	Tabs,
	Center,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Tag,
	TagLabel,
} from '@chakra-ui/react';
import styles from './useCategoryTabsList.module.scss';

function useCategoryTabsList() {
	const [selectedTab, setSelectedTab] = useState<string>('');

	const TabDom = useMemo(
		() => (
			<Tabs
				display={{ lg: 'none', md: 'inline', sm: 'inline' }}
				alignItems={'center'}
				justifyContent={'center'}
				position={'fixed'}
				left="0"
				right="0"
				overflowY={'auto'}
				overflowX={'hidden'}
				bg={'gray.50'}
				zIndex={1}
				shadow={'md'}
				variant="soft-rounded"
			>
				<Center className={styles.tabsContainer}>
					<Tag
						h={'64px'}
						p={'0px 16px 0px 16px'}
						border="0px"
						bg={'transparent'}
						borderColor="transparent"
						size="lg"
						colorScheme="undefined"
						borderRadius="full"
						shadow=""
					>
						<TabList gap={'16px'}>
							<Tab
								onClick={() => setSelectedTab('Markets')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Markets
							</Tab>
							<Tab
								onClick={() => setSelectedTab('Business')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Business
							</Tab>
							<Tab
								onClick={() => setSelectedTab('Crypto')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Crypto
							</Tab>
							<Tab
								onClick={() => setSelectedTab('AI')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								AI
							</Tab>
							<Tab
								onClick={() => setSelectedTab('Politics')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Politics
							</Tab>
							<Tab
								onClick={() => setSelectedTab('Sports')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Sports
							</Tab>
						</TabList>
					</Tag>
				</Center>
			</Tabs>
		),
		[]
	);

	return [TabDom, selectedTab];
}

export default useCategoryTabsList;
