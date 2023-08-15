import { ReactNode } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import '@/styles/globals.scss';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { NextComponentType } from 'next';

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
	Component,
	pageProps,
}: AppLayoutProps) => {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

	return (
		<>
			<ChakraProvider>
				<Head>
					<title>{`Poly`}</title>
					<meta name="description" content={`poly`} />
					<meta name="keywords" content="poly" />
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				{getLayout(<Component {...pageProps} />)}
			</ChakraProvider>
		</>
	);
};

export default App;
