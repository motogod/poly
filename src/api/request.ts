// https://www.jianshu.com/p/efa82d282c1d
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

let baseURL =
	process.env.NODE_ENV === 'development'
		? 'https://jsonplaceholder.typicode.com'
		: 'https://your.domain.com/api';

const timeout = 30000;

//创建axios实例
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
			language: 'zh-cn',
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

//后台响应数据格式
//###该接口用于规定后台返回的数据格式，意为必须携带code、msg以及result
//###而result的数据格式 由外部提供。如此即可根据不同需求，定制不同的数据格式
interface responseTypes<T> {
	code: number;
	msg: string;
	result: T;
}

//核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
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
						console.log('登录异常，执行登出...');
					}

					let e = JSON.stringify(data);
					console.log(`请求错误：${e}`);
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
