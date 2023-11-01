import { createSlice } from '@reduxjs/toolkit';
import { getMarkets } from '../thunks/fetchHome';
import { GetMarketsType } from '@/api';

type HomeState = {
	markets: GetMarketsType;
};

const initialState: HomeState = {
	markets: {} as GetMarketsType,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getMarkets.pending, state => {
			console.log('getMarkets pending');
		});
		builder.addCase(getMarkets.fulfilled, (state, action) => {
			console.log('getMarkets fulfilled', action);
			state.markets = action.payload;
		});
		builder.addCase(getMarkets.rejected, state => {
			console.log('getMarkets rejected');
		});
	},
});

export const homeReducer = homeSlice.reducer;
