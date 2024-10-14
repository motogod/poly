import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getPoints, getPromotions, postPromotionsRedeem } from '../thunks/fetchPoint';
import { Payload, Promotions } from '@/api';

interface Meta {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	itemCount: number;
	page: number;
	pageCount: number;
	take: number;
}

type PointState = {
	userPointData: Payload;
	meta: Meta;
	userPromotionsData: Promotions[]; // 使用者的可兌換活動
	isUserPromotionsRedeemLoading: boolean;
	userPromotionsRedeemStatusCode: number;
};

const initialState: PointState = {
	userPointData: {} as Payload,
	meta: {} as Meta,
	userPromotionsData: [],
	isUserPromotionsRedeemLoading: false,
	userPromotionsRedeemStatusCode: 0,
};

const pointSlice = createSlice({
	name: 'point',
	initialState,
	reducers: {
		resetUserPromotionsRedeem: (state, action) => {
			state.isUserPromotionsRedeemLoading = false;
			state.userPromotionsRedeemStatusCode = 0;
		},
	},
	extraReducers: builder => {
		builder.addCase(getPoints.pending, state => {
			console.log('getPoints pending');
		});
		builder.addCase(getPoints.fulfilled, (state, action) => {
			console.log('getPoints fulfilled', action);
			const { statusCode, data } = action.payload;

			if (statusCode === 200) {
				state.userPointData = data.payload;
				state.meta = data.meta;
			}
		});
		builder.addCase(getPoints.rejected, state => {
			console.log('getPoints rejected');
		});

		builder.addCase(getPromotions.pending, state => {
			console.log('getPromotions pending');
			state.userPromotionsRedeemStatusCode = 0;
		});
		builder.addCase(getPromotions.fulfilled, (state, action) => {
			console.log('getPromotions fulfilled', action);
			const { statusCode, data } = action.payload;

			if (statusCode === 200) {
				state.userPromotionsData = data;
			}
		});
		builder.addCase(getPromotions.rejected, state => {
			console.log('getPromotions rejected');
		});

		builder.addCase(postPromotionsRedeem.pending, state => {
			console.log('postPromotionsRedeem pending');
			state.isUserPromotionsRedeemLoading = true;
			state.userPromotionsRedeemStatusCode = 0;
		});
		builder.addCase(postPromotionsRedeem.fulfilled, (state, action) => {
			console.log('postPromotionsRedeem fulfilled', action);
			const { statusCode, data, error } = action.payload;

			state.isUserPromotionsRedeemLoading = false;

			if (statusCode === 201) {
				state.userPromotionsRedeemStatusCode = 201;
			} else if (statusCode === 400) {
				state.userPromotionsRedeemStatusCode = error?.code || 0;
			} else {
				state.userPromotionsRedeemStatusCode = 404; // Promotion is not found or expired.
			}
		});
		builder.addCase(postPromotionsRedeem.rejected, state => {
			console.log('postPromotionsRedeem rejected');
			state.isUserPromotionsRedeemLoading = false;
			state.userPromotionsRedeemStatusCode = 0;
		});
	},
});

export const { resetUserPromotionsRedeem } = pointSlice.actions;
export const pointReducer = pointSlice.reducer;
