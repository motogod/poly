import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Heading,
	Center,
	Tabs,
	TabList,
	Tab,
	TabPanel,
	TabPanels,
	Tag,
	TagLabel,
	Button,
	Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, getHomeCategorySectionMarkets, AppDispatch } from '@/store';
import CategoryActivityList from './CategoryActivityList';
import CustomTabsOption from './CustomTabsOption';
import styles from './categorySection.module.scss';
import { paddingMainHorizontal } from '@/utils/screen';
import { SubMenuType } from '@/api';

const dummyCategories = [
	'All',
	'Business',
	'Crypto',
	'AI',
	'Politics',
	'Sports',
	'Test',
	'Pop Culture',
	'Pop Culture',
	'Pop Culture',
	'Pop Culture',
];

function CategorySection() {
	const router = useRouter();

	const { t } = useTranslation();

	const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
	const [isShowRightArrow, setIsShowRightArrow] = useState(false);

	const listRef = useRef<any>(null);

	const dispatch = useDispatch<AppDispatch>();

	const { categoriesData } = useSelector((state: RootState) => state.dataReducer);

	const allTagCategory: SubMenuType[] = [
		{
			id: '',
			slug: '',
			name: 'All',
			parentCategory: '',
			subMenuSelected: false,
			childrenCategories: [],
		},
	];

	const apiCategories = categoriesData[0].menuData[2].subMenuData;

	const categories = allTagCategory.concat(apiCategories);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	useEffect(() => {
		// 第一次顯示 All 的資料
		dispatch(getHomeCategorySectionMarkets({ childrenCategories: [] }));
	}, [dispatch]);

	useEffect(() => {
		if (listRef?.current) {
			const { scrollLeft, clientWidth, scrollWidth } = listRef?.current;

			if (scrollLeft === 0) {
				setIsShowLeftArrow(false);
			} else {
				setIsShowLeftArrow(true);
			}

			if (scrollLeft + clientWidth >= scrollWidth) {
				setIsShowRightArrow(false);
			} else {
				setIsShowRightArrow(true);
			}
		}
	}, []);

	useEffect(() => {
		const checkIsShow = () => {
			if (listRef?.current) {
				const { scrollLeft, clientWidth, scrollWidth } = listRef?.current;

				if (scrollLeft === 0) {
					setIsShowLeftArrow(false);
				} else {
					setIsShowLeftArrow(true);
				}

				if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
					setIsShowRightArrow(false);
				} else {
					setIsShowRightArrow(true);
				}
			}
		};

		function handleScroll() {
			// listener scroll
			checkIsShow();
		}

		// detect value first time
		checkIsShow();

		if (listRef?.current) {
			listRef?.current?.addEventListener('scroll', handleScroll);
		}

		return () => {
			if (listRef?.current) {
				listRef?.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	const scroll = (value: number) => {
		if (listRef.current) {
			listRef.current.scrollBy({
				left: value,
				behavior: 'smooth',
			});
		}
	};

	return (
		<Stack>
			<Center mt={{ sm: '90px', md: '90px', lg: '240px' }} color="white">
				<Heading size="xl" color="gray.700">
					{t('markets')}
				</Heading>
			</Center>
			<Tabs variant="soft-rounded" colorScheme="purple">
				<Center>
					<CustomTabsOption>
						{isShowLeftArrow && isDesktop ? (
							<Stack px={2}>
								<Icon
									_hover={{ color: 'gray.800' }}
									color={'gray.500'}
									cursor={'pointer'}
									h={'30px'}
									w={'30px'}
									onClick={() => scroll(-300)}
									as={ChevronLeftIcon}
									alignSelf={'center'}
								/>
							</Stack>
						) : (
							<Stack px={isDesktop ? 2 : 0} />
						)}
						<TabList ref={listRef} maxW={'600px'} className={styles.tabsContainer}>
							{categories.map((category, index) => {
								return (
									<>
										<Tab
											key={index}
											onClick={() => {
												dispatch(
													getHomeCategorySectionMarkets({
														childrenCategories: categories[index].childrenCategories,
													})
												);
											}}
											flexWrap={'nowrap'}
											_hover={{ color: 'gray.800' }}
											_selected={{ bg: 'teal.500', color: '#fff' }}
										>
											{category?.name}
										</Tab>
										{categories?.length === index + 1 ? (
											<Stack pr={{ md: '0px', sm: '16px' }}></Stack>
										) : null}
									</>
								);
							})}
						</TabList>
						{isShowRightArrow && isDesktop ? (
							<Stack px={2}>
								<Icon
									_hover={{ color: 'gray.800' }}
									color={'gray.500'}
									cursor={'pointer'}
									h={'30px'}
									w={'30px'}
									onClick={() => scroll(300)}
									as={ChevronRightIcon}
									alignSelf={'center'}
								/>
							</Stack>
						) : (
							<Stack px={isDesktop ? 2 : 0} />
						)}
					</CustomTabsOption>
				</Center>
				<TabPanels>
					{categories.map((category, index) => {
						return (
							<TabPanel key={index} px={paddingMainHorizontal}>
								<CategoryActivityList />
							</TabPanel>
						);
					})}
				</TabPanels>
				<Center mt="20">
					<Button
						onClick={() => router.push('./markets')}
						px="7"
						py="6"
						borderRadius="3xl"
						colorScheme="teal"
					>
						{t('view_more')}
					</Button>
				</Center>
			</Tabs>
		</Stack>
	);
}

export default CategorySection;
