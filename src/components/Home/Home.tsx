import React, { useEffect, useState } from 'react';
import { Stack, Button, useToast, Input } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect, useConnect, useEnsName, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useSession } from 'next-auth/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getMarkets, AppDispatch, RootState } from '@/store';
import { useSiwe, useLoginModal, useLogout } from '@/hooks';
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
	const { address, status } = useAccount();
	const { signInWithEthereum, connectWallet } = useSiwe();
	console.log('status', status);
	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	const { chain } = useNetwork();

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	const { disconnect } = useDisconnect();
	const { logout } = useLogout();
	const { data: session, status: sessionStatus } = useSession();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(getMarkets());
	}, [dispatch]);

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
			{!isAuthenticated || status !== 'connected' ? (
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
		</Stack>
	);
}

export default Home;
