import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { homeReducer } from './slice/homeSlice';
import { authReducer, showAuthToast } from './slice/authSlice';
import { ipReducer, setIpState } from './slice/ipSlice';
import { toastReducer, showToast, resetToast } from './slice/toastSlice';
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
} from './slice/dataSlice';
import { resetCheckAuthToast, resetPutUserProfileErrMsg } from './actions';

export const store = configureStore({
	reducer: {
		homeReducer,
		authReducer,
		ipReducer,
		toastReducer,
		dataReducer,
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
};
export * from './thunks/fetchHome';
export * from './thunks/fetchAuth';
export * from './thunks/fetchData';
