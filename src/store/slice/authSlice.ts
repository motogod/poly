import { createSlice } from '@reduxjs/toolkit';
import {
	loginWithSiwe,
	loginWithGoogle,
	logout,
	checkUserAuth,
	getUserProfile,
	putUserProfile,
	putUserEmail,
	getUserFunds,
	postWithdraw,
} from '../thunks/fetchAuth';
import { UserProfile, FundsType } from '@/api';
import { resetCheckAuthToast, resetPutUserProfileErrMsg, resetWithdrawStatus } from '../actions';

type AuthState = {
	isAuthenticated: boolean | null; // 是否已登入的判斷
	user: {
		address: string;
		email: string;
		id: string;
		username: string | null;
		origin: string;
	};
	userFunds: FundsType;
	userProfile: UserProfile;
	checkAuthSuccess: boolean | null; // 登入登出時的 提醒 Toast 出現與否
	checkAuthTitle: string; // 提醒 Toast 的顯示標題
	putUsrProfileIsLoading: boolean | null; // 新增創建使用者名稱時的讀取狀態
	putUsrProfileErrMsg: string; // 呈現創建名字 API 失敗時的顯示錯誤訊息
	isWithdrawLoading: boolean; // Withdraw API 讀取狀態
	isWithdrawSuccess: boolean | null; //
};

const initialState: AuthState = {
	isAuthenticated: null,
	user: { address: '', email: '', id: '', username: '', origin: '' },
	userFunds: {
		hold: 0.0,
		load: 0.0,
		symbol: '',
		total: 0.0,
	},
	userProfile: {
		address: '',
		email: '',
		id: '',
		username: '',
		proxyWallet: '' as `0x${string}`,
		walletActivated: false,
		profile: { displayName: null, funds: 0, portfolio: 0 },
	},
	checkAuthSuccess: null,
	checkAuthTitle: '',
	putUsrProfileIsLoading: null,
	putUsrProfileErrMsg: '',
	isWithdrawLoading: false,
	isWithdrawSuccess: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		showAuthToast: (state, action: { payload: { isShow: boolean; title: string } }) => {
			const { isShow, title } = action.payload;
			state.checkAuthSuccess = isShow;
			state.checkAuthTitle = title;
		},
	},
	extraReducers: builder => {
		// Reset Check auth toast
		builder.addCase(resetCheckAuthToast, state => {
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
		});

		// Rest putUsrProfileErrMsg when user typing input
		builder.addCase(resetPutUserProfileErrMsg, state => {
			state.putUsrProfileErrMsg = '';
		});

		// Reset Withdraw API status when user pop up withdraw modal
		builder.addCase(resetWithdrawStatus, state => {
			state.isWithdrawLoading = false;
			state.isWithdrawSuccess = null;
		});

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
			state.checkAuthSuccess = null;
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
		builder.addCase(loginWithSiwe.rejected, (state, action) => {
			console.log('loginWithSiwe rejected', action);
			state.isAuthenticated = false;
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
		});

		// Logout
		builder.addCase(logout.pending, state => {
			console.log('logout pending');
			state.checkAuthSuccess = null;
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			const { statusCode } = action.payload;
			console.log('logout fulfilled');
			if (statusCode === 200) {
				state.isAuthenticated = false;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Logout suceesfully';
				state.user = { address: '', email: '', id: '', username: '', origin: '' };
				state.userFunds = {
					hold: 0.0,
					load: 0.0,
					symbol: '',
					total: 0.0,
				};
			}
		});
		builder.addCase(logout.rejected, state => {
			state.checkAuthSuccess = null;
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
				const { isAuthenticated, user } = data;

				state.isAuthenticated = isAuthenticated;
				state.user = user;
			}
		});
		builder.addCase(checkUserAuth.rejected, state => {
			console.log('checkUserAuth rejected');
		});

		// Get user profile
		builder.addCase(getUserProfile.pending, state => {
			console.log('getUserProfile pending');
		});
		builder.addCase(getUserProfile.fulfilled, (state, action) => {
			console.log('getUserProfile fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.user.address = data.address;
				state.user.email = data.email;
				state.user.username = data.username;
				state.user.id = data.id;
				state.userProfile.address = data.address;
				state.userProfile.email = data.email;
				state.userProfile.username = data.username;
				state.userProfile.id = data.id;
				state.userProfile.proxyWallet = data.proxyWallet;
				state.userProfile.walletActivated = data.walletActivated;
			}
		});
		builder.addCase(getUserProfile.rejected, state => {
			console.log('getUserProfile rejected');
		});

		// Put user profile
		builder.addCase(putUserProfile.pending, state => {
			console.log('putUserProfile pending');
			state.putUsrProfileIsLoading = true;
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
			state.putUsrProfileErrMsg = '';
		});
		builder.addCase(putUserProfile.fulfilled, (state, action) => {
			console.log('putUserProfile fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.user.username = data.username;
				state.putUsrProfileIsLoading = false;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Create account suceesfully';
				state.putUsrProfileErrMsg = '';
			}
			if (statusCode === 409) {
				state.putUsrProfileIsLoading = null;
				state.checkAuthSuccess = false;
				state.checkAuthTitle = '';
				state.putUsrProfileErrMsg = 'The username is already taken';
			}
		});
		builder.addCase(putUserProfile.rejected, (state, action) => {
			console.log('putUserProfile rejected', action);

			state.putUsrProfileIsLoading = null;
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
			state.putUsrProfileErrMsg = '';
		});

		// Put user email
		builder.addCase(putUserEmail.pending, state => {
			console.log('putUserEmail pending');
			state.putUsrProfileIsLoading = true;
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
			state.putUsrProfileErrMsg = '';
		});
		builder.addCase(putUserEmail.fulfilled, (state, action) => {
			console.log('putUserEmail fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.user.email = data.email;
				state.putUsrProfileIsLoading = false;
				state.checkAuthSuccess = true;
				state.checkAuthTitle = 'Update email suceesfully';
				state.putUsrProfileErrMsg = '';
			}
		});
		builder.addCase(putUserEmail.rejected, (state, action) => {
			console.log('putUserEmail rejected', action);
			const { name, message, stack } = action.error;

			state.putUsrProfileIsLoading = null;
			state.checkAuthSuccess = null;
			state.checkAuthTitle = '';
		});

		// Get user funds
		builder.addCase(getUserFunds.pending, state => {
			console.log('getUserFunds pending');
		});
		builder.addCase(getUserFunds.fulfilled, (state, action) => {
			console.log('getUserFunds fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.userFunds = data[0];
			}
		});
		builder.addCase(getUserFunds.rejected, (state, action) => {
			console.log('getUserFunds rejected', action);
		});

		// Get user funds
		builder.addCase(postWithdraw.pending, state => {
			console.log('postWithdraw pending');
			state.isWithdrawLoading = true;
			state.isWithdrawSuccess = null;
		});
		builder.addCase(postWithdraw.fulfilled, (state, action) => {
			console.log('postWithdraw fulfilled', action);
			const { statusCode, data } = action.payload;

			state.isWithdrawLoading = false;

			if (statusCode === 201) {
				state.isWithdrawSuccess = true;
			}

			if (statusCode === 400) {
				state.isWithdrawSuccess = false;
			}
		});
		builder.addCase(postWithdraw.rejected, (state, action) => {
			console.log('postWithdraw rejected', action);
			state.isWithdrawLoading = false;
			state.isWithdrawSuccess = false;
		});
	},
});

export const { showAuthToast } = authSlice.actions;
export const authReducer = authSlice.reducer;
