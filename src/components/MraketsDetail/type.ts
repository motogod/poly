export enum TransactionEnum {
	buy = 'Buy',
	sell = 'Sell',
}

export type BuyOrSellModalContentType = {
	transactionType: TransactionEnum;
};
