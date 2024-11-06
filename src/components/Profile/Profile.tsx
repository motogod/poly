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
} from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
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
import Footer from '@/layouts/components/common/Footer';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function Profile() {
	const [name, setName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [isTriggerGoogle, setIsTriggerGoogle] = useState(false);
	const [idToken, setIdToken] = useState('');

	const router = useRouter();

	const isDesktop = useMediaQuery({
		query: '(min-width: 760px)',
	});

	const { t } = useTranslation();

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

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
				<Card borderRadius="2xl">
					<Stack
						w={'100%'}
						h={{ lg: '280px', md: '160px', sm: '160px' }}
						alignItems={'center'}
						justifyContent={isDesktop ? '' : 'center'}
						bg={'#2D3748'}
						justify="space-between"
						direction="row"
						borderRadius="2xl"
					>
						<FormLabel
							ml={34}
							color={'white'}
							fontSize={{ lg: '36', md: '36', sm: '24' }}
							fontWeight={900}
						>
							{t('profile_settings')}
						</FormLabel>
					</Stack>
				</Card>
				<Grid display={'flex'} justifyContent={'center'} templateColumns={'repeat(1, 1fr)'}>
					<Card w={'100%'} mt={paddingFundsContainerCardVertical} shadow="md" borderRadius="2xl">
						<CardBody shadow="lg" border="1px solid #E2E8F0;" borderRadius="2xl">
							<Text fontWeight={'800'} fontSize={'lg'}>
								{t('account')}
							</Text>
							<Stack direction={'row'} mt={'32px'}>
								<Text fontWeight={'500'} fontSize={'md'}>
									{t('email')}
								</Text>
							</Stack>
							<Grid
								mt={'12px'}
								flexDirection={'row'}
								maxWidth={{ lg: 0 }}
								templateColumns={{
									lg: 'repeat(3, 1fr)',
									md: 'repeat(1, 1fr)',
									sm: 'repeat(1, 1fr)',
								}}
								gap={2}
							>
								<Input
									defaultValue={userEmail}
									isDisabled={true}
									onChange={e => setUserEmail(e.target.value)}
									w={{ lg: '600px', md: '', sm: '' }}
									placeholder={''}
									border="2px solid #E2E8F0;"
								/>
								{origin !== 'google' && origin ? (
									<Stack direction={'row'}>
										<IconButton
											onClick={() => signIn('google')}
											bg={'#fff'}
											border="1px solid #E2E8F0;"
											aria-label="google"
											size={{ lg: 'md', md: 'sm', sm: 'sm' }}
											icon={<Icon as={FcGoogle} />}
										/>
										<Button
											isLoading={putUsrProfileIsLoading === true ? true : false}
											isDisabled={!isTriggerGoogle || userEmail === '' || userEmail === null}
											onClick={() => dispatch(putUserEmail({ idToken }))}
											size={{ lg: 'md', md: 'sm', sm: 'sm' }}
											colorScheme="purple"
											// bg="#0034EB"
											// color="#fff"
										>
											{t('save')}
										</Button>
									</Stack>
								) : null}
							</Grid>
							<Stack direction={'row'} mt={'32px'}>
								<Text fontWeight={'500'} fontSize={'md'}>
									{t('username')}
								</Text>
								<Text fontWeight={'500'} fontSize={'md'} color={'red'}>
									*
								</Text>
							</Stack>
							<Stack mt={'12px'} display={'flex'} direction={'row'} alignItems={'center'}>
								<Input
									defaultValue={username !== null ? username : ''}
									isDisabled={true}
									onChange={e => setName(e.target.value)}
									w={'600px'}
									placeholder={'Please enter your preferred username'}
									border="2px solid #E2E8F0;"
								/>
								{/* <Button isDisabled={!name} bg="#0034EB" color="#fff">
									Save
								</Button> */}
							</Stack>
							<Text fontWeight={'500'} fontSize={'sm'} mt={'10px'} color={'#7C7C7C'}>
								{t('the_username_can_only_include')}
							</Text>
						</CardBody>
					</Card>
				</Grid>
			</Stack>
			<Stack mt={'120px'} />
			<Footer />
		</Stack>
	);
}

export default Profile;
