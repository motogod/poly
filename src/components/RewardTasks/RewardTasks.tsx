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
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, resetPostRewardTasksMonthlyDraw } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import RewardDepositImg from '@/../public/assets/svg/reward-deposit.png';
import RewardTradeImg from '@/../public/assets/svg/reward-trade.png';
import RewardDrawImg from '@/../public/assets/svg/image-rewards-03.png';
import OxPointsBannerIcon from '@/../public/image-rewards-illustration.png';
import OxPointsBannerImg from '@/../public/rewards-banner-bg.png';
import {
	getPoints,
	getRewardTasks,
	postRewardTasksMonthlyDrawJoin,
} from '@/store/thunks/fetchPoint';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function RewardTasks() {
	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 600px)',
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
				title: 'You have successfully joined the monthly draw.',
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
				<Card position={'relative'} borderRadius="2xl">
					<Stack
						flex={1}
						position="absolute"
						align={'center'}
						w={'100%'}
						padding={34}
						h={{ lg: '400px', md: '400px', sm: '400px' }}
						direction="row"
						borderRadius="2xl"
					>
						<Stack flex={2} minWidth="0">
							<FormLabel
								color={'white'}
								fontSize={{ lg: '36', md: '36', sm: '36' }}
								fontWeight={900}
								whiteSpace="normal" // 允許換行
							>
								Reward Tasks
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
						zIndex={0}
						position="absolute"
						right={isDesktop ? '130' : '30'}
						top="50%"
						transform={'translateY(-50%)'}
					>
						<Image src={OxPointsBannerIcon} alt="socialPng" height={isDesktop ? 280 : 140} />
					</Box>
				</Card>
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
							<Stack h={'130px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.deposit?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										{rewarkTasksData?.deposit?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									onClick={() => {
										if (!rewarkTasksData?.tradeVolume?.completed) {
											router.push('./funds');
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.deposit?.completed ? 'teal.500' : '#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
									textColor={rewarkTasksData?.deposit?.completed ? '#fff' : 'teal.500'}
									cursor={rewarkTasksData?.deposit?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.deposit?.completed ? 'teal.500' : 'gray.200' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.deposit?.completed && (
										<CheckCircleIcon w={4} h={4} color="#fff" mr={'8px'} />
									)}
									{rewarkTasksData?.deposit?.completed ? 'Completed' : 'Earn Now'}
								</Button>
								<Text textAlign={'center'} lineHeight={1.3}>
									After you successfully deposit,{' '}
									<Text
										as="span"
										onClick={() => router.push('./oxpoints')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										OX Points
									</Text>{' '}
									will be credited within 60 minutes.
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
							<Stack h={'130px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.tradeVolume?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										{rewarkTasksData?.tradeVolume?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									onClick={() => {
										if (!rewarkTasksData?.tradeVolume?.completed) {
											router.push('./markets');
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.tradeVolume?.completed ? 'teal.500' : '#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
									textColor={rewarkTasksData?.tradeVolume?.completed ? '#fff' : 'teal.500'}
									cursor={rewarkTasksData?.tradeVolume?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.tradeVolume?.completed ? 'teal.500' : 'gray.200' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.tradeVolume?.completed && (
										<CheckCircleIcon w={4} h={4} color="#fff" mr={'8px'} />
									)}
									{rewarkTasksData?.tradeVolume?.completed ? 'Completed' : 'Earn Now'}
								</Button>
								<Text textAlign={'center'} lineHeight={1.3}>
									Complete the task get 10 USDT in your{' '}
									<Text
										as="span"
										onClick={() => router.push('./funds')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										wallet{' '}
									</Text>
									within 60 minutes.
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
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
							<Stack h={'130px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									{rewarkTasksData?.monthlyDraw?.name}
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										{rewarkTasksData?.monthlyDraw?.description}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									isLoading={isPostRewardTasksMonthlyDrawJoinLoading}
									onClick={() => {
										if (!rewarkTasksData?.monthlyDraw?.completed) {
											dispatch(postRewardTasksMonthlyDrawJoin());
										}
									}}
									borderWidth={1}
									bg={rewarkTasksData?.monthlyDraw?.completed ? 'teal.500' : '#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
									textColor={rewarkTasksData?.monthlyDraw?.completed ? '#fff' : 'teal.500'}
									cursor={rewarkTasksData?.monthlyDraw?.completed ? 'default' : 'pointer'}
									_hover={{ bg: rewarkTasksData?.monthlyDraw?.completed ? 'teal.500' : 'gray.200' }} // 關閉 hover 時的背景色變化
									display={'flex'}
									alignItems="center" // 垂直置中
									justifyContent="center" // 水平置中
								>
									{rewarkTasksData?.monthlyDraw?.completed && (
										<CheckCircleIcon w={4} h={4} color="#fff" mr={'8px'} />
									)}
									{rewarkTasksData?.monthlyDraw?.completed ? 'Joined' : 'Join the Draw'}
								</Button>
								<Text textAlign={'center'} lineHeight={1.3}>
									Winners will be announced on the 1st of each month in the{' '}
									<Link
										href="https://t.me/OXmarket_announcement"
										isExternal
										_hover={{ textDecoration: 'none' }}
										color="#4299E1"
									>
										official Telegram channel.
									</Link>
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
							How to complete tasks
						</Heading>
					</Stack>
					<Stack mt={'18px'}>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>1.</Text>
							</Stack>

							<Stack direction={'row'}>
								<Text>
									{`Deposit 5 USDT into your account and instantly earn 2,000 OX Points, which will be credited to your account within 60 minutes.`}
								</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>2.</Text>
							</Stack>

							<Stack direction={'row'}>
								<Text>
									Trade over 15 USDT and hold 3 markets to earn a 10 USDT reward, which will be sent
									to your wallet within 60 minutes of completing the task.
								</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>3.</Text>
							</Stack>
							<Stack direction={'row'}>
								<Text>
									Join the 30 USDT draw every month. Winners will be announced on the 1st of each
									month on the official Telegram channel.
								</Text>
							</Stack>
						</HStack>
					</Stack>
				</CardBody>
			</Card>
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
			/>
		</Stack>
	);
}

export default RewardTasks;
