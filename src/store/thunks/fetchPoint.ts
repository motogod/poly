import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	GetPoints,
	PointData,
	GetPromotions,
	PromotionsData,
	PostPromotionsRedeem,
	PromotionsRedeemData,
	GetRewardTasks,
	RewardTasksData,
	PostRewardTasksMonthlyDrawJoin,
} from '@/api';

const getPoints = createAsyncThunk(
	'api/getPoints',
	async (params: { page: number; take: number }) => {
		const { page, take } = params;

		const resp = await GetPoints<PointData>({ page, take });
		console.log('getPoints resp', resp);
		return resp;
	}
);

const getPromotions = createAsyncThunk('api/getPromotions', async () => {
	const resp = await GetPromotions<PromotionsData>({});
	console.log('getPromotions resp', resp);
	return resp;
});

const postPromotionsRedeem = createAsyncThunk(
	'api/postPromotionsRedeem',
	async (params: { id: string }) => {
		const resp = await PostPromotionsRedeem<PromotionsRedeemData>({ id: params.id });
		console.log('postPromotionsRedeem resp', resp);
		return resp;
	}
);

const getRewardTasks = createAsyncThunk('api/getRewardTasks', async () => {
	const resp = await GetRewardTasks<RewardTasksData>({});
	console.log('GetRewardTasks resp', resp);
	return resp;
});

const postRewardTasksMonthlyDrawJoin = createAsyncThunk(
	'api/postRewardTasksMonthlyDrawJoin',
	async () => {
		const resp = await PostRewardTasksMonthlyDrawJoin<any>({});
		console.log('postRewardTasksMonthlyDrawJoin resp', resp);
		return resp;
	}
);

export {
	getPoints,
	getPromotions,
	postPromotionsRedeem,
	getRewardTasks,
	postRewardTasksMonthlyDrawJoin,
};
