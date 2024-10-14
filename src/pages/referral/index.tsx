import Referral from '@/components/Referral';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function referral() {
	return (
		<>
			<Referral />
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

export default referral;
