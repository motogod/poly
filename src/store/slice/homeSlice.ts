import { createSlice } from '@reduxjs/toolkit';
import { getMarkets } from '../thunks/fetchHome';
import { GetMarketsType } from '@/api';

type HomeState = {
	isMarketsLoading: boolean;
	markets: GetMarketsType;
};

const initialState: HomeState = {
	isMarketsLoading: false,
	markets: {} as GetMarketsType,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getMarkets.pending, state => {
			console.log('getMarkets pending');
			state.isMarketsLoading = true;
		});
		builder.addCase(getMarkets.fulfilled, (state, action) => {
			console.log('getMarkets fulfilled', action);
			state.isMarketsLoading = false;
			state.markets = action.payload;
		});
		builder.addCase(getMarkets.rejected, state => {
			state.isMarketsLoading = false;
			console.log('getMarkets rejected');
		});
	},
});

export const homeReducer = homeSlice.reducer;
