import React, { useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Element, scroller } from 'react-scroll';
import { Button, Stack, IconButton, Heading } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import styles from './topicCardList.module.scss';
import TopicCard from './TopicCard/TopicCard';

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
	const [scrollIndex, setScrollIndex] = useState<number>(0);

	const scrollHorizontal = (index: number) => {
		const elementIndex = scrollIndex + index;

		if (elementIndex < 0 || elementIndex > dummyDataArray.length) {
			return;
		}

		setScrollIndex(prev => prev + index);

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
			<Stack justify="center" direction="row">
				<Stack>
					<Heading size="xl" color="gray.700">
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
						onClick={() => scrollHorizontal(-4)}
						isRound={true}
						variant="solid"
						colorScheme="blackAlpha"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronLeftIcon />}
					/>
					<IconButton
						onClick={() => scrollHorizontal(4)}
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
							<Element name={`com-${index}`}>
								<TopicCard key={index} data={value} index={index} />
							</Element>
						</>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default TopicCardList;
