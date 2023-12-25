import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CategoryCard } from '@/components/common';

import styles from './categoryActivityList.module.scss';

const empty_array = [...Array(13)];

function CategoryActivityList() {
	const { markets } = useSelector((state: RootState) => state.homeReducer);
	return (
		<Grid
			templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
			gap={6}
		>
			{markets?.data?.map((value, index) => {
				return <CategoryCard key={index} data={value} />;
			})}
		</Grid>
	);
}

export default CategoryActivityList;
