import React, { useState } from 'react';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import styles from './categorySection.module.scss';
import CategoryActivityList from './CategoryActivityList';

function CategorySection() {
	const [value, setValue] = React.useState('1');

	return (
		<div className={styles.wrapper}>
			<div className={styles.categoryContainer}>
				<RadioGroup onChange={setValue} value={value}>
					<Stack direction="row">
						<Radio value="1">First</Radio>
						<Radio value="2">Second</Radio>
						<Radio value="3">Third</Radio>
					</Stack>
				</RadioGroup>
			</div>
			<CategoryActivityList />
		</div>
	);
}

export default CategorySection;
