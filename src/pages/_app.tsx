import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
// import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { arbitrum, mainnet, arbitrumGoerli, arbitrumSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// need to be install for mobile device detect MetaMask APP
import { MetaMaskProvider } from '@metamask/sdk-react';
import { setLanguageHeader } from '@/api/request';
import { i18n } from 'next-i18next';
// import { InjectedConnector } from 'wagmi/connectors/injected';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@/contex/AuthContext';
import ToastProvider from '@/contex/ToastContext';
import IpProvider from '@/contex/IpContext';

// for react-datepicker css
import 'react-datepicker/dist/react-datepicker.css';

import { store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, showToast, getCategories } from '@/store';
import { Provider } from 'react-redux';
// import Layout from '@/layouts/Layout';

import { ChakraProvider } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { extendTheme } from '@chakra-ui/react';

import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import '@/styles/globals.scss';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import Header from '@/layouts/components/common/Header';
import { LocalesType } from '../../public/locales/type';

// avoid ssr rendering, fix wagmi config server side Hydration error
const Layout = dynamic(() => import('@/layouts/Layout'), { ssr: false });

const chainsArray =
	process.env.NODE_ENV === 'development'
		? [arbitrumSepolia, arbitrum, mainnet]
		: [arbitrumSepolia, arbitrum, mainnet];

const { chains, publicClient, webSocketPublicClient } = configureChains(
	chainsArray, // Array index 第一個為主要的 chain WalletConnect 會要求切換至這一個
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
console.log('getServerSideProps index app.tsx');
const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
	Component,
	pageProps: { session, ...pageProps },
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

	if (process.env.NODE_ENV !== 'development') {
		console.log = function () {};
	}

	setLanguageHeader(i18n?.language as LocalesType);

	return (
		<>
			<Provider store={store}>
				<SessionProvider session={session}>
					{/* <MetaMaskProvider
						debug={false}
						sdkOptions={{
							checkInstallationImmediately: false,
							dappMetadata: {
								name: 'Demo React App',
								url: typeof window !== 'undefined' ? window.location.host : '',
							},
						}}
					> */}
					<WagmiConfig config={config}>
						<ChakraProvider theme={theme}>
							<Head>
								<title>{`ox.market`}</title>
								<meta name="description" content={`ox.market`} />
								<meta name="keywords" content="ox.market" />
								<meta name="viewport" content="initial-scale=1, width=device-width" />
							</Head>
							{/* <Header /> */}
							<AuthProvider>
								<ToastProvider>
									<IpProvider>{getLayout(<Component {...pageProps} />)}</IpProvider>
								</ToastProvider>
							</AuthProvider>
						</ChakraProvider>
					</WagmiConfig>
					{/* </MetaMaskProvider> */}
				</SessionProvider>
			</Provider>
		</>
	);
};

export default appWithTranslation(App);
