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
}

export type GetMarketsType = {
	total: number;
	data: MarketsItemType[];
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
