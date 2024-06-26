import { createSlice } from '@reduxjs/toolkit';
import {
	getPortfolioOrders,
	tradeOrders,
	deleteOrder,
	getUserPortfolioPositions,
	getUserPortfolioPositionsForHold,
	getPortfolioHistory,
	postRedeemClaim,
} from '../thunks/fetchPortfolio';
import {
	GetPortfolioType,
	ProtfolioDataType,
	PortfolioOrderSelectorStatus,
	UserPortfolioDataType,
	PortfoioPostionTableStatus,
	ProtfolioHistoryDataType,
	PortfolioHistorySelectorType,
	PositionsDataType,
} from '@/api';
import { resetTradeOrdersStatus } from '../actions';

type IpState = {
	portfolioOrdersData: ProtfolioDataType[]; // call API 得到的初始資料
	filteredPortfolioOrdersData: ProtfolioDataType[]; // 後續過濾條件要呈現的資料
	isTradeOrdersLoading: boolean;
	isTradeSuccess: boolean | null;
	isDeleteOrderLoading: boolean;
	isDeleteOrderSuccess: boolean | null;
	portfolioTabsIndex: number; // Portfolio 的 tab 最後點擊位置狀態
	portfolioSelectorStatus: 'all' | 'active' | 'cancelled'; // Portfolio 的 selector 最後選擇狀態
	portfolioPositionsListData: PositionsDataType[]; // call API 得到的初始資料
	filterPortfolioPositionsListData: PositionsDataType[]; // 後續過濾條件要呈現的資料
	portfolioPositionsSelectorStatus: 'all' | 'active' | 'claim';
	userMarketYesHold: number; // 使用者在該市場擁有多少 Yes Shares
	userMarketNoHold: number; // 使用者在該市場擁有多少 No Shares
	portfolioHistoryListData: ProtfolioHistoryDataType[]; // Portfolio History 的資料
	filterPortfolioHistoryListData: ProtfolioHistoryDataType[]; // 後續過濾條件要呈現的資料
	portfolioHistorySelectorStatus: PortfolioHistorySelectorType;
	isPostRedeemClaimLoading: boolean;
	isPostRedeemClaimSuccess: boolean | null;
};

const initialState: IpState = {
	portfolioOrdersData: [],
	filteredPortfolioOrdersData: [],
	isTradeOrdersLoading: false,
	isTradeSuccess: null,
	isDeleteOrderLoading: false,
	isDeleteOrderSuccess: null,
	portfolioTabsIndex: 0,
	portfolioSelectorStatus: 'all',
	portfolioPositionsListData: [],
	filterPortfolioPositionsListData: [],
	portfolioPositionsSelectorStatus: 'all',
	userMarketYesHold: 0,
	userMarketNoHold: 0,
	portfolioHistoryListData: [],
	filterPortfolioHistoryListData: [],
	portfolioHistorySelectorStatus: 'all',
	isPostRedeemClaimLoading: false,
	isPostRedeemClaimSuccess: null,
};

// 根據狀態 filter 正確的資料
const filetrData = (state: IpState, selectorStatus: string) => {
	if (selectorStatus === 'all') {
		state.filteredPortfolioOrdersData = state.portfolioOrdersData;
	}

	if (selectorStatus === 'active') {
		state.filteredPortfolioOrdersData = state.portfolioOrdersData.filter(value => {
			const { status } = value;

			if (status === 'PARTIALLY_FILLED') {
				return value;
			}
		});
	}

	if (selectorStatus === 'cancelled') {
		state.filteredPortfolioOrdersData = state.portfolioOrdersData.filter(value => {
			const { status } = value;

			if (status === 'CANCELED') {
				return value;
			}
		});
	}
};

const filetrPositionsData = (state: IpState, selectorStatus: string) => {
	if (selectorStatus === 'all') {
		state.filterPortfolioPositionsListData = state.portfolioPositionsListData;
	}

	if (selectorStatus === 'active') {
		state.filterPortfolioPositionsListData = state.portfolioPositionsListData.filter(value => {
			const { status } = value;

			if (status === 'OPEN') {
				return value;
			}
		});
	}

	if (selectorStatus === 'claim') {
		state.filterPortfolioPositionsListData = state.portfolioPositionsListData.filter(value => {
			const { status } = value;
			// 呈現  Claim 的文字狀態
			if (status === 'CLAIM') {
				return value;
			}
		});
	}
};

const filterHistoryData = (state: IpState, selectorStatus: PortfolioHistorySelectorType) => {
	if (selectorStatus === 'all') {
		state.filterPortfolioHistoryListData = state.portfolioHistoryListData;
	}

	if (selectorStatus === 'bought') {
		state.filterPortfolioHistoryListData = state.portfolioHistoryListData.filter(value => {
			const { action } = value;

			if (action === 'BUY') {
				return value;
			}
		});
	}

	if (selectorStatus === 'sold') {
		state.filterPortfolioHistoryListData = state.portfolioHistoryListData.filter(value => {
			const { action } = value;

			if (action === 'SELL') {
				return value;
			}
		});
	}

	if (selectorStatus === 'redeem') {
		state.filterPortfolioHistoryListData = state.portfolioHistoryListData.filter(value => {
			const { action } = value;

			if (action === 'CLAIM') {
				return value;
			}
		});
	}
};

const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		// Positions 點選 Selector 改變顯示的資料
		selectPortfolioPositions: (state, action) => {
			const status = action.payload;

			state.portfolioPositionsSelectorStatus = status; // 更新 Selector 要顯示哪一個選項

			filetrPositionsData(state, status);
		},

		// Orders 點選 Selector 改變顯示的資料
		selectPortfolioOrders: (state, action) => {
			const status = action.payload;

			state.portfolioSelectorStatus = status; // 更新 Selector 要顯示哪一個選項

			filetrData(state, status);
		},

		// History 點選 Selector 改變顯示的資料
		selectPortfolioHistory: (state, action) => {
			const status = action.payload;

			state.portfolioHistorySelectorStatus = status; // 更新 Selector 要顯示哪一個選項

			filterHistoryData(state, status);
		},

		// 在 Portfolio 點選 tab 改變 tab index 的值
		selectedTabsIndex: (state, action) => {
			const index = action.payload;
			state.portfolioTabsIndex = index;
		},
	},
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

			// 根據原本選擇狀態去 filter 正確的資料
			filetrData(state, state.portfolioSelectorStatus);
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
			const { statusCode } = action.payload;

			state.isTradeOrdersLoading = false;

			if (statusCode === 400) {
				state.isTradeSuccess = false;
			} else {
				state.isTradeSuccess = true;
			}
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
			const { id } = action.payload;

			// 依據 id 刪除掉存在 redux 的該筆 portfolio order 資料
			state.isDeleteOrderLoading = false;

			// 刪除成功，修改該筆資料狀態為 CANCELED
			const data = state.filteredPortfolioOrdersData.map(value => {
				if (value.id === id) {
					value.status = 'CANCELED';
				}

				return value;
			});

			state.filteredPortfolioOrdersData = data;
		});
		builder.addCase(deleteOrder.rejected, (state, action) => {
			console.log('deleteOrder rejected', action);
			state.isDeleteOrderLoading = false;
		});

		// Get user portfolio positions
		builder.addCase(getUserPortfolioPositions.pending, (state, action) => {
			console.log('getUserPortfolioPositions pending');
		});
		builder.addCase(getUserPortfolioPositions.fulfilled, (state, action) => {
			console.log('getUserPortfolioPositions fulfilled', action);
			const { data, statusCode } = action.payload;

			if (statusCode === 200) {
				state.portfolioPositionsListData = data?.positions || [];

				// 根據原本選擇狀態去 filter 正確的資料
				filetrPositionsData(state, state.portfolioPositionsSelectorStatus);
			}
		});
		builder.addCase(getUserPortfolioPositions.rejected, (state, action) => {
			console.log('getUserPortfolioPositions rejected', action);
		});

		// Get user portfolio for market hold
		builder.addCase(getUserPortfolioPositionsForHold.pending, (state, action) => {
			console.log('getUserPortfolioPositionsForHold pending');
		});
		builder.addCase(getUserPortfolioPositionsForHold.fulfilled, (state, action) => {
			console.log('getUserPortfolioPositionsForHold fulfilled', action);
			const { data } = action.payload;

			if (data?.positions.length > 0) {
				const filterYesData = data.positions.filter(value => value.outcome === 'YES');

				if (filterYesData.length > 0) {
					state.userMarketYesHold = filterYesData[0].total;
				} else {
					state.userMarketYesHold = 0;
				}

				const filterNoData = data.positions.filter(value => value.outcome === 'NO');

				if (filterNoData.length > 0) {
					state.userMarketNoHold = filterNoData[0].total;
				} else {
					state.userMarketNoHold = 0;
				}
			} else {
				state.userMarketYesHold = 0;
				state.userMarketNoHold = 0;
			}
		});
		builder.addCase(getUserPortfolioPositionsForHold.rejected, (state, action) => {
			console.log('getUserPortfolioPositionsForHold rejected', action);
		});

		// Get user portfolio history
		builder.addCase(getPortfolioHistory.pending, (state, action) => {
			console.log('getPortfolioHistory pending');
		});
		builder.addCase(getPortfolioHistory.fulfilled, (state, action) => {
			console.log('getPortfolioHistory fulfilled', action);
			const { data } = action.payload;
			state.portfolioHistoryListData = data;

			// 根據原本選擇狀態去 filter 正確的資料
			filterHistoryData(state, state.portfolioHistorySelectorStatus);
		});
		builder.addCase(getPortfolioHistory.rejected, (state, action) => {
			console.log('getPortfolioHistory rejected', action);
		});

		// Redeem
		builder.addCase(postRedeemClaim.pending, (state, action) => {
			console.log('postRedeemClaim pending');
			state.isPostRedeemClaimLoading = true;
			state.isPostRedeemClaimSuccess = null;
		});
		builder.addCase(postRedeemClaim.fulfilled, (state, action) => {
			console.log('postRedeemClaim fulfilled', action);
			const { statusCode } = action.payload.resp;
			const marketId = action.payload.marketId;
			const outcome = action.payload.outcome;

			if (statusCode === 201) {
				state.isPostRedeemClaimSuccess = true;
				// Withdrawal 成功後，清單上刪除掉該筆資料 (會有同樣的 marketId 有 YES 跟 NO 不同欄位資料的狀況)
				state.filterPortfolioPositionsListData = state.filterPortfolioPositionsListData.filter(
					value => value.market.id !== marketId || value.outcome !== outcome
				);
			} else {
				state.isPostRedeemClaimSuccess = false;
			}

			state.isPostRedeemClaimLoading = false;
		});
		builder.addCase(postRedeemClaim.rejected, (state, action) => {
			console.log('postRedeemClaim rejected', action);
			state.isPostRedeemClaimLoading = false;
			state.isPostRedeemClaimSuccess = false;
		});
	},
});

export const {
	selectPortfolioOrders,
	selectedTabsIndex,
	selectPortfolioPositions,
	selectPortfolioHistory,
} = portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;
