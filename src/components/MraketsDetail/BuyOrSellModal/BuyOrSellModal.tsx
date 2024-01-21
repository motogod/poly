import React, { useState } from 'react';
import { Stack, Heading, Button, ButtonGroup, IconButton, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import YesOrNoButton from '../Buttons/YesOrNoButton';
import { BuyOrSellModalType } from '../type';
import BuyOrSellContent from '../BuyOrSellContent';

function BuyOrSellModal(props: BuyOrSellModalType) {
	const { transactionType } = props;

	const [transactionValue, setTransactionValue] = useState<string>('');
	const [isYes, setIsYes] = useState(true);

	return (
		<Stack w={'100%'} maxH={'606px'} overflowY={'scroll'}>
			<BuyOrSellContent transactionType={transactionType} />
			<Stack mt={'14px'} mb={'4px'}>
				{/* <Button mt={'24px'} mb={'48px'} w={'100%'} size="lg" bg="teal.500" color="#fff">
					{transactionType}
				</Button> */}
			</Stack>
		</Stack>
	);
}

export default BuyOrSellModal;
