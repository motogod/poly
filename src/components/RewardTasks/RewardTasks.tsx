import React, { useEffect } from 'react';
import {
	Stack,
	Button,
	Card,
	CardBody,
	Grid,
	Text,
	FormLabel,
	useToast,
	Heading,
	GridItem,
	Tabs,
	TabPanels,
	TabPanel,
	HStack,
	Box,
	Link,
	Image as ChakraImage,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, resetPostRewardTasksMonthlyDraw } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import RewardDrawImg from '@/../public/assets/svg/reward-task-01.png';
import RewardDepositImg from '@/../public/assets/svg/reward-task-02.png';
import RewardTradeImg from '@/../public/assets/svg/reward-task-03.png';
import OxPointsBannerIcon from '@/../public/image-rewards-illustration.png';
// import OxPointsBannerImg from '@/../public/banner-redemption-events-bg-02.png';
import OxPointsBannerImg from '@/../public/background-01.png';
import {
	getPoints,
	getRewardTasks,
	postRewardTasksMonthlyDrawJoin,
} from '@/store/thunks/fetchPoint';
import Footer from '@/layouts/components/common/Footer';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function RewardTasks() {
	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 760px)',
	});

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const {
		rewarkTasksData,
		isPostRewardTasksMonthlyDrawJoinLoading,
		isPostRewardTasksMonthlyDrawStatusCode,
	} = useSelector((state: RootState) => state.pointReducer);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated && isAuthenticated !== null) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

	useEffect(() => {
		dispatch(getPoints({ page: 1, take: 20 }));

		dispatch(getRewardTasks());
	}, [dispatch]);

	useEffect(() => {
		if (isPostRewardTasksMonthlyDrawStatusCode === 201) {
			toast({
				title: t('you_have_successfully_joined_the_monthly_draw'),
				position: 'top',
				status: 'success',
				duration: 1000,
				isClosable: true,
			});

			dispatch(resetPostRewardTasksMonthlyDraw({}));
		}
	}, [dispatch, isPostRewardTasksMonthlyDrawStatusCode, t, toast]);

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
				{isDesktop ? (
					<Card position={'relative'} borderRadius="2xl">
						<Stack
							flex={1}
							position="absolute"
							align={'center'}
							w={'100%'}
							padding={'72px'}
							h={{ lg: '400px', md: '400px', sm: '400px' }}
							direction="row"
							borderRadius="2xl"
						>
							<Stack flex={2} minWidth="0">
								<FormLabel
									color={'white'}
									fontSize={{ lg: '36', md: '30', sm: '30' }}
									fontWeight={900}
									whiteSpace="normal" // 允許換行
									zIndex={2}
								>
									{t('reward_tasks')}
								</FormLabel>
							</Stack>
						</Stack>
						<Image
							width={0}
							height={0}
							style={{ width: '100%', height: '400px', borderRadius: 10, objectFit: 'cover' }}
							src={OxPointsBannerImg}
							alt="funds_background"
						/>
						<Box
							position="absolute"
							style={{ borderRadius: 10 }}
							top="0"
							left="0"
							right="0"
							bottom="0"
							backgroundColor="rgba(26, 32, 44, 0.7)"
							zIndex={1}
						/>
						<Box
							zIndex={2}
							position="absolute"
							right={isDesktop ? '130' : '50'}
							top="50%"
							transform={'translateY(-50%)'}
						>
							<Image
								src={OxPointsBannerIcon}
								alt="socialPng"
								height={isDesktop ? 280 : 160}
								width={isDesktop ? 280 : 160}
							/>
						</Box>
					</Card>
				) : (
					<Card position={'relative'} borderRadius="2xl">
						<Stack
							flex={1}
							position="absolute"
							align={'center'}
							w={'100%'}
							pt={'60px'}
							pb={'60px'}
							pl={'24px'}
							pr={'24px'}
							h={'352px'}
							borderRadius="2xl"
						>
							<Stack zIndex={2} flex={2} minWidth="0" justifyContent={'space-between'}>
								<Image src={OxPointsBannerIcon} alt="socialPng" height={160} width={160} />
								<FormLabel
									color={'white'}
									fontSize={{ lg: '36', md: '30', sm: '30' }}
									fontWeight={900}
									whiteSpace="normal" // 允許換行
								>
									{t('reward_tasks')}
								</FormLabel>
							</Stack>
						</Stack>
						<Image
							width={0}
							height={0}
							style={{ width: '100%', height: '352px', borderRadius: 10, objectFit: 'cover' }}
							src={OxPointsBannerImg}
							alt="funds_background"
						/>
						<Box
							position="absolute"
							style={{ borderRadius: 10 }}
							top="0"
							left="0"
							right="0"
							bottom="0"
							backgroundColor="rgba(26, 32, 44, 0.7)"
							zIndex={1}
						/>
						<Box
							zIndex={2}
							position="absolute"
							right={isDesktop ? '130' : '50'}
							top="50%"
							transform={'translateY(-50%)'}
						>
							{/* <Image
								src={OxPointsBannerIcon}
								alt="socialPng"
								height={isDesktop ? 280 : 160}
								width={isDesktop ? 280 : 160}
							/> */}
						</Box>
					</Card>
				)}
			</Stack>
			<Grid
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				templateColumns={{
					lg: 'repeat(3, 1fr)',
					md: 'repeat(2, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={6}
				mt={'22px'}
				alignItems="stretch"
			>
				<GridItem>
					<Card
						flex={1}
						onClick={() => null}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
						h="100%"
					>
						<CardBody h={'100%'}>
							<Stack h="112px" mt={'40px'} align={'center'}>
								<Image src={RewardDrawImg} width={77} alt="socialPng" />
							</Stack>
							<Stack h={'110px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.monthlyDraw?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3} color={'gray.500'}>
										{rewarkTasksData?.monthlyDraw?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									isLoading={isPostRewardTasksMonthlyDrawJoinLoading}
									size={'lg'}
									onClick={() => {
										if (!rewarkTasksData?.monthlyDraw?.completed) {
											dispatch(postRewardTasksMonthlyDrawJoin());
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.monthlyDraw?.completed ? 'gray.100' : '#fff'}
									borderColor={'gray.100'}
									textColor={'gray.800'}
									cursor={rewarkTasksData?.monthlyDraw?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.monthlyDraw?.completed ? 'gray.100' : 'gray.100' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.monthlyDraw?.completed && (
										<CheckCircleIcon w={4} h={4} color="gray.800" mr={'8px'} />
									)}
									{rewarkTasksData?.monthlyDraw?.completed ? t('joined') : t('join_the_draw')}
								</Button>
								<Text fontSize={'sm'} textAlign={'center'} lineHeight={1.3} mb={'24px'}>
									{t('monthly_reward_description_one')}
									<Link
										href="https://t.me/OXmarket_announcement"
										isExternal
										_hover={{ textDecoration: 'none' }}
										color="#4299E1"
									>
										{t('monthly_reward_description_two')}
									</Link>
									{t('monthly_reward_description_three')}
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card
						flex={1}
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
						h="100%"
					>
						<CardBody h={'100%'}>
							<Stack h="112px" mt={'40px'} align={'center'}>
								<Image src={RewardDepositImg} width={77} alt="socialPng" />
							</Stack>
							<Stack h={'110px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.deposit?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3} color={'gray.500'}>
										{rewarkTasksData?.deposit?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									size={'lg'}
									onClick={() => {
										if (!rewarkTasksData?.tradeVolume?.completed) {
											router.push('./funds');
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.deposit?.completed ? 'gray.100' : '#fff'}
									borderColor={'gray.100'}
									textColor={'gray.800'}
									cursor={rewarkTasksData?.deposit?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.deposit?.completed ? 'gray.100' : 'gray.100' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.deposit?.completed && (
										<CheckCircleIcon w={4} h={4} color="gray.800" mr={'8px'} />
									)}
									{rewarkTasksData?.deposit?.completed ? t('completed') : t('earn_now')}
								</Button>
								<Text fontSize={'sm'} textAlign={'center'} lineHeight={1.3} mb={'24px'}>
									{t('after_you_successfully_deposit')}
									<Text
										as="span"
										onClick={() => router.push('./oxpoints')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										{t('ox_points')}
									</Text>
									{t('will_be_credited_within_minutes')}
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card
						flex={1}
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
						h="100%"
					>
						<CardBody h={'100%'}>
							<Stack h="112px" mt={'40px'} align={'center'}>
								<Image src={RewardTradeImg} width={77} alt="socialPng" />
							</Stack>
							<Stack h={'110px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.tradeVolume?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3} color={'gray.500'}>
										{rewarkTasksData?.tradeVolume?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									size={'lg'}
									onClick={() => {
										if (!rewarkTasksData?.tradeVolume?.completed) {
											router.push('./markets');
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.tradeVolume?.completed ? 'gray.100' : '#fff'}
									borderColor={'gray.100'}
									textColor={'gray.800'}
									cursor={rewarkTasksData?.tradeVolume?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.tradeVolume?.completed ? 'gray.100' : 'gray.100' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.tradeVolume?.completed && (
										<CheckCircleIcon w={4} h={4} color="gray.800" mr={'8px'} />
									)}
									{rewarkTasksData?.tradeVolume?.completed ? t('completed') : t('earn_now')}
								</Button>
								<Text fontSize={'sm'} textAlign={'center'} lineHeight={1.3} mb={'24px'}>
									{t('task_reward_description_one')}
									<Text
										as="span"
										onClick={() => router.push('./funds')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										{t('task_reward_description_two')}
									</Text>
									{t('task_reward_description_three')}
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
			<Card
				flex={1}
				mt={8}
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				onClick={() => null}
				shadow="md"
				_hover={{ shadow: 'xl' }}
				border="1px solid #EDF2F7;"
				borderRadius="lg"
			>
				<CardBody h={'100%'}>
					<Stack>
						<Heading size="md" color="gray.800">
							{t('how_to_complete_tasks')}
						</Heading>
					</Stack>
					<Stack mt={'18px'}>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'} color={'gray.800'}>
									1.
								</Text>
							</Stack>

							<Stack direction={'row'}>
								<Text color={'gray.800'} fontSize={'md'}>
									{t('deposit_usdt_into_your_account_and')}
								</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'} color={'gray.800'}>
									2.
								</Text>
							</Stack>
							<Stack direction={'row'}>
								<Text color={'gray.800'} fontSize={'md'}>
									{t('hold_at_least_markets_and')}
								</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'} color={'gray.800'}>
									3.
								</Text>
							</Stack>
							<Stack direction={'row'}>
								<Text color={'gray.800'} fontSize={'md'}>
									{t('join_the_usdt_draw_every_month')}
								</Text>
							</Stack>
						</HStack>
					</Stack>
				</CardBody>
			</Card>
			<Stack mt={'120px'} />
			<Footer />
		</Stack>
	);
}

export default RewardTasks;
