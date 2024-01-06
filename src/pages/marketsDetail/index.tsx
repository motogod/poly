import MraketsDetail from '@/components/MraketsDetail';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function marketsDetail() {
	return (
		<>
			<MraketsDetail />
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

// 如果使用 dynamic route 像是 marketsDetail/slug 必須得用 getServerSideProps i18n 才有效
// 但部署在 vercel 實際 server 會有第一次導入頁面比較慢的問題
// export async function getServerSideProps({ locale }: { locale: string }) {
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, ['common'])),
// 		},
// 	};
// }

export default marketsDetail;
