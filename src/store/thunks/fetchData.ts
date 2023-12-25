import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCategories, GetCategoriesType } from '@/api';

// Test API
const getCategories = createAsyncThunk('api/getCategories', async () => {
	const resp = await GetCategories<GetCategoriesType>({});
	console.log('getCategories resp', resp);
	resp.data.map(value => {
		value.subMenuSelected = false;

		value.childrenCategories.map(childrenValue => {
			childrenValue.itemSelected = false;
		});

		return value;
	});
	console.log('getCategories resp result', resp);
	return resp;
});

export { getCategories };
