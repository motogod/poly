import { createSlice } from '@reduxjs/toolkit';
import { getTestApi } from '../thunks/fetchHome';

type HomeState = {
	testData: [];
};

const initialState: HomeState = {
	testData: [],
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getTestApi.pending, state => {
			console.log('getTestApi pending');
		});
		builder.addCase(getTestApi.fulfilled, (state, action) => {
			console.log('getTestApi fulfilled', action);
		});
		builder.addCase(getTestApi.rejected, state => {
			console.log('getTestApi rejected');
		});
	},
});

export const homeReducer = homeSlice.reducer;
