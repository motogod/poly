import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { homeReducer } from './slice/homeSlice';
import { authReducer } from './slice/authSlice';

export const store = configureStore({
	reducer: {
		homeReducer,
		authReducer,
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

export * from './thunks/fetchHome';
export * from './thunks/fetchAuth';
