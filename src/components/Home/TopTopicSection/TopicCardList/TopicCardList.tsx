import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
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
	return (
		<ScrollContainer className={styles.listContainer}>
			<div className={styles.list}>
				{dummyDataArray.map((value, index) => (
					<TopicCard key={index} data={value} />
				))}
			</div>
		</ScrollContainer>
	);
}

export default TopicCardList;
