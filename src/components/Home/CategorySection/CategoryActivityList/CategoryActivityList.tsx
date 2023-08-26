import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, GridItem } from '@chakra-ui/react';
import CategoryActivityListCard from './CategoryActivityListCard';

import styles from './categoryActivityList.module.scss';

function CategoryActivityList() {
	const isDesktop = useMediaQuery({
		query: '(min-width: 1200px)',
	});

	return (
		<Grid templateColumns={`${isDesktop ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'}`} gap={6}>
			<CategoryActivityListCard />
			<CategoryActivityListCard />
			<CategoryActivityListCard />
			<CategoryActivityListCard />
		</Grid>
	);
}

export default CategoryActivityList;
