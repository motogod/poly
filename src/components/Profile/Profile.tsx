import React, { useEffect, useState } from 'react';
import {
	Stack,
	Button,
	Input,
	Card,
	CardBody,
	Grid,
	Heading,
	Text,
	Icon,
	IconButton,
} from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, putUserEmail } from '@/store';
import AppContainer from '@/components/common/Container';
import { headerHeight } from '../../utils/screen';
import style from './profile.module.scss';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function Profile() {
	const [name, setName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [isTriggerGoogle, setIsTriggerGoogle] = useState(false);
	const [idToken, setIdToken] = useState('');

	const { t } = useTranslation();

	const { data: session } = useSession();
	const { user, putUsrProfileIsLoading } = useSelector((state: RootState) => state.authReducer);

	const dispatch = useDispatch<AppDispatch>();

	console.log('user', user);
	const { username, email, origin } = user;
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
			<Stack pt={'60px'} pl={'200px'} h={'150px'} bg={'#0034EB'}></Stack>
			<Stack
				pl={'16px'}
				pr={'16px'}
				mt={-3}
				className={style.skewRectangle}
				borderColor={'#0034EB'}
			>
				<Grid display={'flex'} justifyContent={'center'} templateColumns={'repeat(1, 1fr)'}>
					<Card w={'1112px'} shadow="md" borderRadius="xl">
						<CardBody>
							<Heading
								position={'absolute'}
								top={-20}
								cursor="pointer"
								size="lg"
								color="#FFF"
								mr={5}
							>
								Profile Settings
							</Heading>

							<Text fontWeight={'800'} fontSize={'lg'}>
								{t('account')}
							</Text>
							<Stack direction={'row'} mt={'32px'}>
								<Text fontWeight={'500'} fontSize={'md'}>
									Email
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
											bg="#0034EB"
											size={{ lg: 'md', md: 'sm', sm: 'sm' }}
											color="#fff"
										>
											Save
										</Button>
									</Stack>
								) : null}
							</Grid>
							<Stack direction={'row'} mt={'32px'}>
								<Text fontWeight={'500'} fontSize={'md'}>
									Username
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
								This is publicly visible
							</Text>
						</CardBody>
					</Card>
				</Grid>
			</Stack>
		</Stack>
	);
}

export default Profile;
