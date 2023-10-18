import React from 'react';
import { Button } from '@chakra-ui/react';

type YesOrNoButtonType = {
	selected: boolean;
	leftText: string;
	rightText: string;
	onClick: () => void;
};

const selectedStyle = {
	bg: '#fff',
	color: 'green.500',
};

const unSelectedStyle = {
	bg: '#fff',
	color: 'gray.500',
};

function YesOrNoButton(props: YesOrNoButtonType) {
	const { selected, leftText, rightText, onClick } = props;

	return (
		<Button
			style={{ justifyContent: 'space-between' }}
			rightIcon={<p>{rightText}</p>}
			bg={selected ? selectedStyle.bg : unSelectedStyle.bg}
			color={selected ? selectedStyle.color : unSelectedStyle.color}
			border={selected ? '2px' : '1px'}
			onClick={onClick}
		>
			{leftText}
		</Button>
	);
}

export default YesOrNoButton;
