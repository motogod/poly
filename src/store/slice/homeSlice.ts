import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getMarkets, getMarketDetail } from '../thunks/fetchHome';
import { GetMarketsType, MarketsItemType } from '@/api';
import { VolumeType } from './dataSlice';

type HomeState = {
	isMarketsLoading: boolean;
	markets: GetMarketsType;
	userSelectedMarketsStartDate: string;
	userSelectedMarketsEndDate: string;
	isMarketDetailLoading: boolean;
	marketDetailData: MarketsItemType;
};

const initialState: HomeState = {
	isMarketsLoading: false,
	markets: {} as GetMarketsType,
	userSelectedMarketsStartDate: '',
	userSelectedMarketsEndDate: '',
	isMarketDetailLoading: true,
	marketDetailData: {} as MarketsItemType,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		//
		filterStartDateAndEndDateMarket: (state, action) => {
			const { startDate: userStartDate, endDate: userEndDate } = action.payload;
			console.log('filterStartDateAndEndDateMarket userStartDate =>', userStartDate);
			state.userSelectedMarketsStartDate = userStartDate;
			state.userSelectedMarketsEndDate = userEndDate;
			// const { startDate: userStartDate, endDate: userEndDate } = action.payload;

			// let filteredResultData: MarketsItemType[] = [];

			// state.markets.data.forEach(value => {
			// 	const { startDate, endDate } = value;

			// 	if (moment(startDate).isAfter(userStartDate) && moment(endDate).isBefore(userEndDate)) {
			// 		filteredResultData.push(value);
			// 	}
			// });

			// state.markets.data = filteredResultData;
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

		builder.addCase(getMarketDetail.pending, state => {
			console.log('getMarketDetail pending');
			state.isMarketDetailLoading = true;
		});
		builder.addCase(getMarketDetail.fulfilled, (state, action) => {
			console.log('getMarketDetail fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.marketDetailData = data;
				state.isMarketDetailLoading = false;
			}
		});
		builder.addCase(getMarketDetail.rejected, state => {
			console.log('getMarketDetail rejected');
			state.isMarketDetailLoading = false;
		});
	},
});

export const { filterStartDateAndEndDateMarket } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
