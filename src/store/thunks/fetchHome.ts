import { createAsyncThunk } from '@reduxjs/toolkit';
import { TestApi, TestApiType } from '@/api';

// Test API
const getTestApi = createAsyncThunk('api/getTestApi', async () => {
	const resp = await TestApi<TestApiType>({});

	return resp;
});

export { getTestApi };
