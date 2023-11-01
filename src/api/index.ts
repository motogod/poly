import { request } from './request';

// like Test
export const GetMarkets = <T>(params: any) =>
	request.get<T>('/markets', params, { timeout: 15000 });

// nonce
export const GetNonceFromServer = <T>(params: any) =>
	request.get<T>('/auth/nonce', params, { timeout: 15000 });

export const Login = <T>(params: any) => request.post<T>('/auth/login', params, { timeout: 15000 });

export * from './type';
