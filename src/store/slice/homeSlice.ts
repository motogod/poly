import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	getMarkets,
	getMarketDetail,
	getMarketOrderBookYes,
	getMarketOrderBookNo,
	getMarketLineChart,
	getMarketLineChartYesAndNo,
} from '../thunks/fetchHome';
import {
	GetMarketsType,
	MarketsItemType,
	OrderBookDataType,
	OrderBookType,
	LineChartType,
	YesAndNoLineChartType,
} from '@/api';
import { VolumeType } from './dataSlice';
import { stat } from 'fs';

type HomeState = {
	isMarketsLoading: boolean;
	markets: MarketsItemType[];
	isMarketDetailLoading: boolean;
	marketDetailData: MarketsItemType;
	isUserClickYesOrNo: boolean; // 使用者在 /marketsDetail 的 Yes 跟 No 切換點擊
	orderBookYesData: OrderBookDataType;
	isOrderBookYesLoading: boolean | null;
	orderBookNoData: OrderBookDataType;
	lineChartData: LineChartType[];
	yesAndNoLineChartData: YesAndNoLineChartType[];
};

const initialState: HomeState = {
	isMarketsLoading: false,
	markets: [],
	isMarketDetailLoading: true,
	marketDetailData: {} as MarketsItemType,
	isUserClickYesOrNo: true,
	orderBookYesData: {} as OrderBookDataType,
	isOrderBookYesLoading: null,
	orderBookNoData: {} as OrderBookDataType,
	lineChartData: [],
	yesAndNoLineChartData: [],
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
			// 後台設置 title 為空的議題不顯示
			const filteredData = action.payload.data.filter(value => value.title !== '');

			state.markets = filteredData;
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
			state.isOrderBookYesLoading = true;
		});
		builder.addCase(getMarketOrderBookYes.fulfilled, (state, action) => {
			console.log('getMarketOrderBookYes fulfilled', action);
			// YES
			state.orderBookYesData = action.payload.data;
			state.isOrderBookYesLoading = false;
		});
		builder.addCase(getMarketOrderBookYes.rejected, state => {
			console.log('getMarketOrderBookYes rejected');
			state.isOrderBookYesLoading = null;
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

		builder.addCase(getMarketLineChart.pending, state => {
			console.log('getMarketLineChart pending');
		});
		builder.addCase(getMarketLineChart.fulfilled, (state, action) => {
			console.log('getMarketLineChart fulfilled', action);
			const { resp, interval } = action.payload;

			resp?.data?.map(value => {
				if (interval === '6h' || interval === '1d') {
					value.time = moment(value.time).format('HH:MM');
				} else {
					value.time = moment(value.time).format('MM/DD');
				}

				return value;
			});

			state.lineChartData = resp?.data;
		});
		builder.addCase(getMarketLineChart.rejected, state => {
			console.log('getMarketLineChart rejected');
		});

		builder.addCase(getMarketLineChartYesAndNo.pending, state => {
			console.log('getMarketLineChartYesAndNo pending');
		});
		builder.addCase(getMarketLineChartYesAndNo.fulfilled, (state, action) => {
			console.log('getMarketLineChartYesAndNo fulfilled', action);
			const { resp, interval } = action.payload;

			resp?.map(value => {
				if (interval === '6h' || interval === '1d') {
					value.Time = moment(value.Time).format('HH:MM');
				} else {
					value.Time = moment(value.Time).format('MM/DD');
				}

				return value;
			});

			state.yesAndNoLineChartData = resp;
		});
		builder.addCase(getMarketLineChartYesAndNo.rejected, state => {
			console.log('getMarketLineChartYesAndNo rejected');
		});
	},
});

export const { userClickYesOrNoButton } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
