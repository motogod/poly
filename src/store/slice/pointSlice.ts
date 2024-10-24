import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	getPoints,
	getPromotions,
	postPromotionsRedeem,
	getRewardTasks,
	postRewardTasksMonthlyDrawJoin,
} from '../thunks/fetchPoint';
import { Payload, Promotions, RewardTasks, RewardTasksData } from '@/api';

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
	rewarkTasksData: RewardTasks;
	isPostRewardTasksMonthlyDrawJoinLoading: boolean;
	isPostRewardTasksMonthlyDrawStatusCode: number;
};

const initialState: PointState = {
	userPointData: {} as Payload,
	meta: {} as Meta,
	userPromotionsData: [],
	isUserPromotionsRedeemLoading: false,
	userPromotionsRedeemStatusCode: 0,
	rewarkTasksData: {} as RewardTasks,
	isPostRewardTasksMonthlyDrawJoinLoading: false,
	isPostRewardTasksMonthlyDrawStatusCode: 0,
};

const pointSlice = createSlice({
	name: 'point',
	initialState,
	reducers: {
		resetUserPromotionsRedeem: (state, action) => {
			state.isUserPromotionsRedeemLoading = false;
			state.userPromotionsRedeemStatusCode = 0;
		},
		resetPostRewardTasksMonthlyDraw: (state, action) => {
			state.isPostRewardTasksMonthlyDrawJoinLoading = false;
			state.isPostRewardTasksMonthlyDrawStatusCode = 0;
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

		builder.addCase(getRewardTasks.pending, state => {
			console.log('getRewardTasks pending');
		});
		builder.addCase(getRewardTasks.fulfilled, (state, action) => {
			console.log('getRewardTasks fulfilled', action);
			const { data, statusCode } = action.payload;

			if (statusCode === 200) {
				state.rewarkTasksData = data;
			}
		});
		builder.addCase(getRewardTasks.rejected, state => {
			console.log('getRewardTasks rejected');
		});

		builder.addCase(postRewardTasksMonthlyDrawJoin.pending, state => {
			console.log('postRewardTasksMonthlyDrawJoin pending');
			state.isPostRewardTasksMonthlyDrawJoinLoading = true;
		});
		builder.addCase(postRewardTasksMonthlyDrawJoin.fulfilled, (state, action) => {
			console.log('postRewardTasksMonthlyDrawJoin fulfilled', action);
			const { statusCode } = action.payload;

			state.isPostRewardTasksMonthlyDrawJoinLoading = false;

			if (statusCode === 201 && state.rewarkTasksData?.monthlyDraw) {
				state.rewarkTasksData.monthlyDraw.completed = true;
				state.isPostRewardTasksMonthlyDrawStatusCode = statusCode;
			}
		});
		builder.addCase(postRewardTasksMonthlyDrawJoin.rejected, state => {
			console.log('postRewardTasksMonthlyDrawJoin rejected');
			state.isPostRewardTasksMonthlyDrawJoinLoading = false;
			state.isPostRewardTasksMonthlyDrawStatusCode = 0;
		});
	},
});

export const { resetUserPromotionsRedeem, resetPostRewardTasksMonthlyDraw } = pointSlice.actions;
export const pointReducer = pointSlice.reducer;
