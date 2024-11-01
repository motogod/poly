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
	Tag,
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
import Footer from '@/layouts/components/common/Footer';

function Referral() {
	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const isDesktopForLink = useMediaQuery({
		query: '(min-width: 1200px)',
	});

	const { data: session } = useSession();
	const { user, putUsrProfileIsLoading, isAuthenticated } = useSelector(
		(state: RootState) => state.authReducer
	);

	const dispatch = useDispatch<AppDispatch>();

	const { username, email, origin } = user;

	useEffect(() => {
		if (!isAuthenticated && isAuthenticated !== null) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

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
							h={{ lg: '400px', md: '400px', sm: '400px' }}
							direction="row"
							borderRadius="2xl"
						>
							{isDesktop ? (
								<Stack
									position="absolute"
									w={'100%'}
									padding={0}
									paddingLeft={'72px'}
									paddingRight={'72px'}
									h={{ lg: '400px' }}
									alignItems={'center'}
									direction="row"
									borderRadius="2xl"
									gap={'80px'}
								>
									<Stack flex={1} minWidth="0">
										<FormLabel
											color={'white'}
											fontSize={{ lg: '36', md: '36', sm: '24' }}
											fontWeight={900}
											whiteSpace="normal" // 允許換行
										>
											{t('earn_oX_points_for_each_friend_you_refer')}
										</FormLabel>
									</Stack>
									<Stack flex={2} minWidth="0" gap={'16px'}>
										<Heading color="gray.50" size="md">
											{t('referral_link')}
										</Heading>
										<Stack align={'center'}>
											<Button
												w={'100%'}
												ml={'4px'}
												fontWeight={'400'}
												style={{ justifyContent: 'space-between' }}
												rightIcon={
													<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} boxSize={5} />
												}
												bg={'gray.50'}
												color={'gray.800'}
												border={'0px'}
												borderRadius={'4px'}
												onClick={() => {
													navigator.clipboard.writeText(
														`https://www.ox.market/home?referral=${username}`
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
												{`https://www.ox.market/home?referral=${username}`}
											</Button>
										</Stack>
										<Stack align={'center'} direction={'row'}>
											<Stack w={'6px'} h={'6px'} borderRadius={'3px'} bg={'#fff'} />
											<Text color="gray.50" size="sm">
												{t('share_your_referral_link_with_friends_to_earn_ox_points')}
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
									paddingLeft={'24px'}
									paddingRight={'24px'}
									paddingTop={100}
									paddingBottom={100}
									h={{ lg: '400px' }}
									borderRadius="2xl"
									gap={4}
									// bg={'blue'}
								>
									<FormLabel
										color={'white'}
										fontSize={{ lg: '36', md: '36', sm: '24' }}
										fontWeight={900}
										whiteSpace="normal" // 允許換行
									>
										{t('earn_oX_points_for_each_friend_you_refer')}
									</FormLabel>
									<Heading mt="14px" color="gray.50" size="md">
										{t('referral_link')}
									</Heading>
									<Stack align={'center'} mt={'4px'}>
										<Button
											w={'100%'}
											ml={'4px'}
											fontWeight={'400'}
											style={{ justifyContent: 'space-between' }}
											rightIcon={
												<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} boxSize={5} />
											}
											bg={'gray.50'}
											color={'gray.800'}
											border={'0px'}
											borderRadius={'4px'}
											onClick={() => {
												navigator.clipboard.writeText(
													`https://www.ox.market/home?referral=${username}`
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
											{sliceReferral(`https://www.ox.market/home?referral=${username}`)}
										</Button>
									</Stack>
									<Stack direction={'row'} paddingRight={34}>
										<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#fff'} />
										<Text color="gray.50" fontSize="sm">
											{t('share_your_referral_link_with_friends_to_earn_ox_points')}
											<Text
												as="span"
												// onClick={() => router.push('./oxpoints')}
												onClick={() => null}
												// cursor="pointer"
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
			<Stack mt={{ lg: '20px', md: '10px', sm: '10px' }} />
			<Grid
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				mb={120}
				templateColumns={{
					lg: 'repeat(3, 1fr)',
					md: 'repeat(2, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={6}
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
										Step1. {t('invite_friends')}
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.500">
									{t('share_your_referral_link_with_friends')}
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
										Step2. {t('complete_tasks')}
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.500">
									{t('your_friends_need_to_sign_up_and_make_a_transaction_more_than')}
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
										Step3. {t('gain_ox_points')}
									</Heading>
								</Stack>
							</Stack>
							<Stack flex={1} align="center" mt={'24px'} spacing={2}>
								<Text textAlign={'center'} fontSize="md" color="gray.500">
									{t('the_inviterreceives_ox_points')}
								</Text>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
			<Footer />
		</Stack>
	);
}

export default Referral;
