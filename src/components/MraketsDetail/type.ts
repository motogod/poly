export enum TransactionEnum {
	buy = 'Buy',
	sell = 'Sell',
}

export type BuyOrSellModalType = {
	transactionType: TransactionEnum;
};
