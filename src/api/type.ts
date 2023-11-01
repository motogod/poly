export type TestApiType = {
	data: string;
};

export interface MarketsItemType {
	categoryId: string;
	createdAt: string;
	description: string;
	endDate: string;
	id: string;
	liquidity: number;
	resolution: string;
	slug: string;
	startDate: string;
	status: 'OPEN';
	title: string;
	updatedAt: string;
	volume: number;
}

export type GetMarketsType = {
	total: number;
	data: MarketsItemType[];
};
