import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, GridItem } from '@chakra-ui/react';
import CategoryActivityListCard from './CategoryActivityListCard';

import styles from './categoryActivityList.module.scss';

function CategoryActivityList() {
	return (
		<Grid
			templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
			gap={6}
		>
			<CategoryActivityListCard />
			<CategoryActivityListCard />
			<CategoryActivityListCard />
			<CategoryActivityListCard />
		</Grid>
	);
}

export default CategoryActivityList;
