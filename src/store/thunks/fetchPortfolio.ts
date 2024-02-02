import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	GetPortfolioOrders,
	GetPortfolioType,
	PostTradeOrders,
	PostBuyOrdersType,
	PostBuyOrdersParameType,
	DeletePortfolioOrder,
	DeleteOrderType,
	GetUserPortfolioPositions,
	GetUserPortfolioType,
	GetPortfolioHistory,
	GetPortfolioHistoryType,
} from '@/api';

// Orders
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

// Portfolio History
const getPortfolioHistory = createAsyncThunk('api/getPortfolioHistory', async () => {
	const resp = await GetPortfolioHistory<GetPortfolioHistoryType>({});
	console.log('getPortfolioHistory resp', resp);
	return resp;
});

const deleteOrder = createAsyncThunk('api/deleteOrder', async (params: { id: string }) => {
	console.log('deleteOrder params', params);
	const resp = await DeletePortfolioOrder<DeleteOrderType>(params);
	console.log('deleteOrder resp is', resp);

	return { id: params.id };
});

// Positions
const getUserPortfolioPositions = createAsyncThunk(
	'api/getUserPortfolio',
	async (params: { marketId: string }) => {
		const resp = await GetUserPortfolioPositions<GetUserPortfolioType>(params);
		console.log('getUserPortfolioPositions resp', resp);
		return resp;
	}
);

// for Positions hold
const getUserPortfolioPositionsForHold = createAsyncThunk(
	'api/getUserPortfolioPositionsForHold',
	async (params: { marketId: string }) => {
		const resp = await GetUserPortfolioPositions<GetUserPortfolioType>(params);
		console.log('getUserPortfolioPositionsForHold resp', resp);
		return resp;
	}
);

export {
	getPortfolioOrders,
	tradeOrders,
	deleteOrder,
	getUserPortfolioPositions,
	getUserPortfolioPositionsForHold,
	getPortfolioHistory,
};
