import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetPortfolioOrders, GetPortfolioType } from '@/api';

const getPortfolioOrders = createAsyncThunk('api/getCategories', async () => {
	const resp = await GetPortfolioOrders<GetPortfolioType>({});
	console.log('getPortfolioOrders resp', resp);
	return resp;
});

export { getPortfolioOrders };
