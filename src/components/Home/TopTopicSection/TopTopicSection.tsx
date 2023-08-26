import React from 'react';
import { Heading, Center } from '@chakra-ui/react';
import TopicCardList from './TopicCardList';
import styles from './topTopicSection.module.scss';

function TopTopicSection() {
	return (
		<div className={styles.topTopicWrapper}>
			<Center h="160px" color="white">
				<Heading size="xl" color="gray.700">
					{'Bet on markets spotlight'}
				</Heading>
			</Center>
			<TopicCardList />
		</div>
	);
}

export default TopTopicSection;
