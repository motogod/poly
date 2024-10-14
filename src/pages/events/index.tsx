import Events from '@/components/Events';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function events() {
	return (
		<>
			<Events />
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

export default events;
