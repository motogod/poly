import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';
import TopicCardList from './TopicCardList';

import styles from './topTopicSection.module.scss';

function TopTopicSection() {
	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	return (
		<Stack position={'relative'}>
			<TopicCardList />
			<div className={`${styles.skewRectangle} ${!isDesktop && styles.mobileSkewRectangle}`}></div>
		</Stack>
	);
}

export default TopTopicSection;
