import { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';
import Header from '@/layouts/components/common/Header';
import Footer from '@/layouts/components/common/Footer';
import styles from './layout.module.scss';

type Props = {
	children: ReactNode;
	homePage: boolean;
};

function Layout({ children, homePage }: Props) {
	return (
		<>
			<Stack>
				<Header />
				<main className={styles.main}>{children}</main>
				{window.location.pathname.includes('home') && <Footer />}
			</Stack>
		</>
	);
}

export default Layout;
