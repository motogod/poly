import React from 'react';
import { Stack } from '@chakra-ui/react';
import TopicCardList from './TopicCardList';
import { paddingMainVertical } from '@/utils/screen';

import styles from './topTopicSection.module.scss';

function TopTopicSection() {
	return (
		<Stack py={paddingMainVertical}>
			<TopicCardList />
		</Stack>
	);
}

export default TopTopicSection;
