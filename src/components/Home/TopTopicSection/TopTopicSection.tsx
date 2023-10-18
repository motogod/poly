import React from 'react';
import { Stack } from '@chakra-ui/react';
import TopicCardList from './TopicCardList';
import { headerHeight, paddingMainVertical } from '@/utils/screen';

import styles from './topTopicSection.module.scss';

function TopTopicSection() {
	return (
		<Stack>
			<TopicCardList />
		</Stack>
	);
}

export default TopTopicSection;
