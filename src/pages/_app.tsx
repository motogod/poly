import { ReactNode } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { extendTheme } from '@chakra-ui/react';
import '@/styles/globals.scss';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';
import Header from '@/layouts/components/common/Header';

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
		</>
	);
};

export default App;
