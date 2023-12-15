import React from 'react';
import { Button } from '@chakra-ui/react';

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

	return (
		<Button
			style={{ justifyContent: 'space-between' }}
			rightIcon={<p>{rightText}</p>}
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
