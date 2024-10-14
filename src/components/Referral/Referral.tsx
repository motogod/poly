// import React, { useEffect, useState } from 'react';
// import {
// 	Stack,
// 	Button,
// 	Input,
// 	Card,
// 	CardBody,
// 	Grid,
// 	Text,
// 	Icon,
// 	IconButton,
// 	FormLabel,
// 	useToast,
// 	Heading,
// 	GridItem,
// } from '@chakra-ui/react';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useMediaQuery } from 'react-responsive';
// import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
// import { useSession, signIn, signOut } from 'next-auth/react';
// import { FcGoogle } from 'react-icons/fc';
// import { useTranslation } from 'next-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState, putUserEmail } from '@/store';
// import {
// 	headerHeight,
// 	paddingMainHorizontal,
// 	paddingMainVertical,
// 	paddingFundsContainerCardVertical,
// } from '@/utils/screen';
// import AddFriendsIcon from '../../../public/assets/svg/icon-add-friends-01.png';
// import TaskIcon from '../../../public/assets/svg/icon-task-01.png';
// import GiftIcon from '../../../public/assets/svg/icon-gift-01.png';
// import fundsBackroundImg from '@/../public/fundsBackground.png';

// // background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
// function Referral() {
// 	const [name, setName] = useState('');
// 	const [userEmail, setUserEmail] = useState('');
// 	const [isTriggerGoogle, setIsTriggerGoogle] = useState(false);
// 	const [idToken, setIdToken] = useState('');

// 	const router = useRouter();

// 	const { t } = useTranslation();

// 	const toast = useToast();

// 	const isDesktop = useMediaQuery({
// 		query: '(min-width: 960px)',
// 	});

// 	const { data: session } = useSession();
// 	const { user, putUsrProfileIsLoading, isAuthenticated } = useSelector(
// 		(state: RootState) => state.authReducer
// 	);

// 	const dispatch = useDispatch<AppDispatch>();

// 	const { username, email, origin } = user;

// 	useEffect(() => {
// 		if (!isAuthenticated) {
// 			router.replace('./');
// 		}
// 	}, [router, isAuthenticated]);

// 	// 從後端取得資料顯示 email
// 	useEffect(() => {
// 		// 沒有點擊過 Google 才用後端的 user email
// 		if (!isTriggerGoogle) {
// 			setUserEmail(email);
// 		}
// 	}, [email, isTriggerGoogle]);

// 	// 若點擊 google icon 變更 email
// 	useEffect(() => {
// 		if (session) {
// 			const { idToken } = session as any;
// 			setIdToken(idToken); // 設置送 idToken 給後端儲存 google mail
// 			setIsTriggerGoogle(true); // 表示使用者有點擊過 google 改變顯示畫面上的 email
// 			setUserEmail(session.user?.email as string);
// 			signOut({ redirect: false });
// 		}
// 	}, [session]);

// 	const sliceReferral = (walletAddress: string | undefined) => {
// 		if (walletAddress) {
// 			const firstSix = walletAddress?.slice(0, 12);
// 			const lastFour = walletAddress?.slice(-12);

// 			return `${firstSix}...${lastFour}`;
// 		}

// 		return '';
// 	};

// 	return (
// 		<Stack mt={headerHeight} h={'100vh'}>
// 			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
// 				<Card position={'relative'} borderRadius="2xl">
// 					{isDesktop ? (
// 						<Stack
// 							w={'100%'}
// 							padding={34}
// 							h={{ lg: '400px' }}
// 							alignItems={'center'}
// 							bg={'#2D3748'}
// 							direction="row"
// 							borderRadius="2xl"
// 						>
// 							<Stack flex={2} minWidth="0">
// 								<FormLabel
// 									color={'white'}
// 									fontSize={{ lg: '36', md: '36', sm: '24' }}
// 									fontWeight={900}
// 									whiteSpace="normal" // 允許換行
// 								>
// 									Earn OX Points for each friend you refer
// 								</FormLabel>
// 							</Stack>
// 							<Stack flex={3} minWidth="0">
// 								<Heading color="gray.50" size="md">
// 									Referral Link
// 								</Heading>
// 								<Stack align={'center'} direction={'row'} mt={'4px'}>
// 									<Button
// 										w={'100%'}
// 										ml={'4px'}
// 										style={{ justifyContent: 'space-between' }}
// 										rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
// 										bg={'gray.50'}
// 										color={'gray.800'}
// 										border={'0px'}
// 										borderRadius={'4px'}
// 										onClick={() => {
// 											navigator.clipboard.writeText(`https://www.ox.market/?referral=${username}`);
// 											toast({
// 												title: t('copied'),
// 												position: 'top',
// 												status: 'success',
// 												duration: 1000,
// 												isClosable: true,
// 											});
// 										}}
// 									>
// 										{`https://www.ox.market/?referral=${username}`}
// 									</Button>
// 								</Stack>
// 								<Stack align={'center'} direction={'row'}>
// 									<Stack w={'6px'} h={'6px'} borderRadius={'3px'} bg={'#fff'} />
// 									<Text color="gray.50" size="sm">
// 										Share your referral link with friends to earn
// 									</Text>
// 									<Text
// 										onClick={() => router.push('./oxpoints')}
// 										cursor={'pointer'}
// 										color="#4299E1"
// 										size="sm"
// 									>
// 										OX Points
// 									</Text>
// 								</Stack>
// 							</Stack>
// 						</Stack>
// 					) : (
// 						<Stack
// 							w={'100%'}
// 							padding={34}
// 							paddingTop={100}
// 							paddingBottom={100}
// 							// h={{ lg: '243px' }}
// 							alignItems={'center'}
// 							bg={'#2D3748'}
// 							direction="row"
// 							borderRadius="2xl"
// 						>
// 							<Stack flex={1} minWidth="0">
// 								<FormLabel
// 									color={'white'}
// 									fontSize={{ lg: '36', md: '36', sm: '24' }}
// 									fontWeight={900}
// 								>
// 									Earn OX Points for each friend you refer
// 								</FormLabel>
// 								<Heading color="gray.50" size="md">
// 									Referral Link
// 								</Heading>
// 								<Stack align={'center'} direction={'row'} mt={'4px'}>
// 									<Button
// 										w={'100%'}
// 										ml={'4px'}
// 										style={{ justifyContent: 'space-between' }}
// 										rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
// 										bg={'gray.50'}
// 										color={'gray.800'}
// 										border={'0px'}
// 										borderRadius={'4px'}
// 										onClick={() => {
// 											navigator.clipboard.writeText(`https://www.ox.market/?referral=${username}`);
// 											toast({
// 												title: t('copied'),
// 												position: 'top',
// 												status: 'success',
// 												duration: 1000,
// 												isClosable: true,
// 											});
// 										}}
// 									>
// 										{sliceReferral(`https://www.ox.market/?referral=${username}`)}
// 									</Button>
// 								</Stack>
// 								<Stack flex={1} minWidth="0" direction={'row'}>
// 									<Stack mt={2} w={'6px'} h={'6px'} borderRadius={'3px'} bg={'#fff'} />
// 									<Text color="gray.50" size="sm">
// 										Share your referral link with friends to earn{' '}
// 										<Text
// 											as="span"
// 											onClick={() => router.push('./oxpoints')}
// 											cursor="pointer"
// 											color="#4299E1"
// 											size="sm"
// 										>
// 											OX Points
// 										</Text>
// 									</Text>
// 								</Stack>
// 							</Stack>
// 						</Stack>
// 					)}
// 				</Card>
// 				<Grid
// 					templateColumns={{
// 						lg: 'repeat(3, 1fr)',
// 						md: 'repeat(2, 1fr)',
// 						sm: 'repeat(1, 1fr)',
// 					}}
// 					gap={6}
// 					mt={'22px'}
// 				>
// 					<GridItem>
// 						<Card
// 							onClick={() => null}
// 							opacity={1}
// 							cursor="pointer"
// 							shadow="md"
// 							_hover={{ shadow: 'xl' }}
// 							border="1px solid #EDF2F7;"
// 							borderRadius="lg"
// 						>
// 							<CardBody minH={'240px'}>
// 								<Stack align={'center'} mt={'22px'}>
// 									<Image src={AddFriendsIcon} width={43} height={43} alt="socialPng" />
// 								</Stack>
// 								<Stack direction="row" mt={'6px'}>
// 									<Stack flex={1} align={'center'}>
// 										<Heading onClick={e => null} size="md" color="gray.800" fontWeight={'700'}>
// 											Invite Friends
// 										</Heading>
// 									</Stack>
// 								</Stack>
// 								<Stack flex={1} align="center" mt={'24px'} spacing={2}>
// 									<Text textAlign={'center'} fontSize="md" color="gray.800">
// 										Share your referral link with friends
// 									</Text>
// 								</Stack>
// 							</CardBody>
// 						</Card>
// 					</GridItem>
// 					<GridItem>
// 						<Card
// 							flex={1}
// 							onClick={() => null}
// 							opacity={1}
// 							cursor="pointer"
// 							shadow="md"
// 							_hover={{ shadow: 'xl' }}
// 							border="1px solid #EDF2F7;"
// 							borderRadius="lg"
// 						>
// 							<CardBody minH={'240px'}>
// 								<Stack align={'center'} mt={'22px'}>
// 									<Image src={TaskIcon} width={43} height={43} alt="socialPng" />
// 								</Stack>
// 								<Stack direction="row" mt={'6px'}>
// 									<Stack flex={1} align={'center'}>
// 										<Heading onClick={e => null} size="md" color="gray.800">
// 											Complete tasks
// 										</Heading>
// 									</Stack>
// 								</Stack>
// 								<Stack flex={1} align="center" mt={'24px'} spacing={2}>
// 									<Text textAlign={'center'} fontSize="md" color="gray.800">
// 										Your friends need to sign up and make a transaction of 1 USDT
// 									</Text>
// 								</Stack>
// 							</CardBody>
// 						</Card>
// 					</GridItem>
// 					<GridItem>
// 						<Card
// 							onClick={() => null}
// 							opacity={1}
// 							cursor="pointer"
// 							shadow="md"
// 							_hover={{ shadow: 'xl' }}
// 							border="1px solid #EDF2F7;"
// 							borderRadius="lg"
// 						>
// 							<CardBody minH={'240px'}>
// 								<Stack align={'center'} mt={'22px'}>
// 									<Image src={GiftIcon} width={43} height={43} alt="socialPng" />
// 								</Stack>
// 								<Stack direction="row" mt={'6px'}>
// 									<Stack flex={1} align={'center'}>
// 										<Heading onClick={e => null} size="md" color="gray.800">
// 											Gain OX Points
// 										</Heading>
// 									</Stack>
// 								</Stack>
// 								<Stack flex={1} align="center" mt={'24px'} spacing={2}>
// 									<Text textAlign={'center'} fontSize="md" color="gray.800">
// 										The inviter receives 5,000 OX Points, and the invitee receives 2,500 OX Points
// 									</Text>
// 								</Stack>
// 							</CardBody>
// 						</Card>
// 					</GridItem>
// 				</Grid>
// 			</Stack>
// 		</Stack>
// 	);
// }

// export default Referral;

import React, { useEffect, useState } from 'react';
import {
	Stack,
	Button,
	Input,
	Card,
	CardBody,
	Grid,
	Text,
	Icon,
	IconButton,
	FormLabel,
	useToast,
	Heading,
	GridItem,
	Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, putUserEmail } from '@/store';
import {
	headerHeight,
	paddingMainHorizontal,
	paddingMainVertical,
	paddingFundsContainerCardVertical,
} from '@/utils/screen';
import AddFriendsIcon from '@/../public/assets/svg/icon-add-friends-01.png';
import TaskIcon from '@/../public/assets/svg/icon-task-01.png';
import GiftIcon from '@/../public/assets/svg/icon-gift-01.png';
import ReferralBannerImg from '@/../public/referral-banner-bg.png';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function Referral() {
	const [name, setName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [isTriggerGoogle, setIsTriggerGoogle] = useState(false);
	const [idToken, setIdToken] = useState('');

	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { data: session } = useSession();
	const { user, putUsrProfileIsLoading, isAuthenticated } = useSelector(
		(state: RootState) => state.authReducer
	);

	const dispatch = useDispatch<AppDispatch>();

	const { username, email, origin } = user;

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

	// 從後端取得資料顯示 email
	useEffect(() => {
		// 沒有點擊過 Google 才用後端的 user email
		if (!isTriggerGoogle) {
			setUserEmail(email);
		}
	}, [email, isTriggerGoogle]);

	// 若點擊 google icon 變更 email
	useEffect(() => {
		if (session) {
			const { idToken } = session as any;
			setIdToken(idToken); // 設置送 idToken 給後端儲存 google mail
			setIsTriggerGoogle(true); // 表示使用者有點擊過 google 改變顯示畫面上的 email
			setUserEmail(session.user?.email as string);
			signOut({ redirect: false });
		}
	}, [session]);

	const sliceReferral = (walletAddress: string | undefined) => {
		if (walletAddress) {
			const firstSix = walletAddress?.slice(0, 22);
			const lastFour = walletAddress?.slice(-2);

			return `${firstSix}...${lastFour}`;
		}

		return '';
	};

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
				<Card position={'relative'} borderRadius="2xl">
					<Stack
						position="relative"
						width="100%"
						height="400px"
						borderRadius="10px"
						overflow="hidden"
					>
						<Image
							width={0}
							height={0}
							style={{ width: '100%', height: '400px', borderRadius: 10, objectFit: 'cover' }}
							src={ReferralBannerImg}
							alt="funds_background"
						/>
						<Box
							position="absolute"
							top="0"
							left="0"
							right="0"
							bottom="0"
							backgroundColor="rgba(26, 32, 44, 0.8)"
						/>
						<Stack
							flex={1}
							position="absolute"
							align={'center'}
							w={'100%'}
							p={'42px'}
							h={{ lg: '400px', md: '400px', sm: '400px' }}
							direction="row"
							borderRadius="2xl"
						>
							{isDesktop ? (
								<Stack
									position="absolute"
									w={'100%'}
									padding={0}
									h={{ lg: '400px' }}
									alignItems={'center'}
									direction="row"
									borderRadius="2xl"
								>
									<Stack flex={2} minWidth="0">
										<FormLabel
											color={'white'}
											fontSize={{ lg: '36', md: '36', sm: '24' }}
											fontWeight={900}
											whiteSpace="normal" // 允許換行
										>
											Earn OX Points for each friend you refer
										</FormLabel>
									</Stack>
									<Stack flex={3} minWidth="0">
										<Heading color="gray.50" size="md">
											Referral Link
										</Heading>
										<Stack align={'center'} mt={'4px'} paddingRight={'80px'}>
											<Button
												w={'100%'}
												ml={'4px'}
												style={{ justifyContent: 'space-between' }}
												rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
												bg={'gray.50'}
												color={'gray.800'}
												border={'0px'}
												borderRadius={'4px'}
												onClick={() => {
													navigator.clipboard.writeText(
														`https://www.ox.market?referral=${username}`
													);
													toast({
														title: t('copied'),
														position: 'top',
														status: 'success',
														duration: 1000,
														isClosable: true,
													});
												}}
											>
												{`https://www.ox.market?referral=${username}`}
											</Button>
										</Stack>
										<Stack align={'center'} direction={'row'}>
											<Stack w={'6px'} h={'6px'} borderRadius={'3px'} bg={'#fff'} />
											<Text color="gray.50" size="sm">
												Share your referral link with friends to earn
											</Text>
											<Text
												onClick={() => router.push('./oxpoints')}
												cursor={'pointer'}
												color="#4299E1"
												size="sm"
											>
												OX Points
											</Text>
										</Stack>
									</Stack>
								</Stack>
							) : (
								<Stack
									position="absolute"
									w={'100%'}
									paddingRight={'38px'}
									paddingTop={100}
									paddingBottom={100}
									h={{ lg: '400px' }}
									borderRadius="2xl"
									// bg={'blue'}
								>
									<FormLabel
										color={'white'}
										fontSize={{ lg: '36', md: '36', sm: '24' }}
										fontWeight={900}
										whiteSpace="normal" // 允許換行
									>
										Earn OX Points for each friend you refer
									</FormLabel>

									<Heading color="gray.50" size="md">
										Referral Link
									</Heading>
									<Stack align={'center'} paddingRight={34} mt={'4px'}>
										<Button
											w={'100%'}
											ml={'4px'}
											style={{ justifyContent: 'space-between' }}
											rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
											bg={'gray.50'}
											color={'gray.800'}
											border={'0px'}
											borderRadius={'4px'}
											onClick={() => {
												navigator.clipboard.writeText(`https://www.ox.market?referral=${username}`);
												toast({
													title: t('copied'),
													position: 'top',
													status: 'success',
													duration: 1000,
													isClosable: true,
												});
											}}
										>
											{sliceReferral(`https://www.ox.market?referral=${username}`)}
										</Button>
									</Stack>
									<Stack direction={'row'} paddingRight={34}>
										<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#fff'} />
										<Text color="gray.50" size="sm">
											Share your referral link with friends to earn{' '}
											<Text
												as="span"
												onClick={() => router.push('./oxpoints')}
												cursor="pointer"
												color="#4299E1"
												size="sm"
											>
												OX Points
											</Text>
										</Text>
									</Stack>
								</Stack>
							)}
						</Stack>
					</Stack>
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
			>
				<GridItem>
					<Card
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
					>
						<CardBody minH={'240px'}>
							<Stack align={'center'} mt={'22px'}>
								<Image src={AddFriendsIcon} width={43} height={43} alt="socialPng" />
							</Stack>
							<Stack direction="row" mt={'6px'}>
								<Stack flex={1} align={'center'}>
									<Heading onClick={e => null} size="md" color="gray.800" fontWeight={'700'}>
										Invite Friends
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.800">
									Share your referral link with friends
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
					>
						<CardBody minH={'240px'}>
							<Stack align={'center'} mt={'22px'}>
								<Image src={TaskIcon} width={43} height={43} alt="socialPng" />
							</Stack>
							<Stack direction="row" mt={'6px'}>
								<Stack flex={1} align={'center'}>
									<Heading onClick={e => null} size="md" color="gray.800">
										Complete tasks
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.800">
									Your friends need to sign up and make a transaction of 1 USDT
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
					>
						<CardBody minH={'240px'}>
							<Stack align={'center'} mt={'22px'}>
								<Image src={GiftIcon} width={43} height={43} alt="socialPng" />
							</Stack>
							<Stack direction="row" mt={'6px'}>
								<Stack flex={1} align={'center'}>
									<Heading onClick={e => null} size="md" color="gray.800">
										Gain OX Points
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.800">
									The inviter receives 5,000 OX Points, and the invitee receives 2,500 OX Points
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
		</Stack>
	);
}

export default Referral;
