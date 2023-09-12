import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { CategoryCard } from '@/components/common';

import styles from './categoryActivityList.module.scss';

const empty_array = [...Array(13)];

function CategoryActivityList() {
	return (
		<Grid
			templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
			gap={6}
		>
			{empty_array.map((value, index) => {
				return <CategoryCard key={index} />;
			})}
		</Grid>
	);
}

export default CategoryActivityList;
