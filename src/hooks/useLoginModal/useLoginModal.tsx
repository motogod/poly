import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import NewWindow from 'react-new-window';
import {
	Stack,
	Button,
	Heading,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Icon,
	Box,
	Divider,
	AbsoluteCenter,
	Text,
	ScaleFade,
	Link,
} from '@chakra-ui/react';
import { WarningIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useSession, signOut } from 'next-auth/react';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { useSDK } from '@metamask/sdk-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginWithGoogle, RootState } from '@/store';
import { useSiwe, useReferral, useLink } from '@/hooks';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';
import { zIndexLoginModal } from '@/utils/zIndex';

type AgentType = 'WebView' | 'iPhone' | 'Android' | 'web';

let hasDispatch = false;

function useLoginModal() {
	const [popupGoogle, setPopupGoogle] = useState<boolean | null>(null);
	const [errorMsg, setErrorMsg] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { t } = useTranslation();

	const { link } = useLink();

	// 若網址有推薦人 ?referral=推薦人姓名，登入時會用到
	const referral = useReferral();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { disconnect } = useDisconnect();
	// const { chain } = useNetwork();
	// const { switchNetwork } = useSwitchNetwork();

	const { signInWithEthereum, isLoading: isSignInLoading, reset: resetSignIn } = useSiwe();

	const { data: session, status: sessionStatus } = useSession();

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	// callback onSuccess 登入成功時，簽名
	// const { connect, connectors, error, connectAsync } = useConnect({
	// 	mutation: {
	// 		onSuccess: async (data, variables: any, context) => {
	// 			const { accounts, chainId } = data;

	// // variables.connector.type 用何種方式登入錢包也告訴後端
	// await signInWithEthereum(
	// 	accounts[0],
	// 	chainId,
	// 	variables.connector.type,
	// 	referral as string
	// );
	// 		},
	// 		onError: (error, variables, context) => {
	// 			setErrorMsg(error.message);
	// 		},
	// 	},
	// });
	const { connect, connectors, connectAsync } = useConnect();

	// const { sdk, connected, connecting, provider, chainId, account: metaAccount } = useSDK();
	// 確保登入視窗打開時，清除 connect 的狀態，避免 ConnectorAlreadyConnectedError
	useEffect(() => {
		if (isOpen) {
			disconnect();
		}
	}, [disconnect, isOpen]);

	useEffect(() => {
		if (sessionStatus === 'authenticated' && session) {
			// Google 新視窗登入成功時，關閉原本的登入 Modal
			if (setPopupGoogle && isOpen) {
				const { idToken } = session as any;

				// authSlice 有處理成功失敗後的邏輯，當下這邊 useEffect 也有處理 =>
				// 與後端確認 google 成功才關視窗
				dispatch(loginWithGoogle({ idToken, referral: { username: referral as string } }))
					.unwrap()
					.then(value => {
						console.log('loginWithGoogle value', value);
						const { statusCode } = value;

						if (statusCode === 201) {
							// 確認 Google 在後台端也登入成功才關閉視窗
							onClose();
							hasDispatch = true;
							setPopupGoogle(false);
						} else {
							// 與後端確認失敗，清掉瀏覽器的 google cookie
							signOut({ redirect: false });
						}
					})
					.catch(err => {
						console.log('loginWithGoogle err', err);
						// 與後端確認失敗，清掉瀏覽器的 google cookie
						signOut({ redirect: false });
					});
			}
		}
	}, [sessionStatus, onClose, session, dispatch, isOpen, referral]);

	// 登入成功 關閉 LoginModal 視窗
	useEffect(() => {
		if (isAuthenticated) {
			onClose();
		}
	}, [isAuthenticated, onClose]);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	// 若是網頁開啟，使用者未安裝 MetaMask 引導至 MetaMask 官網
	const isWebsiteAgent = (): AgentType => {
		// 專案在 MetaMask APP 裡面的 WebView 下開啟
		if (navigator.userAgent.includes('WebView')) {
			return 'WebView';
		}
		// 在 iPhone 的瀏覽器下
		if (navigator.userAgent.includes('iPhone')) {
			return 'iPhone';
		}
		// 在 Android 的瀏覽器下
		if (navigator.userAgent.includes('Android')) {
			return 'Android';
		}
		// Desktop
		return 'web';
	};

	const triggerIntoMetaMaskAppWebView = () => {
		// 手機端導入到 Metamask APP 裡面的 webView 頁面
		window.open(`https://metamask.app.link/dapp/${window.location.host}`);
	};

	console.log('connectors =>', connectors);

	const handleConnect = useCallback(
		async (connector: any) => {
			await connectAsync({ connector })
				.then(async value => {
					console.log('handleConnect success', value);
					const { accounts, chainId } = value;

					// 用何種方式登入錢包也告訴後端
					await signInWithEthereum(accounts[0], chainId, connector.type, referral as string);
				})
				.catch(err => {
					console.log('handleConnect err', err);
					// 若未發現到 OKX Wallet
					if (err.message.includes('Provider not found') && connector.name === 'OKX Wallet') {
						window.open(`https://www.okx.com/`);
					}
					setErrorMsg(err.message);
				});
		},
		[connectAsync, signInWithEthereum, referral, setErrorMsg]
	);

	const renderOKXWalletButton = useMemo(() => {
		const okxConnector = connectors.find(value => value.id === 'com.okex.wallet');

		return (
			<Stack w={'100%'}>
				<Button
					isLoading={isSignInLoading}
					leftIcon={<Icon as={WalletConnectIcon} />}
					key={okxConnector?.name}
					fontSize={{ base: 14, sm: 14, md: 15, lg: 17 }}
					onClick={async () => {
						setErrorMsg('');

						if (okxConnector) {
							handleConnect(okxConnector);
						} else {
							window.open('https://www.okx.com');
						}
					}}
					w={'100%'}
					size="lg"
					_hover={{ bg: 'teal.600' }}
					bg={'teal.500'}
					color="#fff"
				>
					OKX Wallet
				</Button>
			</Stack>
		);
	}, [connectors, handleConnect, isSignInLoading]);

	// 第一階段 isLoading: connect 錢包中 不做偵測處理; 第二階段 isSignInLoading: 簽名中： 顯示 loading 狀態
	// 兩階段皆完成才會通過 Login 關閉視窗
	const ModalDom = useMemo(
		() => (
			<>
				<Modal
					size={isDesktop ? 'lg' : 'full'}
					isOpen={isOpen}
					onClose={() => {
						// 若使用者關閉視窗，重置相關設置
						setPopupGoogle(false); // 恢復 google 彈窗出現與否的值
						disconnect(); // 斷開錢包連接
						resetSignIn(); // 斷開當下簽名請求
						setErrorMsg('');
						onClose(); // 關閉視窗
					}}
				>
					<ModalOverlay zIndex={zIndexLoginModal} />
					<ModalContent
						containerProps={{
							zIndex: zIndexLoginModal,
						}}
						_focus={{ boxShadow: 'md' }}
						maxHeight="100vh"
						borderRadius={20}
						borderBottomRadius={isDesktop ? 20 : 0}
						p={'16px'}
					>
						<ModalHeader>
							<Stack direction={'row'} alignItems={'center'}>
								<Heading size="md" color="gray.700" mr={5}>
									{t('connect')}
								</Heading>
							</Stack>
						</ModalHeader>
						<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack>
								{isSignInLoading ? (
									<ScaleFade initialScale={0.9} in={true}>
										<Heading size={'md'} color={'gray.500'}>
											{t('please_sign_the_message')}
										</Heading>
									</ScaleFade>
								) : (
									<Button
										isLoading={isSignInLoading}
										onClick={() => {
											setErrorMsg('');
											setPopupGoogle(true);
										}}
										leftIcon={<Icon as={FcGoogle} />}
										w={'100%'}
										size="lg"
										bg={'#fff'}
										border="2px solid #E2E8F0;"
										color="black"
									>
										{t('sign_in_with_google')}
									</Button>
								)}

								<Box position="relative" pt={5} pb={5} pl={20} pr={20}>
									{errorMsg ? (
										<ScaleFade initialScale={0.9} in={true}>
											<Stack align={'center'} justify={'center'} direction={'row'}>
												<Icon as={WarningIcon} color={'red.500'} />
												<Text fontSize="xs" lineHeight="18px" color={'red.500'}>
													{errorMsg}
												</Text>
											</Stack>
										</ScaleFade>
									) : (
										<>
											<Divider color={'gray.500'} />
											<AbsoluteCenter color={'gray.500'} bg="white" px="4">
												{t('or')}
											</AbsoluteCenter>
										</>
									)}
								</Box>
								<Stack>
									<Stack w={'100%'}>
										<Button
											isLoading={isSignInLoading}
											leftIcon={<Icon as={MetaMaskIcon} />}
											key={connectors[0].name}
											fontSize={{ base: 14, sm: 14, md: 15, lg: 17 }}
											onClick={async () => {
												const agent = isWebsiteAgent();
												setErrorMsg('');
												if (agent === 'web') {
													handleConnect(connectors[0]);
												} else if (agent === 'Android') {
													triggerIntoMetaMaskAppWebView();
												} else if (agent === 'iPhone') {
													triggerIntoMetaMaskAppWebView();
												} else {
													// 手機端的 MetaMask APP 裡面的 WebView 狀況下
													handleConnect(connectors[0]);
												}
											}}
											w={'100%'}
											size="lg"
											_hover={{ bg: 'teal.600' }}
											bg={'teal.500'}
											color="#fff"
											// justifyContent={'start'}
										>
											{connectors[0].name}
										</Button>
									</Stack>
									{renderOKXWalletButton}
									<Stack w={'100%'}>
										<Button
											isLoading={isSignInLoading}
											leftIcon={<Icon as={WalletConnectIcon} />}
											key={connectors[1].name}
											fontSize={{ base: 14, sm: 14, md: 15, lg: 17 }}
											onClick={async () => {
												setErrorMsg('');

												handleConnect(connectors[1]);
											}}
											w={'100%'}
											size="lg"
											_hover={{ bg: 'teal.600' }}
											bg={'teal.500'}
											color="#fff"
											// justifyContent={'start'}
										>
											{connectors[1].name}
										</Button>
									</Stack>
								</Stack>
							</Stack>
						</ModalBody>

						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>

					{popupGoogle && !session ? (
						<NewWindow
							url="/googleSignInPage"
							onUnload={() => console.log('null')}
							onOpen={e => {
								const popupTick = setInterval(() => {
									if (e.closed) {
										// 監聽使用者若關閉新視窗，恢復能彈出視窗的狀態
										clearInterval(popupTick);
										setPopupGoogle(false);
									}
								}, 500);
							}}
						/>
					) : null}
				</Modal>
			</>
		),
		[
			isDesktop,
			isOpen,
			t,
			isSignInLoading,
			errorMsg,
			connectors,
			renderOKXWalletButton,
			popupGoogle,
			session,
			disconnect,
			resetSignIn,
			onClose,
			handleConnect,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useLoginModal;
