import Profile from '@/components/Profile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function profile() {
	return (
		<>
			<Profile />
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

export default profile;
