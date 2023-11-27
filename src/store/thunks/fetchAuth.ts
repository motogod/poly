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
} from '@/api';

// Get Nonce from server
const getNonce = createAsyncThunk('api/getNonce', async (params: any) => {
	const resp = await GetNonceFromServer<GetNonceFromServerType>(params);
	console.log('getNonce resp is', resp);
	return resp;
});

const loginWithSiwe = createAsyncThunk('api/loginWithSiwe', async (params: any, { dispatch }) => {
	const resp = await LoginWithSiwe<LoginType>(params);
	console.log('LoginWithSiwe resp is', resp);
	return resp;
});

const loginWithGoogle = createAsyncThunk(
	'api/loginWithGoogle',
	async (params: { idToken: string }, { dispatch }) => {
		const resp = await LoginWithGoogle<LoginType>(params);
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
		const resp = await PutUserProfile<PutUserProfileType>(params);
		console.log('putUserProfile resp is', resp);
		return resp;
	}
);

export {
	getNonce,
	loginWithSiwe,
	logout,
	checkUserAuth,
	loginWithGoogle,
	getUserProfile,
	putUserProfile,
};
