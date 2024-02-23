import React, { useEffect, useCallback } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { motion, useAnimationControls } from 'framer-motion';

type YesOrNoButtonType = {
	selected: boolean;
	leftText: 'Yes' | 'No';
	rightText: string;
	onClick: () => void;
};

const selectedYesStyle = {
	bg: '#fff',
	color: 'green.500',
};

const selectedNoStyle = {
	bg: '#fff',
	color: 'red.400',
};

const unSelectedStyle = {
	bg: '#fff',
	color: 'gray.500',
};

function YesOrNoButton(props: YesOrNoButtonType) {
	const { selected, leftText, rightText, onClick } = props;

	const selectedColor = leftText === 'Yes' ? selectedYesStyle.color : selectedNoStyle.color;

	const { isOrderBookYesLoading } = useSelector((state: RootState) => state.homeReducer);

	const controls = useAnimationControls();

	const sequence = useCallback(async () => {
		await controls.start({ scale: 1.1, transition: { duration: 0.5 } });
		return await controls.start({ scale: 1, transition: { duration: 0.5 } });
	}, [controls]);
	// const sequence = async () => {
	// };

	useEffect(() => {
		// false 表示資料讀取完畢
		if (!isOrderBookYesLoading) {
			sequence();
		}
	}, [isOrderBookYesLoading, sequence]);

	return (
		<Button
			style={{ justifyContent: 'space-between' }}
			rightIcon={
				<Box as={motion.div} animate={controls}>
					<p>{rightText}</p>
				</Box>
			}
			bg={selected ? selectedYesStyle.bg : unSelectedStyle.bg}
			color={selected ? selectedColor : unSelectedStyle.color}
			border={selected ? '1px' : '1px'}
			borderColor={selected ? selectedColor : 'gray.200'}
			onClick={onClick}
		>
			{leftText}
		</Button>
	);
}

export default YesOrNoButton;
