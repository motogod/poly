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
	categories: { slug: string; name: string }[];
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

export type GetMarketPriceType = {
	message: string;
	statusCode: number;
	data: { price: number };
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
	bought = 'Buy',
	sold = 'Sell',
	redeem = 'Claim',
}

export type OrderStatusType =
	| 'PENDING' // 尚未有成交的單
	| 'PARTIALLY_FILLED'
	| 'FILLED'
	| 'CANCELED'
	| 'EXPIRED'
	| 'TERMINATED'; // 預留但尚未使用的一個狀態，預想是臨時下架的單使用的

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

export type PortfoioHistoryActionType = 'BUY' | 'SELL' | 'REDEEM' | 'CLAIM';

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
export type PortfoioPostionTableStatus = 'OPEN' | 'CLOSED' | 'RESOLVED' | 'CLAIM';
export enum PortfoioPostionTableStatusEnum {
	all = 'All',
	active = 'Active',
	claim = 'Claim',
}

export type PositionsDataType = {
	hold: number; // 總共的 Share
	load: number; // 被圈存無法交易的 Share
	avgBuyPrice: number; // 平均買入價
	market: {
		id: string;
		slug: string;
		title: string;
		image: string;
	};
	outcome: 'YES' | 'NO';
	total: number; // 所擁有能動用的 Share
	price: number; // Price
	value: number; // Value
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

export type PointData = {
	data: {
		payload: Payload;
		meta: Meta;
	};
	message: string;
	statusCode: number;
};

export interface Payload {
	points: Point[];
	balance: number;
	earned: number;
	claimed: number;
}

export interface Promotions {
	id: string; //該筆點數兌換活動的 DB 識別 UUID
	startAt: string; // 該筆點數兌換活動的開始時間
	endAt: string; // 該筆點數兌換活動的結束時間
	title: string; // 	兌換活動名稱，依照 Accept-Language 值決定回傳語言，預設英文。
	description: string; // 兌換活動說明的 html，依照 Accept-Language 值決定回傳語言，預設英文。
	image: string; // 兌換活動的圖片
	exchangeRatio: number; // 點數兌換的匯率，多少點數兌換 1 USDT。
	status: 'OPEN' | 'CLOSED'; // 活動呈現開啟或關閉
}

export type PromotionsData = {
	data: Promotions[];
	message: string;
	statusCode: number;
};

export type PromotionsRedeemData = {
	data: {
		id: string; // 該筆兌換紀錄的 DB 識別 UUID
		createdAt: string; // 該筆兌換紀錄的建立時間
		value: number; // 該筆兌換紀錄獲得的 USDT 數量
		pointUsed: number; // 該筆兌換紀錄消耗的點數數量
	};
	message: string;
	statusCode: number;
	error?: {
		code: number;
		message: string;
	};
};

export interface RewardsType {
	completed: boolean;
	completedAt: string;
	description: string;
	id: string;
	name: string;
}

export interface RewardTasks {
	deposit: RewardsType;
	tradeVolume: RewardsType;
	monthlyDraw: RewardsType;
}

export type RewardTasksData = {
	data: RewardTasks;
	message: string;
	statusCode: number;
};

export interface Point {
	id: string;
	createdAt: string;
	type: 'volume' | 'referral' | 'referral_volume' | 'other' | 'redemption' | 'reward_tasks';
	value: number;
}

interface Meta {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}
