import { createAsyncThunk } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import {
	GetMarkets,
	GetSpotlightMarkets,
	GetHomeCategorySectionMarkets,
	GetMarketsType,
	MarketsItemType,
	GetMarketDetail,
	GetMarketDetailType,
	CategoryClickEvent,
	GetMarketOrderBook,
	OrderBookType,
	GetMarketLineChart,
	GetMarketLineChartType,
	LineChartTabsIntervalType,
} from '@/api';
import { DateRadioType, VolumeType } from '@/store/slice/dataSlice';

const getMarkets = createAsyncThunk(
	'api/getMarkets',
	async (params: {
		categories: string;
		volumeValue: VolumeType;
		dateValue: DateRadioType;
		startDate?: number;
		endDate?: number;
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

		const today = moment().utc();
		const endOfweekDay = moment().endOf('week');
		const endOfMonthDay = moment().endOf('month');

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
					if (moment(value.endDate).isBefore(endOfweekDay)) {
						filteredResultData.push(value);
					}
					break;
				case 'date-month':
					if (moment(value.endDate).isBefore(endOfMonthDay)) {
						filteredResultData.push(value);
					}
					break;
				case 'date-custom':
					// 比較 timestamp 實際上只需要過濾結束時間，
					if (userStartDate && userEndDate) {
						if (
							moment(value.endDate).unix() >= userStartDate &&
							moment(value.endDate).unix() <= userEndDate
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

const getSpotlightMarkets = createAsyncThunk('api/getSpotlightMarkets', async () => {
	const resp = await GetSpotlightMarkets<GetMarketsType>();
	console.log('getSpotlightMarkets resp', resp);
	return resp;
});

const getHomeCategorySectionMarkets = createAsyncThunk(
	'api/getHomeCategorySectionMarkets',
	async (params: { childrenCategories: any[] }) => {
		const { childrenCategories } = params;

		let childrenSlug = '';
		let resetTabsIndex = true;

		if (childrenCategories.length > 0) {
			childrenSlug = childrenCategories.map(value => value.slug).join(',');
			resetTabsIndex = false;
		} else {
			resetTabsIndex = true;
		}
		console.log('children slug', childrenSlug);
		const resp = await GetHomeCategorySectionMarkets<GetMarketsType>({ categories: childrenSlug });
		console.log('getHomeCategorySectionMarkets resp', resp);
		return { resp, resetTabsIndex };
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

const getMarketLineChart = createAsyncThunk(
	'api/getMarketLineChart',
	async (params: { slug: string; outcome: 'YES' | 'NO'; interval: LineChartTabsIntervalType }) => {
		const { slug, outcome, interval } = params;
		const resp = await GetMarketLineChart<GetMarketLineChartType>({ slug, outcome, interval });
		console.log('getMarketLineChart resp', resp);

		return { resp, interval };
	}
);

const getMarketLineChartYesAndNo = createAsyncThunk(
	'api/getMarketLineChartYesAndNo',
	async (params: { slug: string; interval: LineChartTabsIntervalType }) => {
		const { slug, interval } = params;

		const yesResp = await GetMarketLineChart<GetMarketLineChartType>({
			slug,
			outcome: 'YES',
			interval,
		});

		const noResp = await GetMarketLineChart<GetMarketLineChartType>({
			slug,
			outcome: 'NO',
			interval,
		});

		let yesAndNoResp: { Time: string; Yes: number; No: number }[] = [];

		if (yesResp.data.length > 0 && noResp.data.length > 0) {
			// 共用時間
			// Yes 的價格資料
			yesResp?.data?.forEach((value, index) => {
				yesAndNoResp.push({
					Time: value.time,
					Yes: value.price,
					No: 0,
				});
			});

			// No 的價格資料
			noResp?.data.forEach((value, index) => {
				yesAndNoResp[index].No = value.price;
			});
		}

		return { resp: yesAndNoResp, interval };
	}
);

const getMarketOrderBookYes = createAsyncThunk(
	'api/getMarketOrderBookYes',
	async (params: { slug: string }) => {
		const { slug } = params;
		const resp = await GetMarketOrderBook<OrderBookType>({ slug, outcome: 'YES' });
		console.log('getMarketOrderBookYes resp', resp);

		return resp;
	}
);

const getMarketOrderBookNo = createAsyncThunk(
	'api/getMarketOrderBookNo',
	async (params: { slug: string }) => {
		const { slug } = params;
		const resp = await GetMarketOrderBook<OrderBookType>({ slug, outcome: 'NO' });
		console.log('getMarketOrderBookNo resp', resp);

		return resp;
	}
);

const clickCategoryEvent = createAsyncThunk(
	'api/clickCategoryEvent',
	async (params: { slug: string }) => {
		const { slug } = params;
		const resp = await CategoryClickEvent<GetMarketDetailType>({ action: 'click', slug });
		console.log('clickCategoryEvent resp', resp);

		return resp;
	}
);

export {
	getMarkets,
	getSpotlightMarkets,
	getHomeCategorySectionMarkets,
	getMarketDetail,
	clickCategoryEvent,
	getMarketOrderBookYes,
	getMarketOrderBookNo,
	getMarketLineChart,
	getMarketLineChartYesAndNo,
};
