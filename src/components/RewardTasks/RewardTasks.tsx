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
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import OxImg from '@/../public/assets/svg/icon-ox-points-01.png';
import RewardSignUpImg from '@/../public/assets/svg/image-rewards-01.png';
import RewardFormImg from '@/../public/assets/svg/image-rewards-02.png';
import RewardDrawImg from '@/../public/assets/svg/image-rewards-03.png';
import RedeemImg from '@/../public/assets/svg/icon-points-redeem-01.png';
import ExchangeImg from '@/../public/assets/svg/image-exchange-01.png';
import PointsHistoryImg from '@/../public/assets/svg/icon-points-history-01.png';
import OxPointsBannerIcon from '@/../public/image-rewards-illustration.png';
import OxPointsBannerImg from '@/../public/rewards-banner-bg.png';
import { getPoints } from '@/store/thunks/fetchPoint';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function RewardTasks() {
	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 600px)',
	});

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { userPointData } = useSelector((state: RootState) => state.pointReducer);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated && isAuthenticated !== null) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

	useEffect(() => {
		dispatch(getPoints({ page: 1, take: 20 }));
	}, [dispatch]);

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
								<Image src={RewardSignUpImg} width={77} alt="socialPng" />
							</Stack>
							<Stack h={'130px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									Sing Up to get 2500 OX Points
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										Sing up via referral and complete 1 USDT transaction to earn 2,500 Points.
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									onClick={() => null}
									borderWidth={1}
									bg={'#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
								>
									Earn Now
								</Button>
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
								<Image src={RewardFormImg} width={77} alt="socialPng" />
							</Stack>
							<Stack h={'130px'}>
								<Heading onClick={e => null} size="md" color="gray.800" textAlign={'center'}>
									Fill Out the Form to Earn 5 USDT
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										Complete and submit the Google Form to earn 5 USDT.
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									onClick={() => null}
									borderWidth={1}
									bg={'#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
								>
									Earn Now
								</Button>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card
						flex={1}
						onClick={() => null}
						opacity={0.5}
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
									Monthly Draw for 30 USDT
								</Heading>
								<Stack>
									<Text textAlign={'center'} noOfLines={3}>
										Complete the first 2 tasks to join the monthly draw for 30 USDT.
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Button
									onClick={() => null}
									borderWidth={1}
									bg={'#fff'}
									borderColor={'teal.500'}
									color={'teal.500'}
								>
									Join the Draw
								</Button>
								<Text textAlign={'center'} lineHeight={1.3}>
									Winners will be announced on the 1st of each month in the{' '}
									<Text
										as="span"
										onClick={() => router.push('./referral')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										official Telegram channel.
									</Text>
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
							Sing Up to get 2500 OX Points
						</Heading>
					</Stack>
					<Stack mt={'18px'}>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>1.</Text>
							</Stack>

							<Stack direction={'row'}>
								<Text>
									{`To earn 2,500 OX Points, you need to sign up using a friend's`}{' '}
									<Text
										as="span"
										onClick={() => router.push('./referral')}
										cursor="pointer"
										color="#4299E1"
										size="sm"
									>
										referral link
									</Text>
									{` and complete a transaction of 1 USDT. The OX Points will be credited to your `}
									<Text as="span" onClick={() => null} cursor="pointer" color="#4299E1" size="sm">
										Points Center
									</Text>
									{` within 24 hours of completing the task.`}
								</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>2.</Text>
							</Stack>

							<Stack direction={'row'}>
								<Text>Test</Text>
							</Stack>
						</HStack>
						<HStack align={'start'}>
							<Stack>
								<Text w={'15px'}>3.</Text>
							</Stack>
							<Stack direction={'row'}>
								<Text>Test</Text>
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
