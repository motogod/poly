import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	GetMarkets,
	GetMarketsType,
	MarketsItemType,
	GetMarketDetail,
	GetMarketDetailType,
} from '@/api';
import { DateRadioType, VolumeType } from '@/store/slice/dataSlice';

const getMarkets = createAsyncThunk(
	'api/getMarkets',
	async (params: {
		categories: string;
		volumeValue: VolumeType;
		dateValue: DateRadioType;
		startDate?: string;
		endDate?: string;
	}) => {
		const {
			categories,
			volumeValue,
			dateValue,
			startDate: userStartDate,
			endDate: userEndDate,
		} = params;
		console.log('getMarkets api params =>', {
			categories,
			volumeValue,
			dateValue,
			userStartDate,
			userEndDate,
		});
		const resp = await GetMarkets<GetMarketsType>({ categories });
		console.log('getMarkets resp', resp);
		let filteredVolumeData: MarketsItemType[] = [];

		const today = moment();
		const endOfweekDay = today.endOf('week');
		const endOfMonthDay = today.endOf('month');

		// 過濾出符合前端所設定的 Volume 範圍資料
		resp.data.forEach(value => {
			switch (volumeValue) {
				case 'volume-default':
					filteredVolumeData.push(value);
					break;
				case 'volume-1000':
					if (value.volume < 1000) {
						filteredVolumeData.push(value);
					}
					break;
				case 'volume-100000':
					if (value.volume > 1000 && value.volume < 100000) {
						filteredVolumeData.push(value);
					}
					break;
				case 'volume-over':
					if (value.volume > 1000) {
						filteredVolumeData.push(value);
					}
					break;
				default:
					filteredVolumeData.push(value);
			}
		});

		let filteredResultData: MarketsItemType[] = [];

		console.log('Break dateValue', dateValue);
		console.log('Break date', { userStartDate, userEndDate });

		// 拿過濾 Volume 結束的資料，接著過濾出符合前端所設定的 Date 範圍資料
		filteredVolumeData.forEach(value => {
			switch (dateValue) {
				case 'date-default':
					filteredResultData.push(value);
					break;
				case 'date-today':
					if (today.isSame(value.endDate, 'day')) {
						filteredResultData.push(value);
					}
					break;
				case 'date-week':
					console.log('date-week');
					if (moment(endOfweekDay).isBefore(value.endDate)) {
						filteredResultData.push(value);
					}
					break;
				case 'date-month':
					if (moment(endOfMonthDay).isBefore(value.endDate)) {
						filteredResultData.push(value);
					}
					break;
				case 'date-custom':
					if (userStartDate && userEndDate) {
						if (
							moment(value.startDate).isAfter(userStartDate) &&
							moment(value.endDate).isBefore(userEndDate)
						) {
							filteredResultData.push(value);
						}
					} else {
						filteredResultData.push(value);
					}
					break;
				default:
					filteredResultData.push(value);
			}
		});

		resp.data = [...filteredResultData];

		return resp;
	}
);

const getMarketDetail = createAsyncThunk(
	'api/getMarketDetail',
	async (params: { slug: string }) => {
		const { slug } = params;
		const resp = await GetMarketDetail<GetMarketDetailType>({ slug });
		console.log('getMarketDetail resp', resp);

		return resp;
	}
);

export { getMarkets, getMarketDetail };
