import { createSlice } from '@reduxjs/toolkit';
import {
	loginWithSiwe,
	loginWithGoogle,
	logout,
	checkUserAuth,
	getUserProfile,
	putUserProfile,
	putUserEmail,
} from '../thunks/fetchAuth';
import { UserProfile } from '@/api';
import { resetCheckAuthToast, resetPutUserProfileErrMsg } from '../actions';

type AuthState = {
	isAuthenticated: boolean | null; // 是否已登入的判斷
	user: {
		address: string;
		email: string;
		id: string;
		username: string | null;
		origin: string;
	};
	userProfile: UserProfile;
	checkAuthSuccess: boolean | null; // 登入登出時的 提醒 Toast 出現與否
	checkAuthTitle: string; // 提醒 Toast 的顯示標題
	putUsrProfileIsLoading: boolean | null; // 新增創建使用者名稱時的讀取狀態
	putUsrProfileErrMsg: string; // 呈現創建名字 API 失敗時的顯示錯誤訊息
};

const initialState: AuthState = {
	isAuthenticated: null,
	user: { address: '', email: '', id: '', username: '', origin: '' },
	userProfile: {
		address: '',
		email: '',
		id: '',
		username: '',
		proxyWallet: '',
		walletActivated: false,
		profile: { displayName: null, funds: 0, portfolio: 0 },
	},
	checkAuthSuccess: false,
	checkAuthTitle: '',
	putUsrProfileIsLoading: null,
	putUsrProfileErrMsg: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
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
		builder.addCase(loginWithSiwe.rejected, (state, action) => {
			console.log('loginWithSiwe rejected', action);
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
				state.user = { address: '', email: '', id: '', username: '', origin: '' };
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
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
			state.putUsrProfileErrMsg = '';
		});
		builder.addCase(putUserProfile.fulfilled, (state, action) => {
			console.log('putUserProfile fulfilled', action);
			const { statusCode, data } = action.payload;
			if (statusCode === 200) {
				state.userProfile = data;
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
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
			state.putUsrProfileErrMsg = '';
		});

		// Put user email
		builder.addCase(putUserEmail.pending, state => {
			console.log('putUserEmail pending');
			state.putUsrProfileIsLoading = true;
			state.checkAuthSuccess = false;
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
			state.checkAuthSuccess = false;
			state.checkAuthTitle = '';
		});
	},
});

export const authReducer = authSlice.reducer;
