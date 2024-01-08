import React from 'react';
import { Card } from '@chakra-ui/react';
import BuyOrSellContent from '../BuyOrSellContent';

function BuyOrSellCard() {
	return (
		<Card p={'24px'} w={'100%'} shadow="lg" border="1px solid #E2E8F0;" borderRadius="3xl">
			<BuyOrSellContent />
		</Card>
	);
}

export default BuyOrSellCard;
