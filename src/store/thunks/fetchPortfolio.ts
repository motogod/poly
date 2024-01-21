import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	GetPortfolioOrders,
	GetPortfolioType,
	PostTradeOrders,
	PostBuyOrdersType,
	PostBuyOrdersParameType,
	DeletePortfolioOrder,
	DeleteOrderType,
	GetUserPortfolio,
	GetUserPortfolioType,
} from '@/api';

const getPortfolioOrders = createAsyncThunk('api/getPortfolioOrders', async () => {
	const resp = await GetPortfolioOrders<GetPortfolioType>({});
	console.log('getPortfolioOrders resp', resp);
	return resp;
});

const tradeOrders = createAsyncThunk('api/tradeOrders', async (params: PostBuyOrdersParameType) => {
	console.log('tradeOrders params', params);
	const resp = await PostTradeOrders<PostBuyOrdersType>(params);
	console.log('tradeOrders resp is', resp);

	return resp;
});

const deleteOrder = createAsyncThunk('api/deleteOrder', async (params: { id: string }) => {
	console.log('deleteOrder params', params);
	const resp = await DeletePortfolioOrder<DeleteOrderType>(params);
	console.log('deleteOrder resp is', resp);

	return { id: params.id };
});

const getUserPortfolio = createAsyncThunk(
	'api/getUserPortfolio',
	async (params: { marketId: string }) => {
		const resp = await GetUserPortfolio<GetUserPortfolioType>(params);
		console.log('getUserPortfolio resp', resp);
		return resp;
	}
);

export { getPortfolioOrders, tradeOrders, deleteOrder, getUserPortfolio };
