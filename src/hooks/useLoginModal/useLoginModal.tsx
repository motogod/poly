import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NewWindow from 'react-new-window';
import {
	Stack,
	Button,
	Heading,
	useToast,
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
	Input,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginWithGoogle, RootState } from '@/store';
import { useSiwe } from '@/hooks';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';

type AgentType = 'iPhone' | 'Android' | 'web';

let hasDispatch = false;

function useLoginModal() {
	const [popupGoogle, setPopupGoogle] = useState<boolean | null>(null);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { signInWithEthereum } = useSiwe();

	const toast = useToast();

	const { data: session, status: sessionStatus } = useSession();

	const dispatch = useDispatch<AppDispatch>();

	const { isAuthenticated, checkAuthSuccess } = useSelector(
		(state: RootState) => state.authReducer
	);

	// callback onSuccess 登入成功時，簽名
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
		onSuccess(data, variables, context) {
			const { account, chain } = data;
			signInWithEthereum(account, chain.id);
		},
	});

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

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	// 若是網頁開啟，使用者未安裝 MetaMask 引導至 MetaMask 官網
	const isWebsiteAgent = (): AgentType => {
		if (navigator.userAgent.includes('iPhone')) {
			return 'iPhone';
		}

		if (navigator.userAgent.includes('Android')) {
			return 'Android';
		}

		return 'web';
	};

	const ModalDom = useMemo(
		() => (
			<>
				<Modal
					size={isDesktop ? 'lg' : 'full'}
					isOpen={isOpen}
					onClose={() => {
						setPopupGoogle(false);
						onClose();
					}}
				>
					<ModalOverlay />
					<ModalContent
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
								<Button
									onClick={() => setPopupGoogle(true)}
									leftIcon={<Icon as={FcGoogle} />}
									w={'100%'}
									size="lg"
									bg={'#fff'}
									border="2px solid #E2E8F0;"
									color="black"
								>
									Sign in with Google
								</Button>
								<Box position="relative" pt={5} pb={5} pl={20} pr={20}>
									<Divider color={'gray.500'} />
									<AbsoluteCenter color={'gray.500'} bg="white" px="4">
										OR
									</AbsoluteCenter>
								</Box>
								<Stack direction={'row'}>
									{connectors.map(connector => (
										<Button
											isLoading={isLoading}
											leftIcon={
												<Icon as={connector.id === 'metaMask' ? MetaMaskIcon : WalletConnectIcon} />
											}
											key={connector.id}
											fontSize={{ base: 14, sm: 14, md: 15, lg: 17 }}
											onClick={() => {
												onClose();
												const agent = isWebsiteAgent();
												if (agent === 'web') {
													// 網頁端可先判斷是否有 MetaMask
													if (!connector.ready && connector.id === 'metaMask') {
														window.open('https://metamask.io/', '_blank');
													} else {
														console.log('Check');
														connect({ connector });
													}
												} else if (agent === 'Android') {
													// Android 若關閉錢包彈出視窗會有當下畫面錢包值卡住的問題，workaround 導出至其他頁面
													// window.open(`https://metamask.app.link/dapp/${window.location.origin}`);
													connect({ connector });
												} else {
													// iOS 則直接連結
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
											{isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
										</Button>
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
			isLoading,
			pendingConnector,
			isDesktop,
			popupGoogle,
			session,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useLoginModal;
