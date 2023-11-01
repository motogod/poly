import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetMarkets, GetNonceFromServer, Login, GetMarketsType } from '@/api';

// Test API
const getMarkets = createAsyncThunk('api/getMarkets', async () => {
	const resp = await GetMarkets<GetMarketsType>({});
	console.log('getMarkets resp', resp);
	return resp;
});

// Get Nonce from server
const getNonce = createAsyncThunk('api/getNonce', async (params: any) => {
	const resp = await GetNonceFromServer(params);
	console.log('getNonce resp is', resp);
	return resp;
});

// Get Nonce from server
const login = createAsyncThunk('api/getNonce', async (params: any) => {
	const resp = await Login(params);
	console.log('Login resp is', resp);
	return resp;
});

export { getMarkets, getNonce, login };
