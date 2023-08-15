import React from 'react';
import styles from './topTopicSection.module.scss';
import TopicCardList from './TopicCardList';

function TopTopicSection() {
	return (
		<div className={styles.topTopicWrapper}>
			<p>Bet Top Topic</p>
			<TopicCardList />
		</div>
	);
}

export default TopTopicSection;
