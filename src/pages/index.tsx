import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function Index() {
	const router = useRouter();

	useEffect(() => {
		router.push('/home');
	}, [router]);

	return <></>;
}

export default Index;
