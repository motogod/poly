import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { store } from '@/store';
import { Provider } from 'react-redux';
// import Layout from '@/layouts/Layout';

import { ChakraProvider } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { extendTheme } from '@chakra-ui/react';

import '@/styles/globals.scss';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import Header from '@/layouts/components/common/Header';

// avoid ssr rendering, fix wagmi config server side Hydration error
const Layout = dynamic(() => import('@/layouts/Layout'), { ssr: false });

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, arbitrum],
	[publicProvider()]
);

const config = createConfig({
	autoConnect: false,
	connectors: [
		new MetaMaskConnector({ chains }),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: process.env.WALLET_CONNECT_PROJECT_ID,
				showQrModal: true,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});

// 1. Get projectId
// const projectId = process.env.WALLET_CONNECT_PROJECT_ID as string;

// 2. Create wagmiConfig
// const metadata = {
// 	name: 'Web3Modal',
// 	description: 'Web3Modal Example',
// 	url: 'https://web3modal.com',
// 	icons: ['https://avatars.githubusercontent.com/u/37784886'],
// };

// const chains = [mainnet, arbitrum];
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
// createWeb3Modal({ wagmiConfig, projectId: '88df17cf1fa66c336efceb21027d647f', chains });

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
	Component,
	pageProps,
}: AppLayoutProps) => {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

	const fonts = {
		heading: `'Open Sans', sans-serif`,
		body: `'Raleway', sans-serif`,
	};

	// 2. Update the breakpoints as key-value pairs
	const breakpoints = {
		base: '0px',
		sm: '320px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
		'2xl': '1536px',
	};

	// 3. Extend the theme
	const theme = extendTheme({ breakpoints, fonts });

	return (
		<>
			<Provider store={store}>
				<WagmiConfig config={config}>
					<ChakraProvider theme={theme}>
						<Head>
							<title>{`Poly`}</title>
							<meta name="description" content={`poly`} />
							<meta name="keywords" content="poly" />
							<meta name="viewport" content="initial-scale=1, width=device-width" />
						</Head>
						{/* <Header /> */}
						{getLayout(<Component {...pageProps} />)}
					</ChakraProvider>
				</WagmiConfig>
			</Provider>
		</>
	);
};

export default App;
