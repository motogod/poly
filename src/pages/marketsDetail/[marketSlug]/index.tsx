import MraketsDetail from '@/components/MraketsDetail';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function marketsDetail() {
	return (
		<>
			<MraketsDetail />
		</>
	);
}

// export async function getServerSideProps({ locale }: { locale: string }) {
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, ['common'])),
// 		},
// 	};
// }

export default marketsDetail;
