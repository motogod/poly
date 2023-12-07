import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { homeReducer } from './slice/homeSlice';
import { authReducer, showToast } from './slice/authSlice';
import { ipReducer, setIpState } from './slice/ipSlice';
import { resetCheckAuthToast, resetPutUserProfileErrMsg } from './actions';

export const store = configureStore({
	reducer: {
		homeReducer,
		authReducer,
		ipReducer,
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

export { resetCheckAuthToast, resetPutUserProfileErrMsg, setIpState, showToast };
export * from './thunks/fetchHome';
export * from './thunks/fetchAuth';
