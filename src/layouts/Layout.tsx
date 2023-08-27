import { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';
import Header from '@/layouts/components/common/Header';
import styles from './layout.module.scss';

type Props = {
	children: ReactNode;
};

function Layout({ children }: Props) {
	return (
		<>
			<Stack>
				<Header />
				<main className={styles.main}>{children}</main>
			</Stack>
		</>
	);
}

export default Layout;
