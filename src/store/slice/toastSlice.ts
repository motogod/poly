import { createSlice } from '@reduxjs/toolkit';

type ToastState = {
	isToastSuccess: boolean | null;
	toastTitle: string;
};

export const initialToastState: ToastState = {
	isToastSuccess: null,
	toastTitle: '',
};

const toastSlice = createSlice({
	name: 'toast',
	initialState: initialToastState,
	reducers: {
		showToast: (state, action: { payload: { isSuccess: boolean; title: string } }) => {
			const { isSuccess, title } = action.payload;
			state.isToastSuccess = isSuccess;
			state.toastTitle = title;
		},
		resetToast: state => {
			state.isToastSuccess = null;
			state.toastTitle = '';
		},
	},
	extraReducers: {},
});

export const { showToast, resetToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
