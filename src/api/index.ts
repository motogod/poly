import { request, requestWithSession } from './request';

export const GetMarkets = <T>(params: any) =>
	requestWithSession.get<T>('/markets', params, { timeout: 15000 });

// nonce
export const GetNonceFromServer = <T>(params: any) =>
	requestWithSession.get<T>('/auth/nonce', params, { timeout: 15000 });

export const LoginWithSiwe = <T>(params: any) =>
	requestWithSession.post<T>('/auth/login/siwe', params, { timeout: 15000 });

export const LoginWithGoogle = <T>(params: any) =>
	requestWithSession.post<T>('/auth/login/google', params, { timeout: 15000 });

export const Logout = <T>(params: any) =>
	requestWithSession.get<T>('/auth/logout', params, { timeout: 15000 });

// Confirm login or logout status
export const CheckAuth = <T>(params: any) =>
	requestWithSession.get<T>('/auth/session', params, { timeout: 15000 });

// Get user data
export const GetUserProfile = <T>(params: any) =>
	requestWithSession.get<T>('/accounts/profile', params, { timeout: 15000 });

// Update User Profile (username)
export const PutUserProfile = <T>(params: any) =>
	requestWithSession.put<T>('/accounts/profile/username', params, { timeout: 15000 });

// Update User email (google mail only)
export const PutUserEmail = <T>(params: any) =>
	requestWithSession.put<T>('/accounts/profile/email', params, { timeout: 15000 });

// Get user funds
export const GetUserFunds = <T>(params: any) =>
	requestWithSession.get<T>('/accounts/funds', params, { timeout: 15000 });

export const PostWithdraw = <T>(params: any) =>
	requestWithSession.post<T>('/accounts/withdrawals', params, { timeout: 15000 });

export * from './type';
