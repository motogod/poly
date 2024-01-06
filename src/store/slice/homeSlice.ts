import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	getMarkets,
	getMarketDetail,
	getMarketOrderBookYes,
	getMarketOrderBookNo,
} from '../thunks/fetchHome';
import { GetMarketsType, MarketsItemType, OrderBookDataType, OrderBookType } from '@/api';
import { VolumeType } from './dataSlice';

type HomeState = {
	isMarketsLoading: boolean;
	markets: GetMarketsType;
	isMarketDetailLoading: boolean;
	marketDetailData: MarketsItemType;
	isUserClickYesOrNo: boolean; // 使用者在 /marketsDetail 的 Yes 跟 No 切換點擊
	orderBookYesData: OrderBookDataType;
	orderBookNoData: OrderBookDataType;
};

const initialState: HomeState = {
	isMarketsLoading: false,
	markets: {} as GetMarketsType,
	isMarketDetailLoading: true,
	marketDetailData: {} as MarketsItemType,
	isUserClickYesOrNo: true,
	orderBookYesData: {} as OrderBookDataType,
	orderBookNoData: {} as OrderBookDataType,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		// 使用者點擊 Yes or No 改變 LineChartCard 上要顯示的 Yes or No
		userClickYesOrNoButton: (state, action) => {
			state.isUserClickYesOrNo = action.payload;
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

		builder.addCase(getMarketOrderBookYes.pending, state => {
			console.log('getMarketOrderBookYes pending');
		});
		builder.addCase(getMarketOrderBookYes.fulfilled, (state, action) => {
			console.log('getMarketOrderBookYes fulfilled', action);
			// YES
			state.orderBookYesData = action.payload.data;
		});
		builder.addCase(getMarketOrderBookYes.rejected, state => {
			console.log('getMarketOrderBookYes rejected');
		});

		builder.addCase(getMarketOrderBookNo.pending, state => {
			console.log('getMarketOrderBookNo pending');
		});
		builder.addCase(getMarketOrderBookNo.fulfilled, (state, action) => {
			console.log('getMarketOrderBookNo fulfilled', action);
			// NO
			state.orderBookNoData = action.payload.data;
		});
		builder.addCase(getMarketOrderBookNo.rejected, state => {
			console.log('getMarketOrderBookNo rejected');
		});
	},
});

export const { userClickYesOrNoButton } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
