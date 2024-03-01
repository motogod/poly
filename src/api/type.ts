export type TestApiType = {
	data: string;
};

export interface MarketsItemType {
	id: string;
	slug: string;
	title: string;
	image: string;
	volume: number;
	liquidity: number;
	outcome: {
		no: number;
		yes: number;
	};
	startDate: string;
	endDate: string;
	initialPrice: number;
	settlePrice: number;
	category: { slug: string; name: string };
	description: string;
}

export type GetMarketsType = {
	total: number;
	data: MarketsItemType[];
};

export type GetMarketDetailType = {
	message: string;
	statusCode: number;
	data: MarketsItemType;
};

export type LineChartType = {
	time: string;
	price: number;
};

export type YesAndNoLineChartType = {
	Time: string;
	Yes: number;
	No: number;
};

export type LineChartTabsIntervalType = 'all' | '1m' | '1w' | '1d' | '6h';

export type GetMarketLineChartType = {
	message: string;
	statusCode: number;
	data: LineChartType[];
};

export type OrderBookDataType = {
	bids: [{ price: number; quantity: number }];
	asks: [{ price: number; quantity: number }];
	last: number;
};

export type OrderBookType = {
	message: string;
	statusCode: number;
	data: OrderBookDataType;
};

export type CheckAuthType = {
	data: {
		isAuthenticated: boolean;
		user: { address: string; email: string; id: string; origin: string; username: string };
	};
	message: string;
	statusCode: number;
};

export interface UserProfile {
	address: string;
	email: string;
	id: string;
	username: string;
	proxyWallet: `0x${string}`;
	walletActivated: boolean;
	profile: { displayName: string | null; funds: number; portfolio: number };
}

export type CheckUserProfileType = {
	data: UserProfile;
	message: string;
	statusCode: number;
};

export type PutUserProfileType = {
	data: {
		id: string;
		username: string;
		address: string;
		email: string;
		profile: {
			displayName: string;
			portfolio: number;
			funds: number;
		};
	};
	message: string;
	statusCode: number;
};

export type LoginType = {
	data: { user: { address: string; email: string; id: string; username: string; origin: string } };
	message: string;
	statusCode: number;
};

export type LogoutType = {
	data: null;
	message: string;
	statusCode: number;
};

export type GetNonceFromServerType = {
	data: { nonce: string };
	message: string;
	statusCode: number;
};

export type FundsType = {
	hold: number; // 系統存的錢
	load: number; // 系統還在處理中的錢
	symbol: string;
	total: number;
};

export type GetUserFundsType = {
	data: FundsType[];
	message: string;
	statusCode: number;
};

export type WithdrawType = {
	id: string;
	address: string;
	amount: number;
	status: string;
	txId: string;
};

export type PostWithdrawType = {
	data: WithdrawType;
	message: string;
	statusCode: number;
};

export type ChildrenCategoriesType = {
	id: string;
	slug: string;
	name: string;
	parentCategory: string | null;
	itemSelected: boolean;
};

export type SubMenuType = {
	id: string;
	slug: string;
	name: string;
	parentCategory: string | null;
	subMenuSelected: boolean;
	childrenCategories: ChildrenCategoriesType[];
};

export type MenuType = {
	menuId: string;
	menu: string;
	menuSelected: boolean;
	selectedValue: string;
	subMenuData: [
		{
			id: string;
			slug: string;
			name: string;
			parentCategory: string | null;
			subMenuSelected: boolean;
			childrenCategories: ChildrenCategoriesType[];
		}
	];
};

export type CategoriesType = {
	menuId: string;
	menu: string;
	menuSelected: boolean;
	menuData: MenuType[];
};

export type GetCategoriesType = {
	data: [
		{
			id: string;
			slug: string;
			name: string;
			parentCategory: string | null;
			subMenuSelected: boolean;
			childrenCategories: ChildrenCategoriesType[];
		}
	];
	message: string;
	statusCode: number;
};

export enum PortfolioOrderSelectorStatus {
	all = 'All',
	active = 'Active',
	// cancelled = 'Cancelled',
}

export type PortfolioHistorySelectorType = 'all' | 'bought' | 'sold' | 'redeem';
export enum PortfolioHistorySelectorStatus {
	all = 'All',
	bought = 'Bought',
	sold = 'Sold',
	redeem = 'Redeem',
}

export type OrderStatusType =
	| 'PENDING'
	| 'PARTIALLY_FILLED'
	| 'FILLED'
	| 'CANCELED'
	| 'EXPIRED'
	| 'TERMINATED';

export type ProtfolioDataType = {
	id: string;
	status: OrderStatusType;
	type: string;
	direction: string | null;
	outcome: 'YES' | 'NO';
	market: {
		id: string;
		image: string;
		slug: string;
		title: string;
	};
	price: number;
	closingPrice: number;
	closedQuantity: number;
	quantity: number;
};

export type GetPortfolioType = {
	data: ProtfolioDataType[];
	message: string;
	statusCode: number;
};

export type PortfoioHistoryActionType = 'BUY' | 'SELL' | 'REDEEM';

export type ProtfolioHistoryDataType = {
	action: PortfoioHistoryActionType;
	market: {
		id: string;
		image: string;
		slug: string;
		title: string;
	};
	outcome: 'YES' | 'NO';
	time: string;
	price: number;
	quantity: number;
	value: number;
};

export type GetPortfolioHistoryType = {
	data: ProtfolioHistoryDataType[];
	message: string;
	statusCode: number;
};

// 可以交易的倉位、無法交易也無法Redeem的倉位、可以Redeem或Claim的倉位
export type PortfoioPostionTableStatus = 'OPEN' | 'CLOSED' | 'RESOLVED';
export enum PortfoioPostionTableStatusEnum {
	all = 'All',
	active = 'Active',
	reedeem = 'Redeem',
	claim = 'Claim',
}

export type PositionsDataType = {
	hold: number; // 持有的量
	load: number; // 被圈存無法交易的量
	market: {
		id: string;
		slug: string;
		title: string;
		image: string;
	};
	outcome: string;
	total: number; // Shares
	price: number; // Price
	value: number;
	last24HrPrice: number;
	status: PortfoioPostionTableStatus;
};

export type UserPortfolioDataType = {
	positions: PositionsDataType[];
	totalValue: number;
};

export type GetUserPortfolioType = {
	data: UserPortfolioDataType;
	message: string;
	statusCode: number;
};

export type PostBuyOrdersParameType = {
	type: 'MARKET' | 'LIMIT';
	direction: 'BUY' | 'SELL';
	outcome: 'YES' | 'NO';
	marketId: string;
	price: number;
	quantity: number; // 即 shares
};

export type PostBuyOrdersType = {
	data: {};
	message: string;
	statusCode: number;
};

export type DeleteOrderType = {
	data: {};
	message: string;
	statusCode: number;
};
