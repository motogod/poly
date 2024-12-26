import { useRouter } from 'next/router';

function useLink() {
	const router = useRouter();

	const link = () => {
		// en zh-Hans vi th
		const language = router.locale;

		if (language === 'zh-Hans') {
			return {
				rewardsLink: 'https://oxmarket.gitbook.io/how-it-works-cn/huo-dong/jiang-li',
				howItWorksLink: 'https://oxmarket.gitbook.io/how-it-works-cn/rewards/campaign',
				earnItLink: 'https://oxmarket.gitbook.io/how-it-works-cn/huo-dong/shi-jian',
				learnMoreLink: 'https://oxmarket.gitbook.io/how-it-works-cn',
				privacyPolicyLink: 'https://oxmarket.gitbook.io/how-it-works-cn/faq/privacy_policy',
				termOfUseLink: 'https://oxmarket.gitbook.io/how-it-works-cn/faq/shi-yong-tiao-kuan',
				depositUSDTLink:
					'https://oxmarket.gitbook.io/how-it-works-cn/deposit-methods/cong-bi-an-chong-zhi',
				oxPointsLearnMoreLine: 'https://oxmarket.gitbook.io/how-it-works-cn/rewards/ox-points',
				twitterChannel: 'https://x.com/OX_Market_CN',
				howItWorksMetaMaskLink:
					'https://oxmarket.gitbook.io/how-it-works-cn/login-problem/metamask',
			};
		}
		// 越南文
		if (language === 'vi') {
			return {
				rewardsLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/campaign/phan-thuong',
				howItWorksLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/',
				earnItLink: 'https://oxmarket.gitbook.io/how-it-works-vn/rewards/campaign',
				learnMoreLink: 'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/',
				privacyPolicyLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/faq/privacy_policy',
				termOfUseLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/faq/dieu-khoan-su-dung',
				depositUSDTLink:
					'https://oxmarket.gitbook.io/chao-mung-den-voi-oxmarket/deposit-methods/nap-tien-tu-binance',
				oxPointsLearnMoreLine: 'https://oxmarket.gitbook.io/how-it-works-vn/rewards/ox-points',
				twitterChannel: 'https://x.com/OX__Market',
				howItWorksMetaMaskLink:
					'https://oxmarket.gitbook.io/how-it-works-vn/login-problem/metamask',
			};
		}
		// 泰文
		if (language === 'th') {
			return {
				rewardsLink: 'https://oxmarket.gitbook.io/howitworks/campaign/rewards',
				howItWorksLink: 'https://oxmarket.gitbook.io/howitworks',
				earnItLink: 'https://oxmarket.gitbook.io/howitworks/rewards/campaign',
				learnMoreLink: 'https://oxmarket.gitbook.io/howitworks',
				privacyPolicyLink: 'https://oxmarket.gitbook.io/howitworks/faq/privacy_policy',
				termOfUseLink: 'https://oxmarket.gitbook.io/howitworks/faq/terms-of-use',
				depositUSDTLink:
					'https://oxmarket.gitbook.io/howitworks/welcome-to-oxmarket/how-to-deposit/deposit-from-binance',
				oxPointsLearnMoreLine: 'https://oxmarket.gitbook.io/howitworks/ox-points/learn-more',
				twitterChannel: 'https://x.com/OX__Market',
				howItWorksMetaMaskLink: 'https://oxmarket.gitbook.io/howitworks/login-problem/metamask',
			};
		}
		// 英文
		return {
			rewardsLink: 'https://oxmarket.gitbook.io/howitworks/campaign/rewards',
			howItWorksLink: 'https://oxmarket.gitbook.io/howitworks',
			earnItLink: 'https://oxmarket.gitbook.io/howitworks/rewards/campaign',
			learnMoreLink: 'https://oxmarket.gitbook.io/howitworks',
			privacyPolicyLink: 'https://oxmarket.gitbook.io/howitworks/faq/privacy_policy',
			termOfUseLink: 'https://oxmarket.gitbook.io/howitworks/faq/terms-of-use',
			depositUSDTLink:
				'https://oxmarket.gitbook.io/howitworks/welcome-to-oxmarket/how-to-deposit/deposit-from-binance',
			oxPointsLearnMoreLine: 'https://oxmarket.gitbook.io/howitworks/ox-points/learn-more',
			twitterChannel: 'https://x.com/OX__Market',
			howItWorksMetaMaskLink: 'https://oxmarket.gitbook.io/howitworks/login-problem/metamask',
		};
	};

	return { link };
}

export default useLink;
