import { createSlice } from '@reduxjs/toolkit';
import {
	getPortfolioOrders,
	tradeOrders,
	deleteOrder,
	getUserPortfolioPositions,
	getUserPortfolioPositionsForHold,
} from '../thunks/fetchPortfolio';
import {
	GetPortfolioType,
	ProtfolioDataType,
	PortfolioOrderSelectorStatus,
	UserPortfolioDataType,
	PortfoioPostionTableStatus,
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
	portfolioPositionsListData: UserPortfolioDataType[]; // call API 得到的初始資料
	filterPortfolioPositionsListData: UserPortfolioDataType[]; // 後續過濾條件要呈現的資料
	portfolioPositionsSelectorStatus: 'all' | 'active' | 'reedeem' | 'claim';
	userMarketHold: number; // 使用者在該市場擁有多少 Shares
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
	userMarketHold: 0,
};

// 根據狀態 filter 正確的資料
const filetrData = (state: IpState, selectorStatus: string) => {
	if (selectorStatus === 'all') {
		state.filteredPortfolioOrdersData = state.portfolioOrdersData;
	}

	if (selectorStatus === 'active') {
		state.filteredPortfolioOrdersData = state.portfolioOrdersData.filter(value => {
			const { status } = value;

			if (status === 'PENDING' || status === 'PARTIALLY_FILLED') {
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

	if (selectorStatus === 'reedeem') {
		state.filterPortfolioPositionsListData = state.portfolioPositionsListData.filter(value => {
			const { status } = value;

			if (status === 'RESOLVED') {
				return value;
			}
		});
	}

	if (selectorStatus === 'claim') {
		state.filterPortfolioPositionsListData = state.portfolioPositionsListData.filter(value => {
			const { status } = value;

			if (status === 'CLOSED') {
				return value;
			}
		});
	}
};

const portfolioSlice = createSlice({
	name: 'portfolio',
	initialState,
	reducers: {
		// 點選 Selector 改變顯示的資料
		selectPortfolioPositions: (state, action) => {
			const status = action.payload;

			state.portfolioPositionsSelectorStatus = status; // 更新 Selector 要顯示哪一個選項

			filetrPositionsData(state, status);
		},

		// 點選 Selector 改變顯示的資料
		selectPortfolioOrders: (state, action) => {
			const status = action.payload;

			state.portfolioSelectorStatus = status; // 更新 Selector 要顯示哪一個選項

			filetrData(state, status);
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
			const { data } = action.payload;
			state.portfolioPositionsListData = data;

			// 根據原本選擇狀態去 filter 正確的資料
			filetrPositionsData(state, state.portfolioPositionsSelectorStatus);
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

			if (data.length > 0) {
				state.userMarketHold = data[0].hold;
			} else {
				state.userMarketHold = 0;
			}
		});
		builder.addCase(getUserPortfolioPositionsForHold.rejected, (state, action) => {
			console.log('getUserPortfolioPositionsForHold rejected', action);
		});
	},
});

export const { selectPortfolioOrders, selectedTabsIndex, selectPortfolioPositions } =
	portfolioSlice.actions;
export const portfolioReducer = portfolioSlice.reducer;
