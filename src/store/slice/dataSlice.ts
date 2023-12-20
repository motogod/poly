import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../thunks/fetchData';
import { CategoriesType, ChildrenCategoriesType } from '@/api';

type CategoriesState = {
	categoriesData: CategoriesType[];
};

const initialState: CategoriesState = {
	categoriesData: [
		{
			menuId: '0',
			menu: 'Markets',
			menuSelected: true,
			subMenuData: [] as any,
		},
	],
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		// 主選單 Markets 展開與否
		handleClickMenu: (state, action) => {
			const userClickId = action.payload;
			if (state.categoriesData[0].menuId === userClickId) {
				state.categoriesData[0].menuSelected = !state.categoriesData[0].menuSelected;
			}
		},
		// 子選單是否全選
		handleClickSubMenu: (state, action) => {
			const userClickId = action.payload;

			state.categoriesData[0].subMenuData.map(value => {
				if (value.id === userClickId) {
					value.subMenuSelected = !value.subMenuSelected;
				}

				value.childrenCategories.map(childrenValue => {
					if (value.subMenuSelected) {
						childrenValue.itemSelected = true;
					} else {
						childrenValue.itemSelected = false;
					}

					return childrenValue;
				});

				return value;
			});
		},
		// 子選單的子選單 是否勾選
		handleClickSubMenuItem: (state, action) => {
			const { clickSubMenuItemId, clickSubMenuItemName } = action.payload;

			state.categoriesData[0].subMenuData.map(value => {
				value.childrenCategories.map(childrenValue => {
					if (
						childrenValue.id === clickSubMenuItemId &&
						childrenValue.name === clickSubMenuItemName
					) {
						childrenValue.itemSelected = !childrenValue.itemSelected;
					}

					return childrenValue;
				});
			});
		},
	},
	extraReducers: builder => {
		builder.addCase(getCategories.pending, state => {
			console.log('getCategories pending');
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			console.log('getCategories fulfilled', action);
			const { data } = action.payload;
			state.categoriesData[0].subMenuData = data;
		});
		builder.addCase(getCategories.rejected, state => {
			console.log('getCategories rejected');
		});
	},
});

export const { handleClickMenu, handleClickSubMenu, handleClickSubMenuItem } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
