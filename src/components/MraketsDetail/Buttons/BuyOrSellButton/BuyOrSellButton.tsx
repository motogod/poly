import React from 'react';
import { Button } from '@chakra-ui/react';

type BuyOrSellButtonType = {
	selected: boolean;
	text: string;
	onClick: () => void;
};

const selectedStyle = {
	bg: 'gray.600',
	color: '#fff',
	hoverBg: 'gray.700',
};

const unSelectedStyle = {
	bg: 'gray.100',
	color: 'gray.500',
	hoverBg: 'gray.200',
};

function BuyOrSellButton(props: BuyOrSellButtonType) {
	const { selected, text, onClick } = props;
	return (
		<Button
			w={'100%'}
			h={'48px'}
			size="lg"
			bg={selected ? selectedStyle.bg : unSelectedStyle.bg}
			color={selected ? selectedStyle.color : unSelectedStyle.color}
			_hover={{ bg: selected ? selectedStyle.hoverBg : unSelectedStyle.hoverBg }}
			onClick={onClick}
		>
			{text}
		</Button>
	);
}

export default BuyOrSellButton;
