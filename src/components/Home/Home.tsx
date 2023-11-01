import React, { useEffect, useState } from 'react';
import { Stack, Button, useToast } from '@chakra-ui/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { getMarkets, AppDispatch } from '@/store';
import { useSiwe } from '@/hooks';
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
	const { open } = useWeb3Modal();
	const { status, isConnected, address } = useAccount();
	const { signInWithEthereum, connectWallet } = useSiwe();
	const [provider, setProvider] = useState<any>();
	const { disconnect } = useDisconnect();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		console.log('Home');
		dispatch(getMarkets());
	}, [dispatch]);

	return (
		<Stack backgroundColor="gray.50">
			<Stack mt={headerHeight}>
				<Button onClick={() => connectWallet()}>Connect Wallet</Button>
				<Button onClick={() => signInWithEthereum()}>signInWithEthereum</Button>
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
					onClick={() => (status === 'disconnected' ? open() : disconnect())}
					leftIcon={<Icon as={BiWalletAlt} />}
					w={'100%'}
					size="lg"
					bg={status === 'disconnected' ? 'teal.500' : 'red.500'}
					color="#fff"
				>
					{status === 'disconnected' ? 'Connect Wallet' : 'Disconnect'}
				</Button>
			</Stack>
		</Stack>
	);
}

export default Home;
