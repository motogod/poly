import React, { useEffect, useRef, useState } from 'react';
// import ScrollContainer from 'react-indiana-drag-scroll';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css';
import { Element, scroller } from 'react-scroll';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
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
import SkeletonTopicCard from './SkeletonTopicCard';
import TopicCard from './TopicCard/TopicCard';
import Draggable from '@/components/common/Draggable';
import { headerHeight, paddingMainHorizontal } from '@/utils/screen';
import { zIndexMinimum } from '@/utils/zIndex';

const dummyArrayCount = [...Array(10)];

function TopicCardList() {
	const listRef = useRef<any>(null);

	const { t } = useTranslation();

	const { markets, isSpotlightMarketsLoading, spotlightMarkets } = useSelector(
		(state: RootState) => state.homeReducer
	);

	const [TabDom, selectedTab] = useCategoryTabsList();

	// for 點擊滑動
	const [scrollIndex, setScrollIndex] = useState<number>(0);
	const [disableScroll, setDisableScroll] = useState(false);

	const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
	const [isShowRightArrow, setIsShowRightArrow] = useState(false);

	useEffect(() => {
		const checkIsShow = () => {
			if (listRef?.current) {
				const { scrollLeft, clientWidth, scrollWidth } = listRef?.current;

				if (scrollLeft === 0) {
					setIsShowLeftArrow(false);
				} else {
					setIsShowLeftArrow(true);
				}

				if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
					setIsShowRightArrow(false);
				} else {
					setIsShowRightArrow(true);
				}
			}
		};

		function handleScroll() {
			// listener scroll
			checkIsShow();
		}

		// detect value first time
		checkIsShow();

		if (listRef?.current) {
			listRef?.current?.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (listRef?.current) {
				listRef?.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	const scroll = (value: number) => {
		if (listRef.current) {
			listRef.current.scrollBy({
				left: value,
				behavior: 'smooth',
			});
		}
	};

	// 點擊水平滑動
	const scrollHorizontal = (count: number) => {
		setDisableScroll(true);
		setTimeout(() => {
			setDisableScroll(false);
		}, 100);

		const elementIndex = scrollIndex + count;

		if (elementIndex < 0 || elementIndex > spotlightMarkets.length) {
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
			<Stack
				mt={{ lg: '120px', md: headerHeight, sm: headerHeight }}
				justify="center"
				direction="row"
			>
				<Stack>
					<Heading size="lg" color="gray.700">
						{t('bet_on_markets_spotlight')}
					</Heading>
				</Stack>
				<Stack
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					right={'3%'}
					position="absolute"
					align="end"
					justify="end"
					direction="row"
					spacing="6"
				>
					<IconButton
						// onClick={() => (disableScroll ? null : scrollHorizontal(-4))}
						onClick={() => scroll(-1000)}
						isRound={true}
						variant="solid"
						colorScheme="blackAlpha"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronLeftIcon />}
					/>
					<IconButton
						// onClick={() => (disableScroll ? null : scrollHorizontal(4))}
						onClick={() => scroll(1000)}
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

			<Stack
				ref={listRef}
				direction={'row'}
				overflowX={'scroll'}
				className={styles.listContainer}
				spacing={'16px'}
			>
				{spotlightMarkets.length === 0
					? dummyArrayCount.map((value, index) => (
							<Stack key={index}>
								<SkeletonTopicCard index={index} />
							</Stack>
					  ))
					: spotlightMarkets?.map((value, index) => (
							<>
								<Stack key={index}>
									<TopicCard data={value} index={index} />
								</Stack>
								{/* <Element name={`com-${index}`} key={index}>
									<TopicCard data={value} index={index} />
								</Element> */}
								{spotlightMarkets?.length === index + 1 ? (
									<Stack pr={{ md: '16px', sm: '16px' }}></Stack>
								) : null}
							</>
					  ))}

				{/* <Stack direction={'row'} spacing={'16px'}>
					{spotlightMarkets.length === 0
						? dummyArrayCount.map((value, index) => (
								<Stack key={index}>
									<SkeletonTopicCard index={index} />
								</Stack>
						  ))
						: spotlightMarkets?.map((value, index) => (
								<>
									<Element name={`com-${index}`} key={index}>
										<TopicCard data={value} index={index} />
									</Element>
									{spotlightMarkets?.length === index + 1 ? (
										<Stack pr={{ md: '16px', sm: '16px' }}></Stack>
									) : null}
								</>
						  ))}
				</Stack> */}
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
