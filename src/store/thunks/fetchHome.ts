import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetMarkets, GetMarketsType } from '@/api';

// Test API
const getMarkets = createAsyncThunk('api/getMarkets', async () => {
	const resp = await GetMarkets<GetMarketsType>({});
	console.log('getMarkets resp', resp);
	return resp;
});

export { getMarkets };
