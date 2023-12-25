import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getMarkets } from '../thunks/fetchHome';
import { GetMarketsType, MarketsItemType } from '@/api';
import { VolumeType } from './dataSlice';

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
	reducers: {
		//
		filterStartDateAndEndDateMarket: (state, action) => {
			const { startDate: userStartDate, endDate: userEndDate } = action.payload;

			let filteredResultData: MarketsItemType[] = [];

			state.markets.data.forEach(value => {
				const { startDate, endDate } = value;

				if (moment(startDate).isAfter(userStartDate) && moment(endDate).isBefore(userEndDate)) {
					filteredResultData.push(value);
				}
			});

			state.markets.data = filteredResultData;
		},
	},
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

export const { filterStartDateAndEndDateMarket } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
