import Portfolio from '@/components/Portfolio';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function portfolio() {
	return (
		<>
			<Portfolio />
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}

export default portfolio;
