import { createSlice } from '@reduxjs/toolkit';

type IpType = {
	ip: string;
	countryName: string;
	countryCode: string;
	city: string;
	timezone: string;
	continentCode: string;
	languages: string;
};

type IpState = {
	ipData: IpType;
};

const initialState: IpState = {
	ipData: {} as IpType,
};

const ipSlice = createSlice({
	name: 'ip',
	initialState,
	reducers: {
		setIpState: (state, action) => {
			state.ipData = action.payload;
		},
	},
	extraReducers: {},
});

export const { setIpState } = ipSlice.actions;
export const ipReducer = ipSlice.reducer;
