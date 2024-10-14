import RewardTasks from '@/components/RewardTasks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function rewardTasks() {
	return (
		<>
			<RewardTasks />
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

export default rewardTasks;
