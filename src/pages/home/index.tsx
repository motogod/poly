import Home from '@/components/Home';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function home() {
	return (
		<>
			<Home homePage={true} />
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	};
}

export default home;
