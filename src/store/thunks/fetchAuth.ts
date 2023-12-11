import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	GetNonceFromServer,
	LoginWithSiwe,
	Logout,
	CheckAuth,
	CheckAuthType,
	LoginType,
	LogoutType,
	GetNonceFromServerType,
	LoginWithGoogle,
	GetUserProfile,
	CheckUserProfileType,
	PutUserProfile,
	PutUserProfileType,
	PutUserEmail,
} from '@/api';

// Get Nonce from server
const getNonce = createAsyncThunk('api/getNonce', async (params: any) => {
	const resp = await GetNonceFromServer<GetNonceFromServerType>(params);
	console.log('getNonce resp is', resp);
	return resp;
});

const loginWithSiwe = createAsyncThunk('api/loginWithSiwe', async (params: any, { dispatch }) => {
	console.log('loginWithSiwe params', { params });
	const resp = await LoginWithSiwe<LoginType>(params);
	dispatch(getUserProfile({})); // 登入成功 更新使用者資料
	console.log('LoginWithSiwe resp is', resp);
	return resp;
});

const loginWithGoogle = createAsyncThunk(
	'api/loginWithGoogle',
	async (params: { idToken: string }, { dispatch }) => {
		const resp = await LoginWithGoogle<LoginType>(params);
		dispatch(getUserProfile({})); // 登入成功 更新使用者資料
		console.log('loginWithGoogle resp is', resp);
		return resp;
	}
);

const logout = createAsyncThunk('api/logout', async (params: any) => {
	const resp = await Logout<LogoutType>({});
	console.log('logout resp is', resp);
	return resp;
});

// Check Auth
const checkUserAuth = createAsyncThunk('api/checkUserAuth', async (params: any) => {
	const resp = await CheckAuth<CheckAuthType>({});
	console.log('CheckUserAuth resp is', resp);
	return resp;
});

// Get user profile
const getUserProfile = createAsyncThunk('api/getUserProfile', async (params: any) => {
	const resp = await GetUserProfile<CheckUserProfileType>({});
	console.log('getUserProfile resp is', resp);
	return resp;
});

// Put user profile
const putUserProfile = createAsyncThunk(
	'api/putUserProfile',
	async (params: { username: string }) => {
		// alert(`username is ${params.username}`);
		const resp = await PutUserProfile<PutUserProfileType>(params);
		console.log('putUserProfile resp is', resp);
		return resp;
	}
);

// Put user email
const putUserEmail = createAsyncThunk('api/putUserEmail', async (params: { idToken: string }) => {
	// alert(`username is ${params.username}`);
	const resp = await PutUserEmail<PutUserProfileType>(params);
	console.log('putUserEmail resp is', resp);
	return resp;
});

export {
	getNonce,
	loginWithSiwe,
	logout,
	checkUserAuth,
	loginWithGoogle,
	getUserProfile,
	putUserProfile,
	putUserEmail,
};
