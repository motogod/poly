import React, { useEffect, useRef, useState } from 'react';
// import ScrollContainer from 'react-indiana-drag-scroll';
import { Element, scroller } from 'react-scroll';
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
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useCategoryTabsList } from '@/hooks';
import styles from './topicCardList.module.scss';
import TopicCard from './TopicCard/TopicCard';
import Draggable from '@/components/common/Draggable';

const dummyDataArray = [
	{ title: 'One' },
	{ title: 'Two' },
	{ title: 'Three' },
	{ title: 'Four' },
	{ title: 'Five' },
	{ title: 'Test test test' },
	{ title: 'tttttaaaa loojsfk' },
	{ title: 'Elevent test' },
	{ title: 'fdsagasgj;g' },
	{ title: 'dsafsafasdfasdf' },
	{ title: 'Onsadfasdfasdfsdfasdfasdfe' },
];

function TopicCardList() {
	const listRef = useRef<any>(null);

	const [TabDom, selectedTab] = useCategoryTabsList();

	// for 點擊滑動
	const [scrollIndex, setScrollIndex] = useState<number>(0);
	const [disableScroll, setDisableScroll] = useState(false);

	// 點擊水平滑動
	const scrollHorizontal = (count: number) => {
		setDisableScroll(true);
		setTimeout(() => {
			setDisableScroll(false);
		}, 500);

		const elementIndex = scrollIndex + count;

		if (elementIndex < 0 || elementIndex > dummyDataArray.length) {
			return;
		}

		setScrollIndex(prev => prev + count);

		scroller.scrollTo(`com-${elementIndex}`, {
			containerId: 'topicCard', // <= add this
			horizontal: true, // <=
			duration: 500,
			delay: 100,
			smooth: true,
		});
	};

	return (
		<Stack>
			{TabDom}
			{/* <Tabs
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
				colorScheme="purple"
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
								onClick={() => alert('Markets')}
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Markets
							</Tab>
							<Tab
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Business
							</Tab>
							<Tab
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Crypto
							</Tab>
							<Tab
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								AI
							</Tab>
							<Tab
								border={'1px'}
								_selected={{ bg: 'teal.500', color: '#fff' }}
								color={'black'}
								borderColor={'gray.200'}
							>
								Politics
							</Tab>
							<Tab
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
			</Tabs> */}
			<Stack mt={{ lg: '64px', md: '112px', sm: '112px' }} justify="center" direction="row">
				<Stack>
					<Heading size="lg" color="gray.700">
						{'Bet on markets spotlight'}
					</Heading>
				</Stack>
				<Stack
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					right={132}
					position="absolute"
					align="end"
					justify="end"
					direction="row"
					spacing="6"
				>
					<IconButton
						onClick={() => (disableScroll ? null : scrollHorizontal(-4))}
						isRound={true}
						variant="solid"
						colorScheme="blackAlpha"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronLeftIcon />}
					/>
					<IconButton
						onClick={() => (disableScroll ? null : scrollHorizontal(4))}
						ml="2"
						isRound={true}
						variant="solid"
						colorScheme="teal"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronRightIcon />}
					/>
				</Stack>
			</Stack>
			<Stack id="topicCard" className={styles.listContainer}>
				<Stack display="grid" gridAutoFlow="column" my="0.5">
					{dummyDataArray.map((value, index) => (
						<>
							<Element name={`com-${index}`} key={index}>
								<TopicCard key={index} data={value} index={index} />
							</Element>
						</>
					))}
				</Stack>
			</Stack>

			{/* <Draggable innerRef={listRef}>
				{dummyDataArray.map((value, index) => (
					<>
						<Element name={`com-${index}`}>
							<TopicCard key={index} data={value} index={index} />
						</Element>
					</>
				))}
			</Draggable> */}

			<Stack display="flex" direction="row">
				{/* <Stack width="100vw" justify="space-between" backgroundColor="black">
					<Stack w="20%" borderBottom="50px solid black" borderLeft="100vw solid #fff" />
					<Stack borderBottom="50px solid #fff" borderLeft="100vw solid black" />
				</Stack> */}
				{/* <Stack pb="100px" justify="space-between">
					<Stack borderBottom="50px solid #FF1EAB" borderLeft="1200px solid #fff" />
					<Stack borderBottom="50px solid #fff" borderLeft="1200px solid #FF1EAB" />
				</Stack> */}
			</Stack>
		</Stack>
	);
}

export default TopicCardList;
