import React from 'react';
import { Grid, GridItem, ScaleFade, Text, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CategoryCard, SkeletonCard } from '@/components/common';

import styles from './categoryActivityList.module.scss';

const dummyArrayCount = [...Array(3)];

function CategoryActivityList({ selectedCategory }: { selectedCategory: string }) {
	const { isHomeCategorySectionMarketsLoading, homeCategorySectionMarkets } = useSelector(
		(state: RootState) => state.homeReducer
	);

	const length = homeCategorySectionMarkets.length;

	if (isHomeCategorySectionMarketsLoading) {
		return (
			<Grid templateColumns={'repeat(3, 1fr)'} gap={6}>
				{dummyArrayCount.map((value, index) => {
					return <SkeletonCard key={index} />;
				})}
			</Grid>
		);
	}

	return (
		<Grid
			templateColumns={{
				lg: length > 0 ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
				md: length > 0 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
				sm: 'repeat(1, 1fr)',
			}}
			gap={6}
		>
			{length > 0 ? (
				homeCategorySectionMarkets?.map((value, index) => {
					return <CategoryCard key={index} data={value} />;
				})
			) : (
				<Stack w={'100%'}>
					<ScaleFade initialScale={0.9} in={true}>
						<Text
							textAlign={'center'}
							color={'gray.500'}
							fontSize={{ lg: '2xl', md: '2xl', sm: 'xl' }}
						>
							{`${selectedCategory} is currently no relevant topic information`}
						</Text>
					</ScaleFade>
				</Stack>
			)}
		</Grid>
	);
}

export default CategoryActivityList;
