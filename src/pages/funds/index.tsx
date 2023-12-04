import Funds from '@/components/Funds';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function funds() {
	return (
		<>
			<Funds />
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

export default funds;
