import Markets from '@/components/Markets';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function markets() {
	return (
		<>
			<Markets />
		</>
	);
}

export async function getStaticProps({ locale }: { locale: string }) {
	console.log('getStaticProps from Markets');
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	};
}

export default markets;
