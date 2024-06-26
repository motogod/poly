import { useRouter } from 'next/router';

function useLink() {
	const router = useRouter();

	const link = () => {
		// en zh-Hans vi
		const language = router.locale;

		if (language === 'zh-Hans') {
			return {
				rewardsLink: 'https://oxmarket.gitbook.io/how-it-works-cn/huo-dong/jiang-li',
				howItWorksLink: 'https://oxmarket.gitbook.io/how-it-works-cn',
				earnItLink: 'https://oxmarket.gitbook.io/how-it-works-cn/huo-dong/shi-jian',
				learnMoreLink: 'https://oxmarket.gitbook.io/how-it-works-cn',
				privacyPolicyLink: 'https://oxmarket.gitbook.io/how-it-works-cn/faq/privacy_policy',
				termOfUseLink: 'https://oxmarket.gitbook.io/how-it-works-cn/faq/shi-yong-tiao-kuan',
				depositUSDTLink:
					'https://oxmarket.gitbook.io/how-it-works-cn/deposit-methods/cong-bi-an-chong-zhi',
			};
		}

		if (language === 'vi') {
			return {
				rewardsLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/campaign/phan-thuong',
				howItWorksLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/',
				earnItLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/campaign/kiem-tra',
				learnMoreLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/',
				privacyPolicyLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/faq/privacy_policy',
				termOfUseLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/faq/dieu-khoan-su-dung',
				depositUSDTLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/deposit-methods/nap-tien-tu-binance',
			};
		}

		return {
			rewardsLink: 'https://oxmarket.gitbook.io/howitworks/campaign/rewards',
			howItWorksLink: 'https://oxmarket.gitbook.io/howitworks',
			earnItLink: 'https://oxmarket.gitbook.io/howitworks/campaign/event',
			learnMoreLink: 'https://oxmarket.gitbook.io/howitworks',
			privacyPolicyLink: 'https://oxmarket.gitbook.io/howitworks/faq/privacy_policy',
			termOfUseLink: 'https://oxmarket.gitbook.io/howitworks/faq/terms-of-use',
			depositUSDTLink:
				'https://oxmarket.gitbook.io/howitworks/welcome-to-oxmarket/how-to-deposit/deposit-from-binance',
		};
	};

	return { link };
}

export default useLink;
