import { createSlice } from '@reduxjs/toolkit';
import { getPortfolioOrders } from '../thunks/fetchPortfolio';
import { GetPortfolioType } from '@/api';

type IpState = {
	portfolioOrdersData: GetPortfolioType;
};

const initialState: IpState = {
	portfolioOrdersData: {} as GetPortfolioType,
};

const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Get user funds
		builder.addCase(getPortfolioOrders.pending, state => {
			console.log('getPortfolioOrders pending');
		});
		builder.addCase(getPortfolioOrders.fulfilled, (state, action) => {
			console.log('getPortfolioOrders fulfilled', action);
			const { statusCode, data } = action.payload;
		});
		builder.addCase(getPortfolioOrders.rejected, (state, action) => {
			console.log('getPortfolioOrders rejected', action);
		});
	},
});

export const {} = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;
