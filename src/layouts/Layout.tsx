import { ReactNode } from 'react';
import Header from '@/layouts/components/common/Header';
import styles from './layout.module.scss';

type Props = {
	children: ReactNode;
};

function Layout({ children }: Props) {
	return (
		<>
			<div className={styles.wrapper}>
				<Header />
				<main className={styles.main}>{children}</main>
			</div>
		</>
	);
}

export default Layout;
