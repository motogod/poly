import OxPoints from '@/components/OxPoints';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function oxPoints() {
	return (
		<>
			<OxPoints />
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

export default oxPoints;
