import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
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
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { useConnect, useDisconnect, useAccount, useSwitchNetwork, useNetwork } from 'wagmi';
import { useSDK } from '@metamask/sdk-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginWithGoogle, RootState } from '@/store';
import { useSiwe } from '@/hooks';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';
import { zIndexLoginModal } from '@/utils/zIndex';

type AgentType = 'WebView' | 'iPhone' | 'Android' | 'web';

let hasDispatch = false;

function useLoginModal() {
	const [popupGoogle, setPopupGoogle] = useState<boolean | null>(null);
	const [errorMsg, setErrorMsg] = useState('');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { disconnect } = useDisconnect();
	const { chain } = useNetwork();
	const { switchNetwork } = useSwitchNetwork();

	const { signInWithEthereum, isLoading: isSignInLoading, reset: resetSignIn } = useSiwe();

	const { data: session, status: sessionStatus } = useSession();

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	// callback onSuccess 登入成功時，簽名
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
		async onSuccess(data, variables, context) {
			const { account, chain } = data;
			// pendingConnector 用何種方式登入錢包也告訴後端
			await signInWithEthereum(account, chain.id, pendingConnector?.id as string);

			// 切換 chainId 到 Arbitrum, 若尚未 connect 成功 switchNetwork 會是 undefined
			// WalletConnect 會自動切換到設置的第一個 chainId，多插入一個切換會有 pending 的 bug
			// 所以只有連接 MetaMask 才執行手動切換
			if (variables.connector.id === 'metaMask') {
				// Arbitrum Sepolia or Arbitrum
				// process.env.NODE_ENV === 'development' ? switchNetwork?.(421614) : switchNetwork?.(42161);
			}
		},
		onError(error, variables, context) {
			// console.log('error', { error, variables, context });
			// 觸發 MetaMask 時，登入視窗出現 未填密碼直接關閉，再次觸發 MetaMask 時的 error 處理
			if (variables.connector.id === 'metaMask') {
				// setErrorMsg('An unexpected error occurred.');
				setErrorMsg(error.message);
			}
		},
	});

	// const { sdk, connected, connecting, provider, chainId, account: metaAccount } = useSDK();

	// 確保登入視窗打開時，清除 connect 的狀態，避免 ConnectorAlreadyConnectedError
	useEffect(() => {
		if (isOpen) {
			disconnect();
		}
	}, [disconnect, isOpen]);

	useEffect(() => {
		// Google 新視窗登入成功時，關閉原本的登入 Modal
		console.log('sessionStatus', sessionStatus);
		console.log('session', session);
		if (sessionStatus === 'authenticated' && session) {
			if (setPopupGoogle && isOpen) {
				const { idToken } = session as any;
				dispatch(loginWithGoogle({ idToken }));
				hasDispatch = true;
				setPopupGoogle(false);
				onClose();
			}
		}
	}, [sessionStatus, onClose, session, dispatch, isOpen]);

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
							<Heading size="md" color="gray.700" mr={5}>
								Connect
							</Heading>
						</ModalHeader>
						<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack>
								{isSignInLoading ? (
									<ScaleFade initialScale={0.9} in={true}>
										<Heading size={'md'} color={'gray.500'}>
											Please sign the message in your compatible wallet to connect to market.
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
										Sign in with Google
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
												OR
											</AbsoluteCenter>
										</>
									)}
								</Box>
								<Stack direction={'row'}>
									{connectors.map(connector => (
										<>
											<Button
												isLoading={isSignInLoading}
												leftIcon={
													<Icon
														as={connector.id === 'metaMask' ? MetaMaskIcon : WalletConnectIcon}
													/>
												}
												key={connector.id}
												fontSize={{ base: 14, sm: 14, md: 15, lg: 17 }}
												onClick={() => {
													const agent = isWebsiteAgent();
													setErrorMsg('');
													if (agent === 'web') {
														// 網頁端可先判斷是否有 MetaMask
														if (!connector.ready && connector.id === 'metaMask') {
															window.open('https://metamask.io/download/', '_blank');
														} else {
															connect({ connector });
														}
													} else if (agent === 'Android') {
														if (connector.id === 'metaMask') {
															triggerIntoMetaMaskAppWebView();
														} else {
															connect({ connector });
														}
													} else if (agent === 'iPhone') {
														if (connector.id === 'metaMask') {
															triggerIntoMetaMaskAppWebView();
														} else {
															connect({ connector });
														}
													} else {
														// 手機端的 MetaMask APP 裡面的 WebView 狀況下
														connect({ connector });
													}
												}}
												w={'100%'}
												size="lg"
												bg={'teal.500'}
												color="#fff"
												// justifyContent={'start'}
											>
												{connector.name}
												{/* {isLoading && connector.id === pendingConnector?.id && ' (connecting)'} */}
											</Button>
										</>
									))}
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
			isOpen,
			onClose,
			connect,
			connectors,
			isDesktop,
			popupGoogle,
			session,
			isSignInLoading,
			disconnect,
			resetSignIn,
			errorMsg,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useLoginModal;
