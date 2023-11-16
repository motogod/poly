import React, { useEffect, useState } from 'react';
import { Stack, Button, useToast, Input } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
	useAccount,
	useDisconnect,
	useConnect,
	useEnsName,
	useNetwork,
	useSignMessage,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useSession } from 'next-auth/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getMarkets, AppDispatch, RootState } from '@/store';
import { useSiwe, useLoginModal, useLogout, useLoadingConnectModal, useUtility } from '@/hooks';
import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import HowItWorkSection from './HowItWorkSection';
import { headerHeight } from '../../utils/screen';
import styles from './home.module.scss';

interface loginTypes {
	auth: Array<string>;
	userInfo: {
		account: string;
		username: string;
	};
	token: string;
}

function Home() {
	// const { open } = useWeb3Modal();
	const { address, status, isConnected, isConnecting } = useAccount();
	const { signInWithEthereum } = useSiwe();
	const { isWebsiteAgent } = useUtility();
	console.log('status', status);
	const { isAuthenticated, user } = useSelector((state: RootState) => state.authReducer);
	const { markets } = useSelector((state: RootState) => state.homeReducer);
	const { chain } = useNetwork();

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
		isSignMsgSuccess,
		resetIsSignMsgSuccess,
		connectorId,
	} = useLoginModal();

	const {
		ModalDom: LoadingConnectDom,
		isOpen: loadingConnectIsOpen,
		onOpen: loadingConnectOnOpen,
		onClose: loadingConnectOnClose,
	} = useLoadingConnectModal();

	const { disconnect } = useDisconnect();
	const { logout } = useLogout();
	const { data: session, status: sessionStatus } = useSession();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMarkets());
	}, [dispatch]);

	useEffect(() => {
		console.log('Check sign =>', { status, isSignMsgSuccess, address, chain });
		const agent = isWebsiteAgent();
		// 手機端 且點擊 Wallet Connect 的狀態下才要擋讀取畫面，提醒使用者再去簽名
		if (agent === 'web' && connectorId === 'walletConnect') {
			if (status === 'connecting') {
				loadingConnectOnOpen();
			} else if (status === 'connected' && isSignMsgSuccess) {
				loadingConnectOnClose();
				resetIsSignMsgSuccess();
			} else if (status === 'disconnected') {
				loadingConnectOnClose();
				resetIsSignMsgSuccess();
			}
		}
	}, [
		status,
		loadingConnectOnOpen,
		loadingConnectOnClose,
		isSignMsgSuccess,
		resetIsSignMsgSuccess,
		disconnect,
		isWebsiteAgent,
		connectorId,
		address,
		chain,
	]);

	return (
		<Stack backgroundColor="gray.50">
			<Stack mt={headerHeight}>
				<Stack>
					<TopTopicSection />
				</Stack>
				<Stack>
					<CategorySection />
				</Stack>
			</Stack>
			<Stack>
				<HowItWorkSection />
			</Stack>
			{!isAuthenticated ? (
				<Stack
					display={{ lg: 'none', md: 'inline', sm: 'inline' }}
					w={'100%'}
					flexDirection="row"
					position="fixed"
					bottom={0}
					zIndex={5}
					pl={6}
					pr={6}
					pt={4}
					pb={4}
					bg={'#FFFFFF'}
					borderColor={'black'}
					borderTop="1px solid #E2E8F0;"
				>
					<Button
						isLoading={status === 'connecting'}
						onClick={() => (status === 'disconnected' || 'connecting' ? modalOnOpen() : logout())}
						leftIcon={<Icon as={BiWalletAlt} />}
						w={'100%'}
						size="lg"
						bg={status === 'disconnected' || 'connecting' ? 'teal.500' : 'red.500'}
						color="#fff"
					>
						{status === 'disconnected' || 'connecting' ? 'Connect Wallet' : 'isconnect'}
					</Button>
				</Stack>
			) : null}

			{modalIsOpen && ModalDom}
			{loadingConnectIsOpen && LoadingConnectDom}
		</Stack>
	);
}

export default Home;
