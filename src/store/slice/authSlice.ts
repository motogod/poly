import { createSlice } from '@reduxjs/toolkit';
import { loginWithSiwe, loginWithGoogle, logout, checkUserAuth } from '../thunks/fetchAuth';

type AuthState = {
	isAuthenticated: boolean;
	user: { address: string; email: string; id: string };
	checkAuthSuccess: boolean; // 登入登出時的 提醒 Toast 出現與否
	checkAuthTitle: string; // 提醒 Toast 的顯示標題
};

const initialState: AuthState = {
	isAuthenticated: false,
	user: { address: '', email: '', id: '' },
	checkAuthSuccess: false,
	checkAuthTitle: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// Google login
		builder.addCase(loginWithGoogle.pending, state => {
			console.log('loginWithGoogle pending');
		});
		builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
			console.log('loginWithGoogle fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 201) {
				state.user = data.user;
				state.isAuthenticated = true;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Google login suceesfully';
			}
		});
		builder.addCase(loginWithGoogle.rejected, state => {
			console.log('loginWithGoogle rejected');
			state.isAuthenticated = false;
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
		});

		// SIWE login
		builder.addCase(loginWithSiwe.pending, state => {
			console.log('loginWithSiwe pending');
		});
		builder.addCase(loginWithSiwe.fulfilled, (state, action) => {
			console.log('loginWithSiwe fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 201) {
				state.user = data.user;
				state.isAuthenticated = true;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Login suceesfully';
			}
		});
		builder.addCase(loginWithSiwe.rejected, state => {
			console.log('loginWithSiwe rejected');
			state.isAuthenticated = false;
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
		});

		// Logout
		builder.addCase(logout.pending, state => {
			console.log('logout pending');
			state.checkAuthSuccess = false;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			const { statusCode } = action.payload;
			if (statusCode === 200) {
				state.isAuthenticated = false;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Logout suceesfully';
			}
		});
		builder.addCase(logout.rejected, state => {
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
		});

		// Check user auth status
		builder.addCase(checkUserAuth.pending, state => {
			console.log('checkUserAuth pending');
		});
		builder.addCase(checkUserAuth.fulfilled, (state, action) => {
			console.log('checkUserAuth fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				const { address, id, email } = data.user;

				state.isAuthenticated = data.isAuthenticated;
				state.address = address;
				state.id = id;
				state.email = email;
			}
		});
		builder.addCase(checkUserAuth.rejected, state => {
			console.log('checkUserAuth rejected');
		});
	},
});

export const authReducer = authSlice.reducer;
