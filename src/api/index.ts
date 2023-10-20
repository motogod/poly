import { request } from './request';

// like Test
export const TestApi = <T>(params: any) => request.get<T>('/posts', params, { timeout: 15000 });
