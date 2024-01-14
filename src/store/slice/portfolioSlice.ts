import { createSlice } from '@reduxjs/toolkit';
import { getPortfolioOrders, tradeOrders, deleteOrder } from '../thunks/fetchPortfolio';
import { GetPortfolioType, ProtfolioDataType } from '@/api';
import { resetTradeOrdersStatus } from '../actions';

type IpState = {
	portfolioOrdersData: ProtfolioDataType[];
	isTradeOrdersLoading: boolean;
	isTradeSuccess: boolean | null;
	isDeleteOrderLoading: boolean;
	isDeleteOrderSuccess: boolean | null;
};

const initialState: IpState = {
	portfolioOrdersData: [],
	isTradeOrdersLoading: false,
	isTradeSuccess: null,
	isDeleteOrderLoading: false,
	isDeleteOrderSuccess: null,
};

const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Reset Trade Orders status
		builder.addCase(resetTradeOrdersStatus, state => {
			state.isTradeOrdersLoading = false;
			state.isTradeSuccess = null;
		});

		//
		builder.addCase(getPortfolioOrders.pending, state => {
			console.log('getPortfolioOrders pending');
		});
		builder.addCase(getPortfolioOrders.fulfilled, (state, action) => {
			console.log('getPortfolioOrders fulfilled', action);
			const { statusCode, data } = action.payload;
			state.portfolioOrdersData = data;
		});
		builder.addCase(getPortfolioOrders.rejected, (state, action) => {
			console.log('getPortfolioOrders rejected', action);
		});

		// Trade Orders BUY or SELL
		builder.addCase(tradeOrders.pending, state => {
			console.log('tradeOrders pending');
			state.isTradeSuccess = null;
			state.isTradeOrdersLoading = true;
		});
		builder.addCase(tradeOrders.fulfilled, (state, action) => {
			console.log('tradeOrders fulfilled', action);
			// const { statusCode, data } = action.payload;
			state.isTradeOrdersLoading = false;
			state.isTradeSuccess = true;
		});
		builder.addCase(tradeOrders.rejected, (state, action) => {
			console.log('tradeOrders rejected', action);
			state.isTradeOrdersLoading = false;
			state.isTradeSuccess = false;
		});

		// Delete order
		builder.addCase(deleteOrder.pending, (state, action) => {
			console.log('deleteOrder pending');
			state.isDeleteOrderLoading = true;
		});
		builder.addCase(deleteOrder.fulfilled, (state, action) => {
			console.log('deleteOrder fulfilled', action);
			const { statusCode, data, id } = action.payload;
			// 依據 id 刪除掉存在 redux 的該筆 portfolio order 資料
			state.isDeleteOrderLoading = false;
		});
		builder.addCase(deleteOrder.rejected, (state, action) => {
			console.log('deleteOrder rejected', action);
			state.isDeleteOrderLoading = false;
		});
	},
});

export const {} = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;
