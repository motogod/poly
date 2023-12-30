import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getCategories } from '../thunks/fetchData';
import { CategoriesType, ChildrenCategoriesType } from '@/api';

export type VolumeType = 'volume-default' | 'volume-1000' | 'volume-100000' | 'volume-over' | '';
export const volumeRadioArray: Array<VolumeType> = [
	'volume-default',
	'volume-1000',
	'volume-100000',
	'volume-over',
];

export type DateRadioType =
	| 'date-default'
	| 'date-today'
	| 'date-week'
	| 'date-month'
	| 'date-custom';
const dateRadioArray: Array<DateRadioType> = [
	'date-default',
	'date-today',
	'date-week',
	'date-month',
	'date-custom',
];

export type SortDescType = 'trending:desc' | 'volume:desc' | 'startDate:desc' | 'endDate:asc';
export const sortSelectorArray: Array<SortDescType> = [
	'trending:desc',
	'volume:desc',
	'startDate:desc',
	'endDate:asc',
];

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
					selectedValue: 'volume-default',
					subMenuData: [] as any,
				},
				{
					menuId: '1',
					menu: 'End Date',
					menuSelected: false,
					selectedValue: 'date-default',
					subMenuData: [] as any,
				},
				{
					menuId: '2',
					menu: 'Markets',
					menuSelected: true,
					selectedValue: '',
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
			let dateRadioString = '';
			let startDateQueryString = '';
			let endDateQueryString = '';
			console.log('newRouterAsPath => 1', newRouterAsPath);
			// 如果有 query 日期 一定有兩個 & 第一個為 startDate 第二個為 endDate
			if (newRouterAsPath.includes('&')) {
				if (newRouterAsPath.length > 2) {
					startDateQueryString = '&' + newRouterAsPath.split('&')[1];
					endDateQueryString = '&' + newRouterAsPath.split('&')[2];
					// 將舊的日期移除乾淨
					newRouterAsPath = newRouterAsPath.split('&')[0];
				}
			}
			console.log('newRouterAsPath => 2', newRouterAsPath);

			state.categoriesData[0].menuData[2].subMenuData.forEach(value => {
				// 如果分類選單有被勾選，將分類選單主名稱加入
				if (value.subMenuSelected) {
					// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString += `${value.slug},`;

					// 分類主選單勾選即全選，將子項目全移除 qeury url
					value.childrenCategories.forEach(childrenValue => {
						let routerStringArray = [];
						if (newRouterAsPath.includes('=')) {
							routerStringArray = newRouterAsPath.split('=')[1].split(',');
							if (routerStringArray === childrenValue.slug) {
								newRouterAsPath = newRouterAsPath.replace(`${childrenValue.slug},`, '');
							}
						} else {
							newRouterAsPath = newRouterAsPath.replace(`${childrenValue.slug},`, '');
						}
						// newRouterAsPath = newRouterAsPath.replace(`${childrenValue.slug},`, '');
					});
				} else {
					// decodeURI 恢復網址的空白符號 %20，好做後續正確的字串比對
					// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString = queryString.replace(`${value.slug},`, '');

					value.childrenCategories.forEach(childrenValue => {
						// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');
						if (childrenValue.itemSelected) {
							queryString += `${childrenValue.slug},`;
						} else {
							queryString = queryString.replace(`${childrenValue.slug},`, '');
						}
					});
				}
			});
			console.log('newRouterAsPath => 3', newRouterAsPath);
			// 補上原本如果有 Volume 或 Date 的 query
			let routerStringArray: string[] = [];

			// 如果至少有一個選單分類資料 可能是 Sort 或 Volume 或 Date
			// url 這些參數順序必需依序為 sort volume date
			if (newRouterAsPath.includes('=')) {
				const routerStringWithCommas = newRouterAsPath.split('=')[1];
				routerStringArray = routerStringWithCommas.split(',');
			}
			console.log('routerStringArray', routerStringArray);
			if (routerStringArray.length > 0) {
				const sortQueryString = routerStringArray.find(v => v.indexOf('desc') > -1);

				if (sortQueryString) {
					queryString += `${sortQueryString},`;
				}

				const firstVolumeQueryString = routerStringArray.find(routerStringValue => {
					return volumeRadioArray.find(value => value === routerStringValue);
				});

				// 將會撈到的 sort 選單 volume:desc 排除
				if (firstVolumeQueryString) {
					queryString += `${firstVolumeQueryString},`;
				}

				const firstDateQueryString = routerStringArray.find(v => v.indexOf('date') > -1);

				if (firstDateQueryString) {
					queryString += `${firstDateQueryString},`;
				}
			}

			if (!routerAsPath.includes('=')) {
				console.log('Enter 3');
				state.routerPath = `${newRouterAsPath}?categories=${queryString}${startDateQueryString}${endDateQueryString}`;
			} else {
				if (queryString) {
					console.log('Enter 4');
					console.log('queryString', queryString);
					// state.routerPath = `${newRouterAsPath}${queryString}`;
					state.routerPath = `/markets?categories=${queryString}${startDateQueryString}${endDateQueryString}`;
				} else if (!queryString && startDateQueryString && endDateQueryString) {
					state.routerPath = `/markets?categories=${startDateQueryString}${endDateQueryString}`;
				} else {
					state.routerPath = `/markets`;
				}
			}
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
			let startDateQueryString = '';
			let endDateQueryString = '';

			// 如果有 query 日期 一定有兩個 & 第一個為 startDate 第二個為 endDate
			if (newRouterAsPath.includes('&')) {
				if (newRouterAsPath.length > 2) {
					startDateQueryString = '&' + newRouterAsPath.split('&')[1];
					endDateQueryString = '&' + newRouterAsPath.split('&')[2];
					// 將舊的日期移除乾淨
					newRouterAsPath = newRouterAsPath.split('&')[0];
				}
			}
			console.log('newRouterAsPath =>', newRouterAsPath);
			state.categoriesData[0].menuData[2].subMenuData.forEach(value => {
				// 分類選單有被勾選
				if (value.subMenuSelected) {
					// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');
					queryString += `${value.slug},`;
					// 分類主選單勾選即全選，將子項目全移除 qeury url
					value.childrenCategories.forEach(childrenValue => {
						newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');
					});
				} else {
					// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${value.slug},`, '');

					queryString = queryString.replace(`${value.slug},`, '');
					value.childrenCategories.forEach(childrenValue => {
						// newRouterAsPath = decodeURI(newRouterAsPath).replace(`${childrenValue.slug},`, '');

						if (childrenValue.itemSelected) {
							queryString += `${childrenValue.slug},`;
						} else {
							queryString = queryString.replace(`${childrenValue.slug},`, '');
						}
					});
				}
			});

			// 補上原本如果有 Volume 或 Date 的 query
			let routerStringArray: string[] = [];

			// 如果至少有一個選單分類資料 可能是 Sort 或 Volume 或 Date
			// url 這些參數順序必需依序為 sort volume date
			if (newRouterAsPath.includes('=')) {
				const routerStringWithCommas = newRouterAsPath.split('=')[1];
				routerStringArray = routerStringWithCommas.split(',');
			}

			if (routerStringArray.length > 0) {
				const sortQueryString = routerStringArray.find(v => v.indexOf('desc') > -1);

				if (sortQueryString) {
					queryString += `${sortQueryString},`;
				}

				const firstVolumeQueryString = routerStringArray.find(routerStringValue => {
					return volumeRadioArray.find(value => value === routerStringValue);
				});

				// 將會撈到的 sort 選單 volume:desc 排除
				if (firstVolumeQueryString) {
					queryString += `${firstVolumeQueryString},`;
				}

				const firstDateQueryString = routerStringArray.find(v => v.indexOf('date') > -1);

				if (firstDateQueryString) {
					queryString += `${firstDateQueryString},`;
				}
			}

			console.log('Check final queryString', queryString);
			if (!routerAsPath.includes('=')) {
				state.routerPath = `${newRouterAsPath}?categories=${queryString}${startDateQueryString}${endDateQueryString}`;
			} else {
				if (queryString) {
					console.log('Here', { newRouterAsPath, queryString });
					// state.routerPath = `${newRouterAsPath}${queryString}`;
					state.routerPath = `/markets?categories=${queryString}${startDateQueryString}${endDateQueryString}`;
				} else if (!queryString && startDateQueryString && endDateQueryString) {
					state.routerPath = `/markets?categories=${startDateQueryString}${endDateQueryString}`;
				} else {
					state.routerPath = `/markets`;
				}
			}
		},

		// 清除變更後的 query url
		resetRouterPath: (state, action) => {
			state.routerPath = '';
		},

		// 清除 Volume 和 Date 的選取狀態
		resetVolumeAndDateStatus: (state, action) => {
			state.categoriesData[0].menuData[0].selectedValue = 'volume-default';
			state.categoriesData[0].menuData[1].selectedValue = 'date-default';
		},

		// Volume 更新 radio 選取狀態
		handleVolumeRadio: (state, action) => {
			const { volumeValue, routerAsPath } = action.payload;

			state.categoriesData[0].menuData[0].selectedValue = volumeValue;
			console.log('handleVolumeRadio volumeValue =>', volumeValue);
			// 更新完勾選狀態之後接著更新 router query url
			let newRouterAsPath = routerAsPath;
			let queryString = '';
			let startDateQueryString = '';
			let endDateQueryString = '';

			// 如果有 query 日期 一定有兩個 & 第一個為 startDate 第二個為 endDate
			if (newRouterAsPath.includes('&')) {
				if (newRouterAsPath.length > 2) {
					startDateQueryString = '&' + newRouterAsPath.split('&')[1];
					endDateQueryString = '&' + newRouterAsPath.split('&')[2];
					// 將舊的日期移除乾淨
					newRouterAsPath = newRouterAsPath.split('&')[0];
				}
			}

			volumeRadioArray.forEach(value => {
				newRouterAsPath = newRouterAsPath.replace(`${value},`, '');
			});

			if (newRouterAsPath.includes('=')) {
				console.log('Volume => 1');
				console.log('newRouterAsPath', newRouterAsPath);
				// url query 有 date 字串的位置
				let volumeAndDateStringUrl = '';
				const dateStringIndex = newRouterAsPath.indexOf('date');
				console.log('dateStringIndex', dateStringIndex);
				if (dateStringIndex > -1) {
					const dateQueryString = newRouterAsPath.substring(dateStringIndex);
					console.log('dateQueryString', dateQueryString);
					// const arr = newRouterAsPath.split('');
					// arr.splice(dateStringIndex, 0, `${volumeValue},`); // 將 Volume query string 放在 date 之前
					// volumeAndDateStringUrl = arr.join('') + '';
					volumeAndDateStringUrl = volumeValue + ',' + dateQueryString;
					console.log('volumeAndDateStringUrl', volumeAndDateStringUrl);
					//
					dateRadioArray.forEach(value => {
						newRouterAsPath = newRouterAsPath.replace(`${value},`, '');
					});
				} else {
					volumeAndDateStringUrl = volumeValue + ',';
				}

				state.routerPath =
					newRouterAsPath += `${volumeAndDateStringUrl}${startDateQueryString}${endDateQueryString}`;
			} else {
				console.log('Volume 2');
				console.log({ volumeValue, startDateQueryString, endDateQueryString });
				state.routerPath = `/markets?categories=${volumeValue},${startDateQueryString}${endDateQueryString}`;
			}
			// if (newRouterAsPath.includes('=')) {
			// 	state.routerPath = newRouterAsPath += `${volumeValue},`;
			// } else {
			// 	state.routerPath = `/markets?categories=${volumeValue},`;
			// }
		},

		// Date 更新 radio 選取狀態
		handleDateRadio: (state, action) => {
			const { dateRadioValue, routerAsPath, startDate, endDate } = action.payload;

			// http://localhost:3000/zh/markets?categories=volume-default,date-custom-Sun%20Dec%2017%202023%2000:00:00%20GMT+0800%20(%E5%8F%B0%E5%8C%97%E6%A8%99%E6%BA%96%E6%99%82%E9%96%93)-Sun%20Dec%2031%202023%2000:00:00%20GMT+0800%20(%E5%8F%B0%E5%8C%97%E6%A8%99%E6%BA%96%E6%99%82%E9%96%93),
			state.categoriesData[0].menuData[1].selectedValue = dateRadioValue;

			// 更新完勾選狀態之後接著更新 router query url
			let newRouterAsPath = routerAsPath;
			let queryString = '';
			let startDateQueryString = '';
			let endDateQueryString = '';

			// 如果有 query 日期 一定有兩個 & 第一個為 startDate 第二個為 endDate
			if (newRouterAsPath.includes('&')) {
				if (newRouterAsPath.length > 2) {
					startDateQueryString = '&' + newRouterAsPath.split('&')[1];
					endDateQueryString = '&' + newRouterAsPath.split('&')[2];
					// 將舊的日期移除乾淨
					newRouterAsPath = newRouterAsPath.split('&')[0];
				}
			}

			dateRadioArray.forEach(value => {
				newRouterAsPath = newRouterAsPath.replace(`${value},`, '');
			});

			if (newRouterAsPath.includes('=')) {
				state.routerPath =
					newRouterAsPath += `${dateRadioValue},${startDateQueryString}${endDateQueryString}`;
			} else {
				state.routerPath = `/markets?categories=${dateRadioValue},${startDateQueryString}${endDateQueryString}`;
			}
		},

		// 更新日期選擇
		filterStartDateAndEndDateMarket: (state, action) => {
			const { startDate, endDate, routerAsPath } = action.payload;

			// 更新完勾選狀態之後接著更新 router query url
			let newRouterAsPath = routerAsPath;
			let startDateQueryString = '';
			let endDateQueryString = '';
			console.log('newRouterAsPath => 1', newRouterAsPath);
			// 如果有 query 日期 一定有兩個 & 第一個為 startDate 第二個為 endDate
			if (newRouterAsPath.includes('&')) {
				if (newRouterAsPath.length > 2) {
					startDateQueryString = '&' + newRouterAsPath.split('&')[1];
					endDateQueryString = '&' + newRouterAsPath.split('&')[2];
					// 將舊的日期移除乾淨
					newRouterAsPath = newRouterAsPath.split('&')[0];
				}
			}

			dateRadioArray.forEach(value => {
				newRouterAsPath = newRouterAsPath.replace(`${value},`, '');
			});

			const unixStartDate = moment(startDate).unix();
			const unixEndDate = moment(endDate).unix();

			if (!newRouterAsPath.includes('=')) {
				state.routerPath =
					newRouterAsPath +
					'?categories=date-custom,' +
					`&startDate=${unixStartDate}` +
					`&endDate=${unixEndDate}`;
			} else {
				state.routerPath =
					newRouterAsPath + `date-custom,&startDate=${unixStartDate}&endDate=${unixEndDate}`;
			}
		},

		// 網頁第一次開啟，抓取網址 query 參數更新選單各項目是否勾選
		queryUrlToChangeMenuStatus: (state, action) => {
			const { queryString } = action.payload;

			let queryStringArray: string[] = [];

			if (queryString && queryString.includes(',')) {
				queryStringArray = queryString.split(',');
			}

			// 更新 Volume 勾選狀態
			if (queryStringArray.length > 0) {
				// const firstVolumeQueryString = queryStringArray.find(v => v.indexOf('volume') > -1);
				const firstVolumeQueryString = queryStringArray.find(stringValue =>
					volumeRadioArray.find(radioValue => radioValue === stringValue)
				);
				if (firstVolumeQueryString) {
					state.categoriesData[0].menuData[0].selectedValue = firstVolumeQueryString;
				} else {
					// 比對不到則為預設值
					state.categoriesData[0].menuData[0].selectedValue = volumeRadioArray[0];
				}
			}

			// 更新 Date 勾選狀態
			if (queryStringArray.length > 0) {
				// const firstDateQueryString = queryStringArray.find(v => v.indexOf('date') > -1);
				const firstDateQueryString = queryStringArray.find(stringValue =>
					dateRadioArray.find(radioValue => radioValue === stringValue)
				);
				if (firstDateQueryString) {
					state.categoriesData[0].menuData[1].selectedValue = firstDateQueryString;
				} else {
					// 比對不到則為預設值
					state.categoriesData[0].menuData[1].selectedValue = dateRadioArray[0];
				}
			}

			// 更新選單勾選狀態
			state.categoriesData[0].menuData[2].subMenuData.map(value => {
				value.childrenCategories.map(childrenValue => {
					const isSlugExistInQuery = queryStringArray.find(v => v === value.slug);
					const isSlugExistInItemQuery = queryStringArray.find(v => v === childrenValue.slug);

					if (isSlugExistInQuery) {
						// 如果 query 有主分類，也將所有子選單全勾選
						value.subMenuSelected = true;
						childrenValue.itemSelected = true;
					} else if (isSlugExistInItemQuery) {
						// 否則逐一比對所有子選單是否需勾選
						childrenValue.itemSelected = true;
					} else {
						// 都沒有則全部取消不勾選
						value.subMenuSelected = false;
						childrenValue.itemSelected = false;
					}

					return childrenValue;
				});

				return value;
			});
		},

		// 過濾排序選單
		filterSortSelector: (state, action) => {
			const { sortValue, routerAsPath } = action.payload;

			let newRouterAsPath = routerAsPath;
			console.log('filterSortSelector', { sortValue, routerAsPath });

			const addSortValueIntoQueryString = (value: string) => {
				const valueIndex = newRouterAsPath.indexOf(value);
				const arr = newRouterAsPath.split('');
				arr.splice(valueIndex, 0, `${sortValue},`);
				return arr.join('');
			};

			// 若有先前 sort value 先清掉
			sortSelectorArray.forEach(value => {
				newRouterAsPath = newRouterAsPath.replace(`${value},`, '');
			});
			console.log('newRouterAsPath =>', newRouterAsPath);
			console.log('includes', newRouterAsPath.includes('date'));
			// url 路徑 volume 一定在 date 前面
			if (newRouterAsPath.includes('volume')) {
				newRouterAsPath = addSortValueIntoQueryString('volume');
			} else if (!newRouterAsPath.includes('volume') && newRouterAsPath.includes('date')) {
				newRouterAsPath = addSortValueIntoQueryString('date');
			} else {
				if (newRouterAsPath.includes('=')) {
					console.log('SORT 1', { newRouterAsPath, sortValue });
					newRouterAsPath += `${sortValue},`;
				} else {
					console.log('SORT 2', { newRouterAsPath, sortValue });
					newRouterAsPath += `?categories=${sortValue},`;
				}
			}

			state.routerPath = newRouterAsPath;
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
	handleVolumeRadio,
	handleDateRadio,
	resetVolumeAndDateStatus,
	filterStartDateAndEndDateMarket,
	filterSortSelector,
} = dataSlice.actions;
export const dataReducer = dataSlice.reducer;
