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
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, getHomeCategorySectionMarkets, AppDispatch } from '@/store';
import CategoryActivityList from './CategoryActivityList';
import CustomTabsOption from './CustomTabsOption';
import styles from './categorySection.module.scss';
import { paddingMainHorizontal } from '@/utils/screen';

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

	const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
	const [isShowRightArrow, setIsShowRightArrow] = useState(false);

	const listRef = useRef<any>(null);

	const dispatch = useDispatch<AppDispatch>();

	const { categoriesData } = useSelector((state: RootState) => state.dataReducer);

	const categories = categoriesData[0].menuData[2].subMenuData;

	const [selectedCategory, setSelectedCategory] = useState('');

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	useEffect(() => {
		// 有撈到 categories 資料，首頁畫面預設撈取第一個 category 的 markets 議題資料
		if (categories.length > 0) {
			dispatch(
				getHomeCategorySectionMarkets({ childrenCategories: categories[0].childrenCategories })
			);

			setSelectedCategory(categories[0].name);
		}
	}, [categories, dispatch]);

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
					{'Markets'}
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
												console.log('CHECK', categories[index].childrenCategories);
												dispatch(
													getHomeCategorySectionMarkets({
														childrenCategories: categories[index].childrenCategories,
													})
												);

												setSelectedCategory(categories[index].name);
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
								<CategoryActivityList selectedCategory={selectedCategory} />
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
						View More
					</Button>
				</Center>
			</Tabs>
		</Stack>
	);
}

export default CategorySection;
