import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../thunks/fetchData';
import { CategoriesType, ChildrenCategoriesType } from '@/api';

type CategoriesState = {
	routerPath: string;
	categoriesData: CategoriesType[];
};

const initialState: CategoriesState = {
	routerPath: '',
	// categoriesData: [
	// 	{
	// 		menuId: '0',
	// 		menu: 'Markets',
	// 		menuSelected: true,
	// 		menuData: [
	// 			{ menuId: '0', menu: 'Volume', menuSelected: false, subMenuData: [] },
	// 			{ menuId: '1', menu: 'End Date', menuSelected: false, subMenuData: [] },
	// 			{
	// 				menuId: '2',
	// 				menu: 'Markets',
	// 				menuSelected: true,
	// 				subMenuData: [
	// 					{
	// 						id: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 						slug: 'politics',
	// 						name: 'Politics',
	// 						parentCategory: null,
	// 						childrenCategories: [
	// 							{
	// 								id: '43fbbb57-c06a-42e9-977f-ec139c75188b',
	// 								slug: 'biden',
	// 								name: 'Biden',
	// 								parentCategory: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 								itemSelected: false,
	// 							},
	// 							{
	// 								id: '1ba77167-ba23-4f75-a547-3b43376a4815',
	// 								slug: 'trump',
	// 								name: 'Trump',
	// 								parentCategory: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 								itemSelected: false,
	// 							},
	// 							{
	// 								id: '21e7b983-600f-445e-9327-d4b34561d515',
	// 								slug: 'us-politics',
	// 								name: 'US Politics',
	// 								parentCategory: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 								itemSelected: false,
	// 							},
	// 							{
	// 								id: '429d1c48-dea1-4ef2-869a-0d3907007efb',
	// 								slug: 'global-politics',
	// 								name: 'Global Politics',
	// 								parentCategory: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 								itemSelected: false,
	// 							},
	// 							{
	// 								id: 'f6db9575-45c5-4826-9bfe-490d3f10c30e',
	// 								slug: 'elections',
	// 								name: 'Elections',
	// 								parentCategory: '89f8ac2b-dd6f-4bad-b0c2-ca6fcbac6fb4',
	// 								itemSelected: false,
	// 							},
	// 						],
	// 						subMenuSelected: false,
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ],
	categoriesData: [
		{
			menuId: '0',
			menu: 'Markets',
			menuSelected: true,
			menuData: [
				{
					menuId: '0',
					menu: 'Volume',
					menuSelected: false,
					subMenuData: [] as any,
				},
				{
					menuId: '1',
					menu: 'End Date',
					menuSelected: false,
					subMenuData: [] as any,
				},
				{
					menuId: '2',
					menu: 'Markets',
					menuSelected: true,
					subMenuData: [] as any,
				},
			],
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

			state.categoriesData[0].menuData.map(menuValue => {
				if (menuValue.menuId === userClickId) {
					menuValue.menuSelected = !menuValue.menuSelected;
				}

				return menuValue;
			});
		},
		// Markets 的分類選單是否勾選
		handleClickSubMenu: (state, action) => {
			const { userClickId, routerAsPath } = action.payload;

			// 更新選單勾選狀態
			state.categoriesData[0].menuData[2].subMenuData.map(value => {
				if (value.id === userClickId) {
					value.subMenuSelected = !value.subMenuSelected;

					value.childrenCategories.map(childrenValue => {
						if (value.subMenuSelected) {
							childrenValue.itemSelected = true;
						} else {
							childrenValue.itemSelected = false;
						}

						return childrenValue;
					});
				}

				return value;
			});

			// 更新完勾選狀態之後接著更新 router query url
			let newRouterAsPath = routerAsPath;
			let queryString = '';

			state.categoriesData[0].menuData[2].subMenuData.forEach(value => {
				// 如果分類選單有被勾選，將分類選單主名稱加入
				if (value.subMenuSelected) {
					console.log('Enter 1');
					newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString += `${value.slug},`;
					console.log('query string', queryString);
					// 分類主選單勾選即全選，將子項目全移除 qeury url
					value.childrenCategories.forEach(childrenValue => {
						newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');
					});
				} else {
					console.log('Enter 2');
					// decodeURI 恢復網址的空白符號 %20，好做後續正確的字串比對
					newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString = queryString.replace(`${value.slug},`, '');

					value.childrenCategories.forEach(childrenValue => {
						newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');
						if (childrenValue.itemSelected) {
							queryString += `${childrenValue.slug},`;
						} else {
							queryString = queryString.replace(`${childrenValue.slug},`, '');
						}
					});
				}
			});

			if (!routerAsPath.includes('=')) {
				console.log('Enter 3');
				state.routerPath = `${newRouterAsPath}?categories=${queryString}`;
			} else {
				if (queryString) {
					console.log('Enter 4');
					// state.routerPath = `${newRouterAsPath}${queryString}`;
					state.routerPath = `/markets?categories=${queryString}`;
				} else {
					state.routerPath = `/markets`;
				}
			}

			console.log('state.routerPath', state.routerPath);
		},

		// Markets 底下分類選單的子選單 是否勾選
		handleClickSubMenuItem: (state, action) => {
			const { clickSubMenuItemId, clickSubMenuItemName, routerAsPath } = action.payload;

			state.categoriesData[0].menuData[2].subMenuData.map(value => {
				value.childrenCategories.map(childrenValue => {
					if (
						childrenValue.id === clickSubMenuItemId &&
						childrenValue.slug === clickSubMenuItemName
					) {
						childrenValue.itemSelected = !childrenValue.itemSelected;
						// 如果分類子選單，只要有一個被取消勾選，該主分類選單變更為 false (即沒有全選的意思)
						if (!childrenValue.itemSelected) {
							value.subMenuSelected = false;
						}
					}

					return childrenValue;
				});

				const subValueItemUnChecked = value.childrenCategories.filter(value => !value.itemSelected);
				// 所有子選單皆被勾選
				const isAllItemChecked = subValueItemUnChecked.length === 0;
				if (isAllItemChecked) {
					value.subMenuSelected = true;

					return value;
				}
			});

			// 更新完勾選狀態之後接著更新 router query url
			let newRouterAsPath = routerAsPath;
			let queryString = '';

			state.categoriesData[0].menuData[2].subMenuData.forEach(value => {
				// 如果分類選單有被勾選，將分類選單主名稱加入
				console.log('Here see the value', {
					slug: value.slug,
					subMenuSelected: value.subMenuSelected,
				});
				// 分類選單有被勾選
				if (value.subMenuSelected) {
					newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString += `${value.slug},`;
					// 分類主選單勾選即全選，將子項目全移除 qeury url
					console.log('Here 1');
					value.childrenCategories.forEach(childrenValue => {
						newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');
					});
				} else {
					console.log('value.slug', value.slug);
					newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');

					queryString = queryString.replace(`${value.slug},`, '');
					value.childrenCategories.forEach(childrenValue => {
						newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');

						if (childrenValue.itemSelected) {
							queryString += `${childrenValue.slug},`;
						} else {
							queryString = queryString.replace(`${childrenValue.slug},`, '');
						}
					});
				}
			});
			console.log('Here Check Result', { newRouterAsPath, queryString });
			if (!routerAsPath.includes('=')) {
				state.routerPath = `${newRouterAsPath}?categories=${queryString}`;
			} else {
				if (queryString) {
					console.log('Here', `${newRouterAsPath}${queryString}`);
					// state.routerPath = `${newRouterAsPath}${queryString}`;
					state.routerPath = `/markets?categories=${queryString}`;
				} else {
					state.routerPath = `/markets`;
				}
			}
		},

		// 清除變更後的 query url
		resetRouterPath: (state, action) => {
			state.routerPath = '';
		},

		queryUrlToChangeMenuStatus: (state, action) => {
			const { queryString } = action.payload;

			state.categoriesData[0].menuData[2].subMenuData.map(menuValue => {
				console.log('queryString', queryString);
				menuValue.subMenuSelected = true;
				// if (queryString.indexOf(menuValue.slug) > -1) {
				// 	console.log('queryUrlToChangeMenuStatus YES');
				// 	console.log('menuValue slug', menuValue.slug);
				// 	menuValue.subMenuSelected = true;
				// } else {
				// 	menuValue.subMenuSelected = false;
				// 	console.log('queryUrlToChangeMenuStatus No');
				// }

				return menuValue;
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
			// state.categoriesData[0].subMenuData = data;
			state.categoriesData[0].menuData[2].subMenuData = data;
		});
		builder.addCase(getCategories.rejected, state => {
			console.log('getCategories rejected');
		});
	},
});

export const {
	handleClickMenu,
	handleClickSubMenu,
	handleClickSubMenuItem,
	resetRouterPath,
	queryUrlToChangeMenuStatus,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
