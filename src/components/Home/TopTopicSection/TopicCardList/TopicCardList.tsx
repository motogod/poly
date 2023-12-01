import React, { useEffect, useRef, useState } from 'react';
// import ScrollContainer from 'react-indiana-drag-scroll';
import { Element, scroller } from 'react-scroll';
import { useTranslation } from 'next-i18next';
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
import { paddingMainHorizontal } from '@/utils/screen';
import { zIndexMinimum } from '@/utils/zIndex';

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

	const { t } = useTranslation();

	const [TabDom, selectedTab] = useCategoryTabsList();

	// for 點擊滑動
	const [scrollIndex, setScrollIndex] = useState<number>(0);
	const [disableScroll, setDisableScroll] = useState(false);

	console.log('render disableScroll', disableScroll);

	// 點擊水平滑動
	const scrollHorizontal = (count: number) => {
		setDisableScroll(true);
		setTimeout(() => {
			setDisableScroll(false);
		}, 1000);

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
		<Stack zIndex={zIndexMinimum}>
			{TabDom}
			<Stack mt={{ lg: '120px', md: '112px', sm: '112px' }} justify="center" direction="row">
				<Stack>
					<Heading size="lg" color="gray.700">
						{t('bet_on_markets_spotlight')}
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
				<Stack spacing={'16px'} display="grid" gridAutoFlow="column" my="0.5">
					{dummyDataArray.map((value, index) => (
						<>
							<Element name={`com-${index}`} key={index}>
								<TopicCard data={value} index={index} />
							</Element>
							{dummyDataArray.length === index + 1 ? (
								<Stack w={{ md: '116px', sm: '16px' }}></Stack>
							) : null}
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
