import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
	Text,
	Stack,
	Checkbox,
	RadioGroup,
	Radio,
	Center,
	Button,
	Input,
	useToast,
	ScaleFade,
	Divider,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import {
	AppDispatch,
	RootState,
	handleClickMenu,
	handleClickSubMenu,
	handleClickSubMenuItem,
	resetRouterPath,
	queryUrlToChangeMenuStatus,
	handleVolumeRadio,
	handleDateRadio,
	filterStartDateAndEndDateMarket,
	getCategories,
	resetVolumeAndDateStatus,
} from '@/store';
import { leftMenuItem } from '../data';
import { zIndexMinimum } from '@/utils/zIndex';
import { CategoriesType, ChildrenCategoriesType, MenuType, SubMenuType } from '@/api/type';
import styles from './leftMenu.module.scss';
import zh from 'date-fns/locale/zh-TW';
import vi from 'date-fns/locale/vi';
import th from 'date-fns/locale/th';
import { LocalesType } from '@/../public/locales/type';
import { VolumeType, volumeRadioArray } from '@/store/slice/dataSlice';

let firstRender = true;

const LeftMenu = () => {
	const { t } = useTranslation();

	const router = useRouter();

	const { categoriesData, routerPath } = useSelector((state: RootState) => state.dataReducer);
	console.log('categoriesData =>', categoriesData);
	const toast = useToast();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [dateErrorMsg, setDateErrorMsg] = useState('');

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// 如果使用者網頁路徑 /markets 無包含其他 query 參數，將選單資料恢復為預設狀態
		if (router.isReady) {
			if (router.asPath === '/markets') {
				dispatch(getCategories());
				dispatch(resetVolumeAndDateStatus({}));
			}
		}
	}, [dispatch, router]);

	// 日期選單 DatePicker 相關設置
	useEffect(() => {
		// 註冊相關語系給 DatePicker
		const locale = router.locale as LocalesType;
		if (locale === 'zh-Hans') {
			registerLocale('zh', zh);
		}

		if (locale === 'vi') {
			registerLocale('vi', vi);
		}

		if (locale === 'th') {
			registerLocale('th', th);
		}

		const { startDate, endDate } = router.query;

		if (startDate && endDate) {
			setStartDate(moment(Number(startDate) * 1000).toDate());
			setEndDate(moment(Number(endDate) * 1000).toDate());
		}
	}, [router]);

	useEffect(() => {
		// 第一次開啟頁面先撈取網址對應的 query 更新選單 每個 query 後都有一個逗點
		// 確保 Markets 底下選單有跟後端要到資列才更新選單 且只執行一次
		if (firstRender && categoriesData[0].menuData[2].subMenuData.length > 0 && router.isReady) {
			dispatch(queryUrlToChangeMenuStatus({ queryString: router.query.categories }));
			firstRender = false;
		}
	}, [dispatch, categoriesData, router]);

	useEffect(() => {
		if (router.isReady && routerPath !== '') {
			console.log('useEffect routerPath', routerPath);
			// 使用者點選選單 redux 改變 routerPath 的值，router.push 最後更新網頁上的正確 query 網址
			router.push(routerPath, undefined, { shallow: true });
			dispatch(resetRouterPath({}));
		}
	}, [router, dispatch, routerPath]);

	const renderVolumeRadioTitle = (radioValue: VolumeType) => {
		switch (radioValue) {
			case 'volume-default':
				return t('default');
			case 'volume-1000':
				return `${t('1000_below')}`;
			case 'volume-100000':
				return `${t('1000_to_100000')}`;
			case 'volume-over':
				return `${t('100000_above')}`;
			default:
				return '';
		}
	};

	const renderMenuSection = (menuId: string, data: MenuType) => {
		// Volume section
		if (menuId === '0') {
			return (
				<RadioGroup
					onChange={volumeValue => {
						// 更新 url
						dispatch(handleVolumeRadio({ volumeValue, routerAsPath: router.asPath }));
					}}
					value={data.selectedValue}
				>
					<Stack>
						{volumeRadioArray.map(radioValue => {
							return (
								<>
									<Stack
										position={'relative'}
										pt={2}
										pb={2}
										pl={3}
										pr={3}
										w={'100%'}
										alignItems={'center'}
										borderRadius={4}
										_hover={{ bg: 'gray.100' }}
									>
										<Stack position={'absolute'} right={0} left={3} top={1}>
											<Text>{renderVolumeRadioTitle(radioValue)}</Text>
										</Stack>
										<Radio
											pr={{ lg: 6, md: 2, sm: 2 }}
											alignItems={'center'}
											justifyContent={'flex-end'}
											w={'100%'}
											value={radioValue}
											size="md"
											borderColor="gray.200"
											colorScheme="teal"
										></Radio>
									</Stack>
								</>
							);
						})}
					</Stack>
				</RadioGroup>
			);
		}

		// End date section
		if (menuId === '1') {
			return (
				<RadioGroup
					onChange={dateRadioValue =>
						dispatch(
							handleDateRadio({ dateRadioValue, routerAsPath: router.asPath, startDate, endDate })
						)
					}
					value={data.selectedValue}
				>
					<Stack>
						<Stack
							position={'relative'}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							w={'100%'}
							alignItems={'center'}
							borderRadius={4}
							_hover={{ bg: 'gray.100' }}
						>
							<Stack position={'absolute'} right={0} left={3} top={1}>
								<Text>{t('default')}</Text>
							</Stack>
							<Radio
								pr={{ lg: 6, md: 2, sm: 2 }}
								alignItems={'center'}
								justifyContent={'flex-end'}
								w={'100%'}
								value="date-default"
								size="md"
								borderColor="gray.200"
								colorScheme="teal"
							></Radio>
						</Stack>
						<Stack
							position={'relative'}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							w={'100%'}
							alignItems={'center'}
							borderRadius={4}
							_hover={{ bg: 'gray.100' }}
						>
							<Stack position={'absolute'} right={0} left={3} top={1}>
								<Text>{t('ends_today')}</Text>
							</Stack>
							<Radio
								pr={{ lg: 6, md: 2, sm: 2 }}
								alignItems={'center'}
								justifyContent={'flex-end'}
								w={'100%'}
								value="date-today"
								size="md"
								borderColor="gray.200"
								colorScheme="teal"
							></Radio>
						</Stack>
						<Stack
							position={'relative'}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							w={'100%'}
							alignItems={'center'}
							borderRadius={4}
							_hover={{ bg: 'gray.100' }}
						>
							<Stack position={'absolute'} right={0} left={3} top={1}>
								<Text>{t('ends_this_week')}</Text>
							</Stack>
							<Radio
								pr={{ lg: 6, md: 2, sm: 2 }}
								alignItems={'center'}
								justifyContent={'flex-end'}
								w={'100%'}
								value="date-week"
								size="md"
								borderColor="gray.200"
								colorScheme="teal"
							></Radio>
						</Stack>
						<Stack
							position={'relative'}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							w={'100%'}
							alignItems={'center'}
							borderRadius={4}
							_hover={{ bg: 'gray.100' }}
						>
							<Stack position={'absolute'} right={0} left={3} top={1}>
								<Text>{t('ends_this_month')}</Text>
							</Stack>
							<Radio
								pr={{ lg: 6, md: 2, sm: 2 }}
								alignItems={'center'}
								justifyContent={'flex-end'}
								w={'100%'}
								value="date-month"
								size="md"
								borderColor="gray.200"
								colorScheme="teal"
							></Radio>
						</Stack>
						<Stack
							position={'relative'}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							w={'100%'}
							alignItems={'center'}
							borderRadius={4}
							_hover={{ bg: 'gray.100' }}
						>
							<Stack position={'absolute'} right={0} left={3} top={1}>
								<Text>{`${t('custom')}：`}</Text>
							</Stack>
							<Radio
								pr={{ lg: 6, md: 2, sm: 2 }}
								alignItems={'center'}
								justifyContent={'flex-end'}
								w={'100%'}
								value="date-custom"
								size="md"
								borderColor="gray.200"
								colorScheme="teal"
							></Radio>
							<Stack w={'100%'} mt={2} direction={'row'} justify={'space-evenly'} align={'center'}>
								<Stack w={'100%'} h={'100%'} mb={0}>
									<DatePicker
										className={styles.datePicker}
										selected={startDate}
										locale={router.locale}
										onChange={(date: any) => {
											if (date !== null) {
												setStartDate(date);

												if (moment(endDate).isBefore(date) || moment(endDate).isSame(date)) {
													setDateErrorMsg('Start must be before end');
													return;
												}

												if (endDate && date) {
													setDateErrorMsg('');
													dispatch(
														handleDateRadio({
															dateRadioValue: `date-custom`,
															routerAsPath: router.asPath,
															startDate,
															endDate,
														})
													);
													dispatch(
														filterStartDateAndEndDateMarket({
															startDate: date,
															endDate,
															routerAsPath: router.asPath,
														})
													);
												}
											} else {
												setStartDate(null);
											}
										}}
										disabledKeyboardNavigation
										placeholderText={t('start_date')}
									/>
								</Stack>
								<Text fontSize={'md'} color={'gray.500'}>
									{t('to')}
								</Text>
								<Stack w={'100%'} h={'100%'}>
									<DatePicker
										className={styles.datePicker}
										selected={endDate}
										locale={router.locale}
										onChange={(date: any) => {
											if (date !== null) {
												setEndDate(date.setHours(23, 59, 59, 999));

												if (moment(startDate).isAfter(date) || moment(startDate).isSame(date)) {
													setDateErrorMsg('Start must be before end');
													return;
												}

												if (startDate && date) {
													setDateErrorMsg('');
													dispatch(
														handleDateRadio({
															dateRadioValue: `date-custom`,
															routerAsPath: router.asPath,
															startDate,
															endDate,
														})
													);
													dispatch(
														filterStartDateAndEndDateMarket({
															startDate,
															endDate: date,
															routerAsPath: router.asPath,
														})
													);
												}
											} else {
												setEndDate(null);
											}
										}}
										disabledKeyboardNavigation
										placeholderText={t('end_date')}
									/>
								</Stack>
							</Stack>
							{dateErrorMsg !== '' ? (
								<Stack w={'100%'}>
									<ScaleFade initialScale={0.9} in={true}>
										<Text fontSize={'small'} color={'red.500'} fontWeight={'bold'}>
											{dateErrorMsg}
										</Text>
									</ScaleFade>
								</Stack>
							) : null}
							<Button
								isDisabled={
									startDate && endDate && moment(startDate).isBefore(endDate) && dateErrorMsg === ''
										? false
										: true
								}
								onClick={() => {
									console.log('onClick 1');
									if (startDate && endDate && moment(startDate).isBefore(endDate)) {
										dispatch(
											handleDateRadio({
												dateRadioValue: `date-custom`,
												routerAsPath: router.asPath,
												startDate,
												endDate,
											})
										);
										dispatch(
											filterStartDateAndEndDateMarket({
												startDate,
												endDate,
												routerAsPath: router.asPath,
											})
										);
									}
								}}
								w={'100%'}
								colorScheme="teal"
							>
								{t('apply')}
							</Button>
						</Stack>
					</Stack>
				</RadioGroup>
			);
		}

		// Categories section
		if (menuId === '2') {
			return data.subMenuData.map((subValue, subIndex) => {
				// 分類的子選單是否全部被勾選
				const subValueItemChecked = subValue?.childrenCategories?.filter(
					value => value.itemSelected
				);
				const subValueItemUnChecked = subValue?.childrenCategories?.filter(
					value => !value.itemSelected
				);

				// 所有子選單皆被勾選
				const isAllItemChecked = subValueItemUnChecked?.length === 0;
				console.log('subValueItemUnChecked', subValueItemUnChecked);
				console.log('isAllItemChecked', isAllItemChecked);
				// 包含有勾選與未勾選的狀態
				const isAtLeastOneItemChecked = subValueItemChecked?.length !== 0;

				let isIndeterminate;

				if (isAllItemChecked) {
					isIndeterminate = false;
				} else if (isAtLeastOneItemChecked) {
					isIndeterminate = true;
				}

				return (
					<>
						<Stack
							_hover={{ bg: 'gray.100' }}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							borderRadius={4}
							zIndex={0}
							onClick={e => {
								e.preventDefault();
								dispatch(
									handleClickSubMenu({ userClickId: subValue.id, routerAsPath: router.asPath })
								);
							}}
							cursor="pointer"
							key={subIndex}
							direction="row"
							justify="space-between"
							mt="2"
							mr={{ base: '1', sm: '1', md: '5' }}
						>
							<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
								{subValue.name}
							</Text>
							<Checkbox
								isChecked={isAllItemChecked}
								isIndeterminate={isIndeterminate}
								onChange={e => {
									e.preventDefault();
									dispatch(
										handleClickSubMenu({ userClickId: subValue.id, routerAsPath: router.asPath })
									);
								}}
								size="lg"
								borderColor="gray.200"
								defaultChecked
								colorScheme="teal"
							></Checkbox>
						</Stack>
						{subValue?.childrenCategories?.map((itemValue, itemIndex) => {
							return (
								<>
									<Stack
										_hover={{ bg: 'gray.100' }}
										p={1}
										borderRadius={4}
										onClick={e => {
											e.preventDefault();
											dispatch(
												handleClickSubMenuItem({
													clickSubMenuItemId: itemValue.id,
													clickSubMenuItemName: itemValue.slug,
													routerAsPath: router.asPath,
												})
											);
										}}
										cursor="pointer"
										key={itemIndex}
										direction="row"
										justify="space-between"
										mr={{ base: '1', sm: '1', md: '5' }}
									>
										<Text ml="16px" color="gray.600" size="md" fontWeight="400" lineHeight="24px">
											{itemValue.name}
										</Text>
										<Checkbox
											pr={2}
											isChecked={itemValue.itemSelected}
											onChange={e => {
												e.preventDefault();
												dispatch(
													handleClickSubMenuItem({
														clickSubMenuItemId: itemValue.id,
														clickSubMenuItemName: itemValue.name,
														routerAsPath: router.asPath,
													})
												);
											}}
											size="lg"
											borderColor="gray.200"
											defaultChecked
											colorScheme="teal"
										></Checkbox>
									</Stack>
								</>
							);
						})}
					</>
				);
			});
		}
	};

	return (
		<>
			{categoriesData[0].menuData.map((value: MenuType, index: number) => {
				return (
					<>
						<Stack
							_hover={{ bg: 'gray.100' }}
							pt={2}
							pb={2}
							pl={3}
							pr={3}
							borderRadius={4}
							onClick={e => {
								e.preventDefault();
								dispatch(handleClickMenu(value.menuId));
							}}
							cursor="pointer"
							alignItems="center"
							key={index}
							direction="row"
							justify="space-between"
							mr={{ base: '1', sm: '1', md: '5' }}
						>
							<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
								{t(value.menu as 'volume' | 'end_date' | 'markets')}
							</Text>
							{value.menuSelected ? <ChevronDownIcon boxSize={6} /> : <ChevronUpIcon boxSize={6} />}
						</Stack>
						{value.menuSelected && renderMenuSection(value.menuId, value)}
						{value.menuId === '2' && value.menuSelected && (
							<Stack mr={'32px'} mb={{ lg: 0, md: 20, sm: 20 }}>
								<Divider
									mb={2}
									mt={4}
									borderColor="gray.300"
									display={{ lg: 'inline', md: 'none', sm: 'none' }}
								/>
							</Stack>
						)}
					</>
				);
			})}
		</>
	);
};

export default LeftMenu;
