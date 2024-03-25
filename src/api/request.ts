// https://www.jianshu.com/p/efa82d282c1d
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { LocalesType } from '@/../public/locales/type';

// let baseURL =
// 	process.env.NODE_ENV === 'development'
// 		? 'https://jsonplaceholder.typicode.com'
// 		: 'https://your.domain.com/api';
let baseURL = process.env.NODE_ENV === 'development' ? process.env.DEV_API : process.env.DEV_API;

const timeout = 30000;

// create axios instance
const serviceWithSessing = axios.create({
	timeout,
	baseURL,
	// if needs cookie, set true
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': true,
	},
});

// set interceptors, and headers like language、token...
// 這邊設置 headers 只會吃第一次的設定，導致後續動態改變 Accept-Language 失效
// serviceWithSessing.interceptors.request.use(
// 	(config: any) => {
// 		let customHeaders: any = {
// 			// language: 'zh-cn',
// 			'Content-Type': 'application/json',
// 			// 'ngrok-skip-browser-warning': true,
// 			'Access-Control-Allow-Origin': true,
// 		};
// 		console.log('request', config);
// 		// const TOKEN = Cookies.get('opentrust');
// 		// console.log('TOKEN request', TOKEN);
// 		// config.headers['authorization'] = TOKEN;
// 		// console.log('config', config);
// 		config.headers = customHeaders;
// 		return config;
// 	},
// 	error => {
// 		console.log('interceptors error', error);
// 		Promise.reject(error);
// 	}
// );

serviceWithSessing.interceptors.response.use(
	(response: any) => {
		// 1. 储存token信息
		// console.log('response', response);
		// const TOKEN = response.headers.token;
		// console.log('TOKEN response', TOKEN);
		// Cookies.set('opentrust', 'Bearer ' + TOKEN);
		return response;
	},
	error => {
		console.log('interceptors error', error);
		return error;
		// 會出現紅色 error 在視窗上
		// Promise.reject(error);
	}
);

// Function to set the language header
const setLanguageHeader = (language: LocalesType) => {
	console.log('setLanguageHeader', language);
	serviceWithSessing.defaults.headers.common['Accept-Language'] = language;
};

// axios return data
interface axiosTypes<T> {
	data: T;
	status: number;
	statusText: string;
}

// custome response Type
interface responseTypes<T> {
	code: number;
	msg: string;
	result: T;
}

const requestHandlerWithSession = <T>(
	method: 'get' | 'post' | 'put' | 'delete',
	url: string,
	params: object = {},
	config: AxiosRequestConfig = {}
): Promise<T> => {
	let response: Promise<axiosTypes<responseTypes<T>>>;
	switch (method) {
		case 'get':
			response = serviceWithSessing.get(url, { params: { ...params }, ...config });
			break;
		case 'post':
			response = serviceWithSessing.post(url, { ...params }, { ...config });
			break;
		case 'put':
			response = serviceWithSessing.put(url, { ...params }, { ...config });
			break;
		case 'delete':
			response = serviceWithSessing.delete(url, { params: { ...params }, ...config });
			break;
	}

	return new Promise<T>((resolve, reject) => {
		response
			.then((res: any) => {
				console.log('response res', res);
				// alert(JSON.stringify(res));
				const data = res.data;
				const status = res.status;
				if (status !== 200 && status !== 201 && status !== 204) {
					if (status == 401) {
						console.log('Error handle...');
					}

					let e = JSON.stringify(data);
					console.log(`Request error：${e}`);

					if (res.response.data) {
						// get status is 4XX 在 redux fulfilled 一併處理
						resolve(res.response.data);
					} else {
						reject(data);
					}
				} else {
					// return correct data
					console.log('data', data);
					resolve(data as any);
				}
			})
			.catch(error => {
				let e = JSON.stringify(error);
				console.log(`Internet error：${e}`);
				reject(error);
			});
	});
};

const requestWithSession = {
	get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandlerWithSession<T>('get', url, params, config),
	post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandlerWithSession<T>('post', url, params, config),
	put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandlerWithSession<T>('put', url, params, config),
	delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandlerWithSession<T>('delete', url, params, config),
};

export { requestWithSession, setLanguageHeader };
