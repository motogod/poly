import Policy from '@/components/Home/Policy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function policy() {
	return (
		<>
			<Policy />
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

export default policy;
