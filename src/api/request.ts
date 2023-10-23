// https://www.jianshu.com/p/efa82d282c1d
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

let baseURL =
	process.env.NODE_ENV === 'development'
		? 'https://jsonplaceholder.typicode.com'
		: 'https://your.domain.com/api';

const timeout = 30000;

// create axios instance
const service = axios.create({
	timeout,
	baseURL,
	// if needs cookie, set true
	withCredentials: true,
});

// set interceptors, and headers like language、token...
service.interceptors.request.use(
	(config: any) => {
		let customHeaders: any = {
			// language: 'zh-cn',
			'content-type': 'application/json',
		};
		config.headers = customHeaders;
		return config;
	},
	error => {
		console.log(error);
		Promise.reject(error);
	}
);

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

// return promise
const requestHandler = <T>(
	method: 'get' | 'post' | 'put' | 'delete',
	url: string,
	params: object = {},
	config: AxiosRequestConfig = {}
): Promise<T> => {
	let response: Promise<axiosTypes<responseTypes<T>>>;
	switch (method) {
		case 'get':
			response = service.get(url, { params: { ...params }, ...config });
			break;
		case 'post':
			response = service.post(url, { ...params }, { ...config });
			break;
		case 'put':
			response = service.put(url, { ...params }, { ...config });
			break;
		case 'delete':
			response = service.delete(url, { params: { ...params }, ...config });
			break;
	}

	return new Promise<T>((resolve, reject) => {
		response
			.then(res => {
				console.log('request res', res);
				const data = res.data;
				if (data.code !== 200) {
					if (data.code == 401) {
						console.log('Error handle...');
					}

					let e = JSON.stringify(data);
					console.log(`Request error：${e}`);
					// return error
					reject(data);
				} else {
					// return correct data
					resolve(data.result);
				}
			})
			.catch(error => {
				let e = JSON.stringify(error);
				console.log(`Internet error：${e}`);
				reject(error);
			});
	});
};

const request = {
	get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<T>('get', url, params, config),
	post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<T>('post', url, params, config),
	put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<T>('put', url, params, config),
	delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
		requestHandler<T>('delete', url, params, config),
};

export { request };
