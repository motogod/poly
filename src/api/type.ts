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

export type CheckAuthType = {
	data: { isAuthenticated: boolean; user: { address: string; email: string; id: string } };
	message: string;
	statusCode: number;
};

export interface UserProfile {
	createdAt: string;
	displayName: string | null;
	funds: number;
	id: string;
	portfolio: number;
	updatedAt: string;
	userId: string;
}

export type CheckUserProfileType = {
	data: UserProfile;
	message: string;
	statusCode: number;
};

export type LoginType = {
	data: { user: { address: string; email: string; id: string } };
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
