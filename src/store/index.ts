import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { homeReducer, userClickYesOrNoButton } from './slice/homeSlice';
import { authReducer, showAuthToast } from './slice/authSlice';
import { ipReducer, setIpState } from './slice/ipSlice';
import { toastReducer, showToast, resetToast } from './slice/toastSlice';
import {
	portfolioReducer,
	selectPortfolioOrders,
	selectedTabsIndex,
	selectPortfolioPositions,
	selectPortfolioHistory,
} from './slice/portfolioSlice';
import {
	dataReducer,
	handleClickMenu,
	handleClickSubMenu,
	handleClickSubMenuItem,
	resetRouterPath,
	queryUrlToChangeMenuStatus,
	handleVolumeRadio,
	handleDateRadio,
	resetVolumeAndDateStatus,
	filterStartDateAndEndDateMarket,
	filterSortSelector,
	changeRouterAsPathWithCategories,
} from './slice/dataSlice';
import { pointReducer, resetUserPromotionsRedeem } from './slice/pointSlice';
import { resetCheckAuthToast, resetPutUserProfileErrMsg, resetTradeOrdersStatus } from './actions';

export const store = configureStore({
	reducer: {
		homeReducer,
		authReducer,
		ipReducer,
		toastReducer,
		dataReducer,
		portfolioReducer,
		pointReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// 監測 API
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {
	resetCheckAuthToast,
	resetPutUserProfileErrMsg,
	setIpState,
	showAuthToast,
	showToast,
	resetToast,
	handleClickMenu,
	handleClickSubMenu,
	handleClickSubMenuItem,
	resetRouterPath,
	queryUrlToChangeMenuStatus,
	handleVolumeRadio,
	handleDateRadio,
	resetVolumeAndDateStatus,
	filterStartDateAndEndDateMarket,
	filterSortSelector,
	userClickYesOrNoButton,
	resetTradeOrdersStatus,
	selectPortfolioOrders,
	selectedTabsIndex,
	selectPortfolioPositions,
	selectPortfolioHistory,
	changeRouterAsPathWithCategories,
	resetUserPromotionsRedeem,
};
export * from './thunks/fetchHome';
export * from './thunks/fetchAuth';
export * from './thunks/fetchData';
export * from './thunks/fetchPortfolio';
