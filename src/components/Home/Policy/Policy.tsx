import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import {
	Stack,
	Text,
	Tabs,
	TabList,
	Tab,
	Heading,
	TabPanels,
	TabPanel,
	Link,
} from '@chakra-ui/react';
import { headerHeight, paddingMainHorizontal } from '@/utils/screen';
import { useTranslation } from 'next-i18next';

const Privacy = () => {
	const { t } = useTranslation();

	const router = useRouter();

	const [tabIndex, setTabIndex] = useState(0);

	const handleTabsChange = (index: number) => {
		setTabIndex(index);
	};

	useEffect(() => {
		// 定义一个处理哈希值变化的函数
		if (router.isReady) {
			const handleHashChange = () => {
				if (window.location.hash === '#~a') {
					handleTabsChange(0);
				}

				if (window.location.hash === '#~b') {
					handleTabsChange(1);
				}
			};

			handleHashChange();

			window.addEventListener('hashchange', handleHashChange);

			return () => {
				window.removeEventListener('hashchange', handleHashChange);
			};
		}
	}, [router.asPath, router.isReady]);

	return (
		<Stack mt={headerHeight} pl={paddingMainHorizontal} pr={paddingMainHorizontal}>
			<Tabs mt={'28px'} index={tabIndex} onChange={handleTabsChange}>
				<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
					<Tab
						_hover={{ color: 'gray.600' }}
						onClick={() => router.push({ pathname: '/home/policy', hash: '~a' })}
						fontSize={'16px'}
						color={'gray.800'}
						fontWeight={'500'}
						lineHeight={'24px'}
					>
						{t('privacy_policy')}
					</Tab>
					<Tab
						_hover={{ color: 'blue.600' }}
						onClick={() => router.push({ pathname: '/home/policy', hash: '~b' })}
						fontSize={'16px'}
						color={'gray.800'}
						fontWeight={'500'}
						lineHeight={'24px'}
					>
						{t('term_of_use')}
					</Tab>
				</TabList>
				{/* <TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" /> */}
				<TabPanels>
					<TabPanel>
						<Heading size={'md'} color={'gray.800'}>
							Introduction
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							This website-hosted user interface (this “Interface”) is made available by Adventure
							One QSS Inc., a corporation organized and existing under the laws of Panama (the
							“Company” “us” “we” or “our”)).
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`This Privacy Policy (the “Policy”) governs the manner in which we make the Interface
							available and how we collect, use, maintain and disclose information collected from
							our users (each, a "user", “you”, or “your”) through the Company’s websites, including
							the Interface, web applications mobile applications and all associated sites linked
							thereto by the Interface, or by us or our affiliates (the “Site”).This Policy further
							applies to all information we collect through our Site and otherwise obtain in
							connection with products and Services, content, features, technologies, functions and
							all related websites we may provide to you or to which we may provide access
							(collectively with the Site, the “Services”).`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Please read this Policy carefully. We are committed to protecting your privacy through
							our compliance with the terms of this Policy.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We understand that you may have questions regarding this Policy, including your
							personal information, how it may be collected, and how it may be used. You may e-mail
							us at support@ox.market with any concerns or privacy-related questions that you may
							have.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Our Terms of Services (“Terms”) govern all use of our Services and, together with the
							Privacy Policy, constitute your agreement with us (the “Agreement”). If you do not
							agree with the terms of this Policy, please do not access our Site.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							By accessing or using our Services, you agree to the terms of this Policy.
							Specifically, by (i) using, visiting, or accessing the Services, (ii) using,
							accessing, establishing an account through or purchasing any of the Services, and/or
							(iii) clicking “accept”, “agree”, or “OK” (or a similar term) with respect to any of
							our Terms or similar policies, you consent and agree to be legally bound by each of
							the terms and conditions contained in this Policy.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							In operating the Site and provide the Services we may collect (and/or receive) certain
							information about you and your activities. You hereby authorize us to collect and/or
							receive such information to operate the Site and provide the Services.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Applicability
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`This Policy applies to all information we collect from you in connection with the Site
							and offering the Services. This Policy does not apply to information collected by us
							offline or through any other means, including on any other website made available by
							us or by any third party (including our affiliates and subsidiaries). Throughout this
							Policy, we use the term "personal information" to describe information that can be
							associated with a specific person and can be used to identify that person. We do not
							consider personal information to include information that has been aggregated and/or
							anonymized so that it does not identify a specific user. Personal Information may also
							include the personal information of third parties that may be contained in information
							you provide to us through your use of the Site.`}
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Information Collection and Use
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							When you visit the Site and use the Services, we collect your IP address and standard
							web log information, such as your browser type and pages you accessed on our Site. We
							may also collect certain geolocation Information (as defined below). If you do not
							agree to our collection of this information, you may not be able to use the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We collect information:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Directly from you when you provide it to us; Automatically as you navigate through the
							site. Information collected automatically may include usage details, IP addresses, and
							information collected through Cookies and other tracking technologies; and
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If you create an account with us, we may collect the following information from you:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Personal Information. Information by which you may be personally identified, such as
							your name, postal address, registration at place of residence, e-mail address,
							telephone number, date of birth, and other demographic information, such as your age,
							gender, hometown, and interests that you voluntarily provide to us as part of your
							registration with the Site to use our Service (collectively, “Personal Information”).
							There is no obligation for you to provide us with personal information of any kind,
							but your refusal to do so may prevent you from using the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Derivative Information. Information our servers may collect automatically when you
							access the Site, such as your IP address, browser type, operating system, access
							times, and pages you viewed directly before and after accessing the Site. This may
							also include other information about your internet connection and the equipment you
							use to access our Site, and usage details.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`We are committed to providing a safe and secure customer experience. As a result,
							before permitting you to use the Services, we may require additional information from
							you (including for instance government-issued identity documents such as passport
							number, driver's license details or national identity card details) that we can use to
							verify your identity, address or other information, prevent fraud or to manage risk
							and compliance throughout our relationship.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Finally, we may collect additional information from or about you in other ways not
							specifically described here. For example, we may collect information related to your
							contact with our customer support team.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Children Under the Age of 18
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Our Site is not intended for children under 18 years of age. No one under age 18 may
							provide any personal information to or on the Site. If we obtain actual knowledge that
							we have collected personal information from a person under the age of 18, we will
							promptly delete it, unless we are legally obligated to retain such data. If you
							believe we may have mistakenly or unintentionally collected any information from or
							about a person under 18, please contact us using the contact information provided
							below.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Use of Cookies and Other Tracking Technologies
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`A cookie is a small file placed on the hard drive of your computer. When you visit our
							Site, use our Services, we and certain business partners and vendors may use cookies
							and other tracking technologies (collectively, "Cookies"). We use Cookies to recognize
							you as a customer, to customize the Services, other content and advertising, to
							measure the effectiveness of our promotions, to perform a wide range of analytics, to
							mitigate risk and prevent potential fraud, and to promote trust and safety across our
							Services.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Most browsers are set to accept cookies by default. You can remove or reject cookies.
							However, certain Services in the Services are only available through the use of
							Cookies. Therefore, if you choose to disable or decline Cookies, your use of the
							Services and other Services may be limited or not possible.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Pages of our Site may contain small electronic files known as web beacons (also
							referred to as clear gifs, pixel tags, and single-pixel gifs) that permit us, for
							example, to count users who have visited those pages and for other related website
							statistics (for example, recording the popularity of certain website content and
							verifying system and server integrity). You may not decline web beacons. However, they
							can be rendered ineffective by declining all cookies or by modifying your web
							browser’s settings to notify you each time a cookie is tendered, permitting you to
							accept or decline cookies on an individual basis.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Do Not Track: Do Not Track (“DNT”) is an optional browser setting that allows you to
							express your preferences regarding tracking by advertisers and other third-parties.
							You can enable or disable DNT by visiting the preferences or settings page of your web
							browser. We do not respond to DNT signals.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Use of Your Information
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Having accurate information about you permits us to provide you with a smooth,
							efficient, and customized experience. Specifically, we may use information collected
							about you via the Site to:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Administer sweepstakes, promotions, and contests;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Compare information for accuracy and verify it with third parties;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Compile anonymous statistical data and analysis for our use internally or with third
							parties;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Contact you regarding your account with us, use of the Site and Services, and
							questions regarding the Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Create and manage your account, including a personal profile about you to make future
							visits to our Site and your use more personalized;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Customize, personalize, measure, and improve our Services and the content and layout
							of our Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Deliver the Services and provide customer support to you;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Enable user-to-user communications;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Enhance the efficiency and operation of the Site and the Services we deliver to you
							for our legitimate interests including for the following purposes:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Detecting security incidents, protecting against malicious, deceptive, fraudulent or
							illegal activity, and prosecuting those responsible for that activity;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Measuring interest and engagement in our Services and short-term, transient use, such
							as contextual customization of ads;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Undertaking research for technological development and demonstration;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Researching and developing products, Services, marketing or security procedures to
							improve their performance, resilience, reliability or efficiency;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Improving, upgrading or enhancing our Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Developing new products and Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Ensuring internal quality control;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Verifying your identity and preventing fraud;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Debugging to identify and repair errors that impair existing intended functionality;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Enforcing our terms and policies; and
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Complying with our legal obligations, protecting your vital interest, or as may be
							required for the public good.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							As noted above, we may use information we collect about you to fulfill any other
							purpose for which you may provide us with your information. We may also use the
							information we have collected from you to enable us to display advertisements to our
							advertisers’ target audiences. Even though we do not disclose your personal
							information for these purposes without your consent, if you click on or otherwise
							interact with an advertisement, the advertiser may assume that you meet its target
							criteria.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Without limiting the foregoing, you also authorize us to use and/or share information
							as described below:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may, from time to time, share your information with other companies, who may
							provide you information about the products and Services they or their partners offer.
							You may be entitled to prevent us from sharing and/or licensing your personal
							information to other companies under applicable law. If you wish to exercise this
							right, please send an e-mail to support@ox.market with the subject line, “Privacy
							Policy.” We reserve the right to ask for information verifying your identity before we
							begin complying with your request.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We will access, use, and share your information as required to fulfill our contractual
							obligations to you, provide you with support, and to address your questions or
							requests regarding our Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may employ other companies and individuals to perform functions on our behalf.
							Examples may include providing technical, customer Services and marketing assistance.
							In particular, our uses a third-party cloud hosting provider to store user information
							and configurations;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							In an ongoing effort to better understand our customers and our Services, we may
							analyze your information in anonymized and/or aggregate form in order to operate,
							maintain, manage, and improve the Services. This anonymous information does not
							identify you personally. We may use this anonymous information and share it with our
							affiliates, agents, business and promotional partners, and other third parties. We may
							also disclose anonymous user statistics in order to describe our Services and business
							to current and prospective business partners and to other third parties for other
							lawful purposes.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may share some or all of your information with any of our parent companies,
							affiliates, subsidiaries, joint ventures, or other companies under common control with
							us;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							As we develop our businesses, we might sell or buy businesses or assets. In the event
							of a corporate sale, merger, reorganization, sale of assets, dissolution, liquidation,
							or bankruptcy or similar event, your information may be part of the transferred
							assets; and
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							To the extent permitted by law, we may also disclose your information: (i) in response
							to lawful requests by public authorities, including for the purpose of meeting
							national security or law enforcement requirements, (ii) when required by law, court
							order, or other government or law enforcement authority or regulatory agency; or (iii)
							whenever we believe that disclosing such information is necessary or advisable, for
							example, to protect the rights, property, or safety of us or others.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If we intend to use your information in any manner that is not consistent with this
							Policy, you will be informed of such anticipated use prior to or at the time at which
							information is collected. How We Protect and Store Your Information
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The security of your data is important to us but remember that no method of
							transmission over the Internet or method of electronic storage is 100% secure. We
							strive to ensure security on our systems and use administrative, technical, and other
							physical security measures to help protect your personal information. We also use
							computer safeguards such as firewalls and data encryption, we enforce access controls
							to our office and files, and we authorize access to personal information only for
							those employees who require it to fulfill their job responsibilities. Despite our
							efforts, we cannot guarantee that personal information may not be accessed, disclosed,
							altered or destroyed by breach of our administrative, managerial and technical
							safeguards. Therefore, we urge you to take adequate precautions to protect your
							personal information as well, including never sharing your password with anyone. Any
							transmission of personal information is at your own risk. We are not responsible for
							circumvention of any privacy settings or security measures contained on the Services.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							How We Share Personal Information with Other Parties
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may share your information with our business partners to offer you certain
							products, Services, and promotions. We may also use third-party advertising companies
							to serve ads when you visit the Site. These companies may use information about your
							visits to the Site and other websites that are contained in web cookies in order to
							provide advertisements about goods and Services of interest to you.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We do not control third parties’ collection or use of your information to serve
							interest-based advertising. However, these third parties may provide you with ways to
							choose not to have your information collected or used in this way.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`Some personal information is public information (this may include your web3-enabled
							wallet’s public address, username, profile photo, profile first and last name, month,
							and year of account creation, and public transactions in which you've been involved),
							and may be seen by anyone on the Internet due to the nature of the blockchain, whether
							or not they have an account with us. Public information may also be seen, accessed,
							reshared or downloaded through APIs, SDKs, or third-party Services that integrate with
							our products.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may share your personal information with:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Law enforcement, government officials, or other third parties if we are compelled to
							do so by a subpoena, court order or similar legal procedure, when it is necessary to
							do so to comply with law, or where the disclosure of personal information is
							reasonably necessary to prevent physical harm or financial loss, to report suspected
							illegal activity, or to investigate violations of the Terms of Services, or as
							otherwise required by law.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Third-party Services providers who assist us in providing the Services to you or who
							provide fraud detection or similar Services on our or any vendor’s behalf.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Other third parties with your consent or at your direction to do so, including if you
							authorize an account connection with a third-party account or platform:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`For the purposes of this Policy, an "account connection" with such a third party is a
							connection you authorize or enable between your account and a payment instrument, or
							platform that you lawfully control or own. When you authorize such a connection, we
							may exchange your personal information and other information directly with such
							third-party. Examples of account connections include, without limitation: linking your
							account to a social media account or social messaging Services; connecting your
							account to a third-party data aggregation or financial Services company, if you
							provide such company with your account log-in credentials; or using your account to
							make payments to a merchant or allowing a merchant to charge your account.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If you connect your account to other financial accounts, directly or through a
							third-party Services provider, we may have access to your account balance and account
							and transactional information, such as purchases and funds transfers. If you choose to
							create an account connection, we may receive information from the third party about
							you and your use of the third-party’s Services. For example, if you connect your
							account to a social media account, we will receive personal information from the
							social media provider via the account connection. We will use all such information
							that we receive from a third-party via an account connection in a manner consistent
							with this Policy.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Information that we share with a third-party based on an account connection will be
							used and disclosed in accordance with the third-party’s privacy practices. Before
							authorizing an account connection, you should review the privacy notice of any third
							party that will gain access to your personal information as part of the account
							connection.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We will not disclose your credit card number or bank account number to anyone except
							with your express, written permission or if we are required to do so to comply with a
							subpoena or other legal process.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We do not send your personal information to third-party social networks unless you
							have specifically requested or authorized us to do so. When you broadcast information
							to such third-party social networks, such information is no longer under our control
							and is subject to the terms of use and privacy policies maintained by such third
							parties.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Third-Party Links
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The Services may contain links to (or allow you to link to) unaffiliated third-party
							Services, applications, or websites. We do not control information collection of any
							third-party Services, applications, or websites that can be reached through such
							links. We encourage our users to be aware when they are linking to a third-party
							Services or website and to read the privacy statements of any third-party Services or
							website that collects personal information. Any information you provide to any third
							party is not covered by this Policy and we cannot guarantee the safety and privacy of
							your information.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Note also that third parties may use Cookies (either alone or in conjunction with web
							beacons or other tracking technologies) to collect information about you when you use
							our Services. Information third parties collect may be associated with your personal
							information or they may collect information, including personal information, about
							your online activities over time and across different websites and online Services.
							Third parties may use this information to provide you with interest-based advertising
							or other targeted content. We do not control these third parties’ tracking
							technologies or how they may be used. If you have any questions about an advertisement
							or other targeted content, we encourage you to contact the responsible provider
							directly. If you no longer wish to receive correspondence, e-mails, or other
							communications from third parties, you are responsible for contacting the third party
							directly.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Third-Party Analytics and Retargeters
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may use third-party analytics (such as Google Analytics) to evaluate your use of
							the Services, compile reports on activity and events, collect demographic data,
							analyze performance metrics, and collect and evaluate other information relating to
							the Services, and mobile and Internet usage. These third parties use cookies, pixel
							tags, and other related tracking technologies to help analyze and provide us the data.
							For instance, pixel tags (also known as web beacons and clear GIFs) may be used to,
							among other things, track the actions of Site users and email recipients, measure the
							success of our marketing campaigns and compile statistics about use of the Site and
							response rates.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							By visiting and using the Services, you consent, to the extent permitted under
							applicable law, to the processing of data about you by these analytics in the manner
							and for the purposes set out in this Privacy Policy.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							For more information on these third parties, including how to opt out from certain
							data collection (if available by such third parties), please visit the sites below.
							Please be advised that if you opt out of any Services, you may not be able to use the
							full functionality of the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`For Google Analytics, visit: `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://www.google.com/analytics'}
								isExternal
							>
								https://www.google.com/analytics
							</Link>
							{` Google Analytics is a web analytics Services offered by Google that tracks and reports
							website traffic. Google uses the data collected to track and monitor the use of our
							Services. This data is shared with other Google Services. Google may use the collected
							data to contextualize and personalize the ads of its own advertising network. For more
							information on the privacy practices of Google, please visit the Google Privacy Terms
							web page: `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://policies.google.com/privacy?hl=en'}
								isExternal
							>
								https://policies.google.com/privacy?hl=en
							</Link>
							{` We also encourage you to review
							Google's policy for safeguarding your data: `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://support.google.com/analytics/answer/6004245'}
								isExternal
							>
								https://support.google.com/analytics/answer/6004245
							</Link>
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may also use one or more third-party retargeting Services to advertise on
							third-party websites to previous visitors to our Services. These third-party
							retargeting Services providers use cookies to serve ads based on a past visit to the
							Site and may utilize cookies, pixel tags, and other related technologies. Any data
							collected by such third-party retargeting Services providers will be used in
							accordance with this Policy. By visiting and using the Services, you consent, to the
							extent permitted under applicable law, to the processing of data about you by these
							remarketer Services. For more information on such third-party retargeting Services
							providers, including how to opt out from certain data collection, please visit the
							following links:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`For Google AdWords, you can set preferences for how Google advertises to you using the
							Google Ad Preferences page at: `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://adssettings.google.com/authenticated'}
								isExternal
							>
								https://adssettings.google.com/authenticated
							</Link>
							{`, and if desired, you can opt out of interest-based advertising by cookie settings or
							permanently using a browser plugin.`}
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Personal Communication Preferences
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							To the extent you have registered for the Services, you may access, review, make
							changes to, and delete your personal information by following the instructions found
							on the Site or by sending an e-mail to us at support@ox.market with the subject line,
							“Privacy Policy.” We reserve the right to ask for information verifying your identity
							before we begin complying with a request to review, make changes to, and delete your
							personal information.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							In addition, you may manage your receipt of marketing and non-transactional
							communications by clicking on the “Unsubscribe” link located on the bottom of any
							marketing e-mail, or by sending us an email at support@ox.market with the subject
							line, “Unbsubscribe from Marketing.” Registered users cannot opt out of receiving
							transactional or administrative e-mails related to their account. We will use
							commercially reasonable efforts to process such requests in a timely manner in
							compliance with applicable laws. You should be aware, however, that it is not always
							possible to completely remove or modify information in our databases.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Transfer of Data
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Your personal information may be transferred to – and maintained on – computers
							located outside of your state, province, country or other governmental jurisdiction
							where the data protection laws may differ from those of your jurisdiction. By using
							the Services, you consent to the transfer of your information outside of your country
							of residence, which may have data protection rules that are different from those of
							your country. In certain circumstances, courts, law enforcement agencies, regulatory
							agencies or security authorities in those other countries may be entitled to access
							your personal information.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We will take all the steps reasonably necessary to ensure that your data is treated
							securely and in accordance with this Policy and no transfer of your personal
							information will take place to an organization or a country unless there are adequate
							controls in place including the security of your data and other personal information.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Your Data Protection Rights
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Depending on applicable law where you reside, you may be able to assert certain rights
							related to your personal information identified below. If any of the rights listed
							below are not provided under law for your operating entity or jurisdiction, we have
							absolute discretion in providing you with those rights.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`Your rights to personal information are not absolute. Depending upon the applicable
							law, access to your rights under the applicable law may be denied: (a) when denial of
							access is required or authorized by law; (b) when granting access would have a
							negative impact on another's privacy; (c) to protect our rights and properties; (d)
							where the request is frivolous or vexatious, or for other reasons. Please also note
							that we may ask you to verify your identity before responding to such requests.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Right to Access. You have the right to access, update or to delete the information we
							have on you, and you may e-mail us at support@ox.market to request a copy of the
							personal information the Site’s databases currently contain.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The right of correction or rectification. You have the right to have your information
							rectified if that information is inaccurate or incomplete by emailing us at
							support@ox.market Using the same email address associated with your use of the Site or
							your Site account, simply type the words “Correction or Rectification” in the subject
							line of your e-mail to us.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The right to data portability. You have the right to be provided with a copy of your
							personal information in a structured, machine-readable and commonly used format. You
							may submit a request via e-mail at support@ox.market When such a request cannot be
							honored, we will advise you accordingly. You can then choose to exercise any other
							rights under this Policy, to include withdrawing your consent. Where applicable, we
							will ensure such changes are shared with any trusted third parties. Using the same
							email address associated with your use of the Site or with your Site account, simply
							type the words ``Portability / Personal Information” in the subject line of your email
							to us.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The right to withdraw consent. You also have the right to withdraw your consent at any
							time where we rely on your consent to process your personal information by emailing us
							at support@ox.market Using the same e-mail address associated with your use of the or
							your Site account, simply type the words “WITHDRAW CONSENT” in the subject line of
							your e-mail. Upon receipt of such a withdrawal of consent, we will confirm receipt and
							proceed to stop processing your personal information. Where applicable, we will ensure
							such changes are shared with trusted third parties.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{' '}
							The right to erasure. If you should wish to cease use of our Site and have your
							personal information deleted from our Site, then you may submit a request by e-mailing
							us at support@ox.market Upon receipt of such a request for erasure, we will confirm
							receipt and will confirm once your personal information has been deleted. Where
							applicable, we will ensure such changes are shared with trusted third parties. Using
							the same e-mail address associated with your use of the Site or your Site account,
							simply type the words “Erasure / Personal Data Deletion” in the subject line of your
							e-mail to us.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If you are located in the European Economic Area or the UK, Switzerland or Brazil you
							have the right to lodge a complaint with a supervisory authority if you believe our
							processing of your personal information violates applicable law.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Return/Deletion of Personal Data
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Upon your request we will endeavor to: (i) return all personal information processed
							in connection with the Services to you in a structured, commonly used, and
							machine-readable format, and will delete existing copies and backups; or, (ii) destroy
							and delete all personal information processed in connection with the Services,
							including materials or media containing such personal information, and including all
							copies and backups.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Changes to Our Policy
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may update this Policy at any time. When we do, we will revise the updated date at
							the top of this page. We encourage users to frequently check this page for any changes
							to stay informed about our information practices. You acknowledge and agree that it is
							your responsibility to review this Privacy Policy periodically and become aware of
							modifications. Your continued use of the Site following the posting of changes to this
							Privacy Policy will be deemed your acceptance of those changes. If you do not agree to
							this Privacy Policy, please do not use our Site.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Jurisdiction
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The Services, including the Site, are made available by us from Panama and are not
							intended to subject us to the laws or jurisdiction of any state, country or territory
							other than that of Panama.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							Contact Us
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If you have any comments or questions about this Policy, please contact us by e-mail
							at support@ox.market
						</Text>
					</TabPanel>
					<TabPanel>
						<Heading size={'md'} color={'gray.800'}>
							Terms of Use
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							This website-hosted user interface (this “Interface”) is made available by Adventure
							One QSS Inc., a corporation organized and existing under the laws of Panama (the
							“Company”). These terms of use, together with any documents and additional terms they
							expressly incorporate by reference, which includes any other terms and conditions or
							any agreement that the Company ( “we,” “us” and “our”) posts publicly or makes
							available to you or the company or other legal entity you represent (“you” or “your”)
							(collectively, these “Terms”), are entered into between the Company and you concerning
							your use of, and access to, the Company’s websites, including the Interface; web
							applications; mobile applications; and all associated sites linked thereto by the
							Interface, or us or our affiliates (collectively with any materials and services
							available therein, and successor website(s) or application(s) thereto, the “Site”).
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Please read these Terms carefully, as these Terms govern your use of the Site, and
							access to the order contract; Supported Contracts (as defined below); decentralized
							applications; APIs; all software made available by the Company to operate the
							Interface for trading and swapping cryptocurrencies and other blockchain-based assets
							(collectively, “Digital Assets”), including, without limitation, entering into
							contracts (“Contracts”) related to a specified event, occurrence, or value
							(collectively, the “Services”). These Terms expressly cover your rights and
							obligations, and our disclaimers and limitations of legal liability, relating to your
							use of, and access to, the Site and the Services. By creating an account on the Site
							or clicking “I agree” (or a similar language) to these Terms, acknowledging these
							Terms by other means, or otherwise accessing or using the Site or the Services, you
							accept and agree to be bound by and to comply with these Terms, including, without
							limitation, the mandatory arbitration provision in Section 14. If you do not agree to
							these Terms, then you must not access or use the Site or the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							THE CONTRACTS DISPLAYED ON THE INTERFACE (“SUPPORTED CONTRACTS”) ARE THIRD PARTY
							CONTRACTS AND ARE NOT DEPLOYED OR RESOLVED BY THE COMPANY, BLOCKRATIZE, INC.
							(“BLOCKRATIZE”), OR ANY OF THEIR PARENTS OR SUBSIDIARIES. SUPPORTED CONTRACTS ARE NOT
							OFFERED TO PERSONS OR ENTITIES WHO RESIDE IN, ARE CITIZENS OF, ARE LOCATED IN, ARE
							INCORPORATED IN, OR HAVE A REGISTERED OFFICE IN THE UNITED STATES OF AMERICA
							(COLLECTIVELY, “US PERSONS”). MOREOVER, NONE OF OUR OTHER SERVICES ARE OFFERED TO
							PERSONS OR ENTITIES WHO RESIDE IN, ARE LOCATED IN, ARE INCORPORATED IN, OR HAVE A
							REGISTERED OFFICE IN ANY RESTRICTED TERRITORY, AS DEFINED BELOW (ANY SUCH PERSON OR
							ENTITY FROM A RESTRICTED TERRITORY, A “RESTRICTED PERSON”). WE DO NOT MAKE EXCEPTIONS;
							THEREFORE, IF YOU ARE A US PERSON, THEN DO NOT ATTEMPT TO USE OUR SUPPORTED CONTRACTS
							AND IF YOU ARE A RESTRICTED PERSON, THEN DO NOT ATTEMPT TO USE ANY OF THE SERVICES, AS
							DEFINED BELOW. USE OF A VIRTUAL PRIVATE NETWORK (“VPN”) TO CIRCUMVENT THE RESTRICTIONS
							SET FORTH HEREIN IS PROHIBITED.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Please carefully review the disclosures and disclaimers set forth in Section 12 in
							their entirety before using Services, including the Interface or the Site. The
							information in Section 12 provides important details about the legal obligations
							associated with your use of the Services.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							MODIFICATIONS TO THESE TERMS
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We reserve the right, in our sole discretion, to modify these Terms from time to time.
							If we make changes, we will provide you with notice of such changes, such as by
							providing notice through the Services or updating the “Last Updated” date at the top
							of these Terms. Unless we state otherwise in our notice, all such modifications are
							effective immediately, and your continued use of the Site and the Services after we
							provide that notice will confirm your acceptance of the changes. If you do not agree
							to the amended Terms, then you must stop using the Site and the Services.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							USE OF SERVICES
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							User Representations and Warranties. As a condition to accessing or using the Services
							or the Site, you represent and warrant to the Company the following:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							If you are entering into these Terms as an individual, then you are of legal age in
							the jurisdiction in which you reside and you have the legal capacity to enter into
							these Terms and be bound by them and if you are entering into these Terms as an
							entity, then you must have the legal authority to accept these Terms on that entity’s
							behalf, in which case “you” (except as used in this paragraph) will mean that entity;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`You are not a resident, national, or agent of Algeria, Bangladesh, Bolivia, Belarus,
							Burundi, Burma (Myanmar), Cote D'Ivoire (Ivory Coast), Crimea and Sevastopol, Cuba,
							Democratic Republic of Congo, Ecuador, Iran, Iraq, Liberia, Libya, Mali, Morocco,
							Nepal, North Korea, Somalia, Sudan, Syria, Venezuela, Yemen, Zimbabwe or any other
							country to which Canada, Panama, the United States, the United Kingdom or the European
							Union embargoes goods or imposes similar sanctions (collectively, “Restricted
							Territories”);`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You are not a member of any sanctions list or equivalent maintained by the Panamanian
							government, the United States government, the United Kingdom government, the European
							Union, or the United Nations (collectively, “Sanctions Lists Persons”) and you do not
							intend to transact with any Restricted Person or Sanctions List Person;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You do not, and will not, use VPN software or any other privacy or anonymization tools
							or techniques to circumvent, or attempt to circumvent, any restrictions that apply to
							the Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You represent and warrant to us that you have obtained all required consents from any
							individual whose personal information you transfer to us in connection with your use
							of the Services; and Your access to the Services is not (a) prohibited by and does not
							otherwise violate or assist you to violate any domestic or foreign law, rule, statute,
							regulation, by-law, order, protocol, code, decree, or another directive, requirement,
							or guideline, published or in force that applies to or is otherwise intended to govern
							or regulate any person, property, transaction, activity, event or other matter,
							including any rule, order, judgment, directive or other requirement or guideline
							issued by any domestic or foreign federal, provincial or state, municipal, local or
							other governmental, regulatory, judicial or administrative authority having
							jurisdiction over the Company, you, the Site or the Services, or as otherwise duly
							enacted, enforceable by law, the common law or equity (collectively, “Applicable
							Laws”); or (b) contribute to or facilitate any illegal activity.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Limitations. As a condition to accessing or using the Services or the Site, you
							acknowledge, understand, and agree to the following:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							from time to time the Site and the Services may be inaccessible or inoperable for any
							reason, including, without limitation: (a) equipment malfunctions; (b) periodic
							maintenance procedures or repairs that the Company or any of its suppliers or
							contractors may undertake from time to time; (c) causes beyond the Company’s control
							or that the Company could not reasonably foresee; (d) disruptions and temporary or
							permanent unavailability of underlying blockchain infrastructure; or (e)
							unavailability of third-party service providers or external partners for any reason;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							we reserve the right to disable or modify access to the Site and the Services at any
							time in the event of any breach of these Terms, including, without limitation, if we
							reasonably believe any of your representations and warranties may be untrue or
							inaccurate or you are violating or have violated any of the geographical restrictions
							that apply to the Services and/or Sponsored Contracts, and we will not be liable to
							you for any losses or damages you may suffer as a result of or in connection with the
							Site or the Services being inaccessible to you at any time or for any reason;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							the Site and the Services may evolve, which means the Company may apply changes,
							replace, or discontinue (temporarily or permanently) the Services at any time in its
							sole discretion;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							the pricing information provided on the Site does not represent an offer, a
							solicitation of an offer, or any advice regarding, or recommendation to enter into, a
							transaction with the Company;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							the Company does not act as an agent for you or any other user of the Site or the
							Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							you are solely responsible for your use of the Services, including all of your
							transfers of Digital Assets and the custody and control of your Digital Assets;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							to the fullest extent not prohibited by Applicable Laws, we owe no fiduciary duties or
							liabilities to you or any other party, and that to the extent any such duties or
							liabilities may exist at law or in equity, you hereby irrevocably disclaim, waive, and
							eliminate those duties and liabilities;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							you are solely responsible for reporting and paying any taxes applicable to your use
							of the Services; we have no control over, or liability for, the delivery, quality,
							safety, legality, or any other aspect of any Digital Assets that you may transfer to
							or from a third party, and we are not responsible for ensuring that an entity with
							whom you transact completes the transaction or is authorized to do so, and if you
							experience a problem with any transactions in Digital Assets using the Services, then
							you bear the entire risk; and
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We appreciate feedback, comments, ideas, proposals and suggestions for improvements to
							the Services (“Feedback”). If you choose to submit Feedback, you agree that we are
							free to use it (and permit others to use it) without any restriction or compensation
							to you.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Certifications. As a condition to accessing or using the Services or the Site, you
							covenant to the Company the following:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							in connection with using the Services, you only will transfer legally-obtained Digital
							Assets that belong to you;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							you will comply with all Applicable Laws in connection with using the Services, and
							you will not use the Site or the Services if the laws of your country, or any other
							Applicable Law, prohibit you from doing so;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							any Digital Assets you use in connection with the Services are either owned by you or
							you are validly authorized to carry out actions using such Digital Assets;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							in addition to complying with all restrictions, prohibitions, and other provisions of
							these Terms, you will ensure that, at all times, all information that you provide on
							the Site and during your use of the Services is current, complete, and accurate; (b)
							maintain the security and confidentiality of your private keys associated with your
							public Wallet address, passwords, API keys, private keys associated with your Services
							account and other related credentials.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							FEES AND PRICE ESTIMATES
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							In connection with your use of the Services, you are required to pay all fees
							necessary for interacting with the Ethereum, Polygon or other blockchains, including
							transaction costs (e.g., gas fees), as well as all other fees reflected on the Site at
							the time of your use of the Services. Although we attempt to provide accurate fee
							information, this information reflects our estimates of fees, which may vary from the
							actual fees paid to use the Services and interact with a blockchain.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							NO PROFESSIONAL ADVICE OR FIDUCIARY DUTIES
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							All information provided in connection with your access and use of the Site and the
							Services is for informational purposes only and should not be construed as
							professional advice. You should not take, or refrain from taking, any action based on
							any information contained on the Site or any other information that we make available
							at any time, including, without limitation, blog posts, articles, links to third-party
							content, discord content, news feeds, tutorials, social media content, and videos.
							Before you make any financial, legal, or other decisions involving the Services, you
							should seek independent professional advice from an individual who is licensed and
							qualified in the area for which such advice would be appropriate. The Terms are not
							intended to, and do not, create or impose any fiduciary duties on us. You further
							agree that the only duties and obligations that we owe you are those set out expressly
							in these Terms.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							PROHIBITED ACTIVITY
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							if you are entering into these Terms as an individual, then you are of legal age in
							the jurisdiction in which you reside and you have the legal capacity to enter into
							these Terms and be bound by them and if you are entering into these Terms as an
							entity, then you must have the legal authority to accept these Terms on that entity’s
							behalf, in which case “you” (except as used in this paragraph) will mean that entity:
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							violate any Applicable Laws including, without limitation, any relevant and applicable
							anti-money laundering and anti-terrorist financing laws and sanctions programs;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							engage in transactions involving items that infringe or violate any copyright,
							trademark, right of publicity or privacy or any other proprietary right under
							Applicable Law, including but not limited to, sales, distribution, or access to
							counterfeit music, movies, software, or other licensed materials without the
							appropriate authorization from the rights holder; use of the Company’s intellectual
							property, name, or logo, including use of trade or service marks, without express
							consent from the Company or in a manner that otherwise harm the Company; any action
							that implies an untrue endorsement by or affiliation with the Company;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							use the Services in any manner that could interfere with, disrupt, negatively affect,
							or inhibit other users from fully enjoying the Services, or that could damage,
							disable, overburden, or impair the functioning of the Site or the Services in any
							manner;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							engage in activity that violates any Applicable Law, rule, or regulation concerning
							the integrity of trading markets, including (but not limited to) the manipulative
							tactics commonly known as spoofing and wash trading.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							circumvent any content-filtering techniques, security measures or access controls that
							the Company employs on the Site, including, without limitation, through the use of a
							VPN;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							use any robot, spider, crawler, scraper, or other automated means or interface not
							provided by us, to access the Services or to extract data, or introduce any malware,
							virus, Trojan horse, worm, logic bomb, drop-dead device, backdoor, shutdown mechanism
							or other harmful material into the Site or the Services;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							provide false, inaccurate, or misleading information while using the Site or the
							Services or engage in activity that operates to defraud the Company, other users of
							the Services, or any other person; use or access the Site or Services to transmit or
							exchange Digital Assets that are the direct or indirect proceeds of any criminal or
							fraudulent activity, including, without limitation, terrorism or tax evasion;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							use the Site in any way that is, in our sole discretion, libelous, defamatory,
							profane, obscene, pornographic, sexually explicit, indecent, lewd, vulgar, suggestive,
							harassing, stalking, hateful, threatening, offensive, discriminatory, bigoted,
							abusive, inflammatory, fraudulent, deceptive, or otherwise objectionable or likely or
							intended to incite, threaten, facilitate, promote, or encourage hate, racial
							intolerance, or violent acts against others;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							use the Site or the Services from a jurisdiction that we have, in our sole discretion,
							determined is a jurisdiction where the use of the Site or the Services is prohibited;
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							harass, abuse, or harm of another person or entity, including the Company’s employees
							and service providers; impersonate another user of the Services or otherwise
							misrepresent yourself; or engage in activity that violates any Applicable Law.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							encourage, induce or assist any third party, or yourself attempt, to engage in any of
							the activities prohibited under this Section 5 or any other provision of these Terms.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							CONTENT
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You hereby grant to us a royalty-free, fully paid-up, sublicensable, transferable,
							perpetual, irrevocable, non- exclusive, worldwide license to use, copy, modify, create
							derivative works of, display, perform, publish and distribute, in any form, medium, or
							manner, any content that is available to other users as a result of your use of the
							Site or the Services (collectively, “Your Content”), including, without limitation,
							for promoting the Company, its affiliates, the Services or the Site. You represent and
							warrant that (a) you own Your Content or have the right to grant the rights and
							licenses in these Terms; and (b) Your Content and our use of Your Content, as licensed
							herein, does not and will not violate, misappropriate or infringe on any third party’s
							rights.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							PROPRIETARY RIGHTS
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Any of product or service names, logos, and other marks used on the Site or as a part
							of the Services, including name and logo are trademarks owned by the Company, its
							affiliates, or its applicable licensors. You may not copy, imitate, or use them
							without the prior written consent of the Company or the applicable licensors, and
							these Terms do not grant you any rights in those trademarks. You may not remove,
							obscure, or alter any legal notices displayed in or along with the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The Services are non-custodial. When you deposit Digital Assets into any discreet log
							contract (each, a “DLC”), you retain control over those Digital Assets at all times.
							The private key associated with the Ethereum address from which you transfer Digital
							Assets and/or the private key associated with the Service account (Atomic key) is the
							only private key that can control the Digital Assets you transfer into the DLC. In
							some cases, you may withdraw Digital Assets from any DLC only to the Ethereum wallet
							from which you deposited the Digital Assets.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							LINKS
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The Services provide, or third parties may provide, links to other World Wide Web or
							accessible sites, applications, or resources. You acknowledge and agree that the
							Company is not responsible for the availability of such external sites, applications
							or resources, and does not endorse and is not responsible or liable for any content,
							advertising, products, or other materials on or available from such sites or
							resources. You further acknowledge and agree that Company shall not be responsible or
							liable, directly or indirectly, for any damage or loss caused or alleged to be caused
							by or in connection with use of or reliance on any such content, goods, or services
							available on or through any such site or resource.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							MODIFICATION, SUSPENSION, AND TERMINATION
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We may, at our sole discretion, from time to time and with or without prior notice to
							you, modify, suspend or disable (temporarily or permanently) the Services, in whole or
							in part, for any reason whatsoever, including, without limitation, to only allow open
							Contracts to be closed. Upon termination of your access, your right to use the
							Services will immediately cease. We will not be liable for any losses suffered by you
							resulting from any modification to any Services or from any modification, suspension,
							or termination, for any reason, of your access to all or any portion of the Site or
							the Services. The following sections of these Terms will survive any termination of
							your access to the Site or the Services, regardless of the reasons for its expiration
							or termination, in addition to any other provision which by law or by its nature
							should survive: Sections 7 through 15.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							ASSUMPTION OF RISKS
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							By utilizing the Services or interacting with the Site in any way, you represent and
							warrant that you understand the inherent risks associated with cryptographic systems
							and blockchain-based networks; Digital Assets, including the usage and intricacies of
							native Digital Assets, like Ethereum (ETH); Ethereum blockchain-based tokens, and
							systems that interact with blockchain-based networks. Neither the Company nor
							Blockratize owns or controls any of the Supported Contracts, the underlying software
							through which blockchain networks are formed or smart contracts deployed. In general,
							the software underlying blockchain networks, including the Ethereum blockchain, is
							open source, such that anyone can use, copy, modify, and distribute it. By using the
							Services, you acknowledge and agree (a) that the Company is not responsible for the
							operation of the software and networks underlying the Services, (b) that there exists
							no guarantee of the functionality, security, or availability of that software and
							networks, and (c) that the underlying networks are subject to sudden changes in
							operating rules, such as those commonly referred to as “forks,” which may materially
							affect the Services. Blockchain networks use public/private key cryptography. You
							alone are responsible for securing your private key(s). We do not have access to your
							private key(s). Losing control of your private key(s) will permanently and
							irreversibly deny you access to Digital Assets on the Ethereum blockchain or other
							blockchain-based network. Neither the Company nor any other person or entity will be
							able to retrieve or protect your Digital Assets. If your private key(s) are lost, then
							you will not be able to transfer your Digital Assets to any other blockchain address
							or wallet. If this occurs, then you will not be able to realize any value or utility
							from the Digital Assets that you may hold.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The Services and your Digital Assets could be impacted by one or more regulatory
							inquiries or regulatory actions, which could impede or limit the ability of the
							Company to continue to make available its proprietary software and, thus, could impede
							or limit your ability to access or use the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You acknowledge and understand that cryptography is a progressing field with advances
							in code cracking or other technical advancements, such as the development of quantum
							computers, which may present risks to Digital Assets and the Services, and could
							result in the theft or loss of your Digital Assets. To the extent possible, we intend
							to update the software related to the Services to incorporate additional security
							measures necessary to address risks presented from technological advancements, but
							that intention does not guarantee or otherwise ensure full security of the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You understand that the Ethereum blockchain remains under development, which creates
							technological and security risks when using the Services in addition to uncertainty
							relating to Digital Assets and transactions therein. You acknowledge that the cost of
							transacting on the Ethereum blockchain is variable and may increase at any time
							causing impact to any activities taking place on the Ethereum blockchain, which may
							result in price fluctuations or increased costs when using the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You acknowledge that the Services are subject to flaws and that you are solely
							responsible for evaluating any code provided by the Services or Site. This warning and
							others the Company provides in these Terms in no way evidence or represent an on-going
							duty to alert you to all of the potential risks of utilizing the Services or accessing
							the Site.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Although we intend to provide accurate and timely information on the Site and during
							your use of the Services, the Site and other information available when using the
							Services may not always be entirely accurate, complete, or current and may also
							include technical inaccuracies or typographical errors. To continue to provide you
							with as complete and accurate information as possible, information may be changed or
							updated from time to time without notice, including, without limitation, information
							regarding our policies. Accordingly, you should verify all information before relying
							on it, and all decisions based on information contained on the Site or as part of the
							Services are your sole responsibility. No representation is made as to the accuracy,
							completeness, or appropriateness for any particular purpose of any pricing information
							distributed via the Site or otherwise when using the Services. Prices and pricing
							information may be higher or lower than prices available on platforms providing
							similar services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Any use or interaction with the Services requires a comprehensive understanding of
							applied cryptography and computer science to appreciate the inherent risks, including
							those listed above. You represent and warrant that you possess relevant knowledge and
							skills. Any reference to a type of Digital Asset on the Site or otherwise during the
							use of the Services does not indicate our approval or disapproval of the technology on
							which the Digital Asset relies, and should not be used as a substitute for your
							understanding of the risks specific to each type of Digital Asset.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Use of the Services, in particular for Digital Assets transactions and entering into
							Contracts, may carry financial risk. Digital Assets and Contracts are highly
							experimental, risky, and volatile. Transactions entered into in connection with the
							Services are irreversible, final and there are no refunds. You acknowledge and agree
							that you will access and use the Site and the Services at your own risk. The risk of
							loss in transacting in Digital Assets using Contracts can be substantial. You should,
							therefore, carefully consider whether such transactions are suitable for you in light
							of your circumstances and financial resources. By using the Services, you represent
							and warrant that you have been, are, and will be solely responsible for making your
							independent appraisal and investigations into the risks of a given DLC transaction.
							You represent that you have sufficient knowledge, market sophistication, professional
							advice, and experience to make your evaluation of the merits and risks of any
							transaction conducted in connection with the Services. You accept all consequences of
							using the Services, including the risk that you may lose access to your Digital Assets
							indefinitely. All transaction decisions are made solely by you. Notwithstanding
							anything in these Terms, we accept no responsibility whatsoever for, and will in no
							circumstances be liable to you in connection with, your use of the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You acknowledge and fully understand that Contracts, including Supported Contracts,
							are inherently risky by their nature and participation in Contracts, including
							Supported Contracts, could result in the loss of the full amount invested. Further,
							such risks and adverse outcomes may be exacerbated when leverage and/or derivative
							products are used and we may, at any time and in our sole discretion, elect to suspend
							or terminate our support of any or all Supported Contracts.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							We must comply with Applicable Law, which may require us to, upon request by
							government agencies, take certain actions or provide information, which may not be in
							your best interests. You understand that the Service remains under development, which
							creates technological, transaction related, and other risks when using the Services.
							These risks include, among others, delays in trades, withdrawals, and deposits
							resulting from the servers of the operator of the Services being offline; an incorrect
							display of information on the Site in the case of server errors; or transactions using
							the Services being rolled back in the case of server errors. You acknowledge that
							these risks may have a material impact on your transactions using the Services, which
							may result in, among other things, failing to fulfill transactions at your desired
							price or at all.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							THE COMPANY WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKES NO
							RESPONSIBILITY FOR, AND WILL NOT BE LIABLE TO YOU FOR, ANY USE OF THE SERVICES,
							INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (I) USER
							ERROR SUCH AS FORGOTTEN PASSWORDS, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED
							WALLET ADDRESSES; (II) SERVER FAILURE OR DATA LOSS; (III) CRYPTOCURRENCY WALLETS OR
							CORRUPT FILES; (IV) UNAUTHORIZED ACCESS TO SERVICES; OR (V) ANY THIRD PARTY
							ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR
							OTHER MEANS OF ATTACK AGAINST ANY BLOCKCHAIN NETWORK UNDERLYING THE SERVICES.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You hereby assume, and agree that the Company will have no responsibility or liability
							for, the risks set forth in this Section 10. You hereby irrevocably waive, release and
							discharge all claims, whether known or unknown to you, against the Company, its
							affiliates, and their respective shareholders, members, directors, officers,
							employees, agents, and representatives, suppliers, and contractors related to any of
							the risks set forth in this Section 10.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							INDEMNIFICATION
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You will defend, indemnify, and hold harmless the Company, Blockratize, any of their
							affiliates, and its and its affiliates’ respective stockholders, members, directors,
							officers, managers, employees, attorneys, agents, representatives, suppliers, and
							contractors (collectively, “Indemnified Parties”) from any claim, demand, lawsuit,
							action, proceeding, investigation, liability, damage, loss, cost or expense, including
							without limitation reasonable attorneys’ fees, arising out of or relating to (a) your
							use of, or conduct in connection with, the Site or the Services (including, without
							limitation, the Service); (b) Digital Assets associated with your Digital Asset wallet
							address; (c) any feedback you provide to the Company, if any, concerning the Site or
							the Services; (d) your violation of these Terms; or (e) your infringement or
							misappropriation of the rights of any other person or entity. If you are obligated to
							indemnify any Indemnified Party, the Company (or, at its discretion, the applicable
							Indemnified Party) will have the right, in its sole discretion, to control any action
							or proceeding and to determine whether the Company wishes to settle, and if so, on
							what terms, and you agree to corporate with the Company in the defense.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							DISCLOSURES; DISCLAIMERS
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Blockratize is a developer of software, and the Company is a licensee of such
							software. Neither the Company nor Blockratize operates a Digital Asset or derivatives
							exchange platform or offer trade execution or clearing services and, therefore, has no
							oversight, involvement, or control concerning your transactions using the Services.
							All transactions between users of the Services are executed peer-to-peer directly
							between the users’ Ethereum addresses through a smart contract. You are responsible
							for complying with all Applicable Laws that govern your Contracts.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You understand that neither Blockratize nor the Company is registered or licensed by
							any financial regulatory authority. No financial regulatory authority has reviewed or
							approved the use of the Company-operated open- source software. The Site and the
							Company-operated software do not constitute advice or a recommendation concerning any
							commodity, security, or other Digital Asset or instrument. Neither the Company nor
							Blockratize is not acting as an investment adviser or commodity trading adviser to any
							person or entity.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Neither the Company nor Blockratize owns or controls the Supported Contracts or the
							underlying software protocols that are used in connection with the Ethereum or Polygon
							Blockchain used to enter into Contracts using the Services. In general, the underlying
							protocols are open source and anyone can use, copy, modify, and distribute them.
							Neither the Company nor Blockratize is responsible for the operation of the underlying
							protocols, and neither the Company nor Blockratize makes no guarantee of their
							functionality, security, or availability.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							To the maximum extent permitted under Applicable Law, the Site and the Services (and
							any of their content or functionality) provided by or on behalf of us are provided on
							an “AS IS” and “AS AVAILABLE” basis, and we expressly disclaim, and you hereby waive,
							any representations, conditions or warranties of any kind, whether express or implied,
							legal, statutory or otherwise, or arising from statute, otherwise in law, course of
							dealing, or usage of trade, including, without limitation, the implied or legal
							warranties and conditions of merchantability, merchantable quality, quality or fitness
							for a particular purpose, title, security, availability, reliability, accuracy, quiet
							enjoyment and non-infringement of third party rights. Without limiting the foregoing,
							we do not represent or warrant that the Site or the Services (including any data
							relating thereto) will be uninterrupted, available at any particular time, or
							error-free. Further, we do not warrant that errors in the Site or the Services are
							correctable or will be correctable.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							You acknowledge that your data on the Site may become irretrievably lost or corrupted
							or temporarily unavailable due to a variety of causes, and agree that, to the maximum
							extent permitted under Applicable Law, we will not be liable for any loss or damage
							caused by denial-of-service attacks, software failures, viruses or other
							technologically harmful materials (including those which may infect your computer
							equipment), protocol changes by third-party providers, Internet outages, force majeure
							events or other disasters, scheduled or unscheduled maintenance, or other causes
							either within or outside our control.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The disclaimer of implied warranties contained herein may not apply if and to the
							extent such warranties cannot be excluded or limited under the Applicable Law of the
							jurisdiction in which you reside.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							LIMITATION OF LIABILITY
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER THE COMPANY NOR ITS SERVICE PROVIDERS
							INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE SERVICES WILL BE LIABLE FOR ANY
							INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOST PROFITS,
							LOST REVENUES, LOST SAVINGS, LOST BUSINESS OPPORTUNITY, LOSS OF DATA OR GOODWILL,
							SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE
							SERVICES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE
							OF OR INABILITY TO USE THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT
							(INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY, AND WHETHER OR
							NOT THE COMPANY OR ITS SERVICE PROVIDERS HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH
							DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS
							ESSENTIAL PURPOSE
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							In no event shall the Company’s aggregate liability (together with its affiliates,
							including its and its affiliates’ respective stockholders, members, directors,
							managers, officers, employees, attorneys, agents, representatives, suppliers, or
							contractors) arising out of or in connection with the Site and the Services (and any
							of their content and functionality), any performance or nonperformance of the
							Services, your Digital Assets, Contracts or any product, service or other item
							provided by or on behalf of the Company, whether under contract, tort, negligence,
							civil liability, statute, strict liability or other theory of liability exceed the
							lesser of US $50 or the amount of fees paid by you to the Company under these Terms,
							if any, in the twelve (12) month period immediately preceding the event giving rise to
							the claim for liability, except to the extent of a final judicial determination that
							such damages were the result of the Company’s gross negligence, fraud, willful
							misconduct or intentional violation of the law.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF
							THE BASIS OF THE BARGAIN BETWEEN THE COMPANY AND YOU.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							DISPUTE RESOLUTION & ARBITRATION
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Mandatory Arbitration of Disputes. We each agree that any dispute, claim or
							controversy arising out of or relating to these Terms or the breach, termination,
							enforcement, interpretation or validity thereof or the use of the Services
							(collectively, “Disputes”) will be resolved solely by binding, individual arbitration
							and not in a class, representative or consolidated action or proceeding. You and The
							Company agree that the Panama Arbitration Law governs the interpretation and
							enforcement of these Terms, and that you and The Company are each waiving the right to
							a trial by jury or to participate in a class action. This arbitration provision shall
							survive termination of these Terms. Exceptions. As limited exceptions to Section 14.1
							above: (i) we both may seek to resolve a Dispute in small claims court if it
							qualifies; and (ii) we each retain the right to seek injunctive or other equitable
							relief from a court to prevent (or enjoin) the infringement or misappropriation of our
							intellectual property rights.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`Conducting Arbitration and Arbitration Rules. The arbitration will be conducted by
							JAMS under its JAMS Comprehensive Arbitration Rules and Procedures (the “JAMS Rules”)
							then in effect, except as modified by these Terms. The JAMS Rules are available at`}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://www.jamsadr.com/'}
								isExternal
							>
								https://www.jamsadr.com/
							</Link>
							{` A party who wishes to start arbitration must submit a
							written Demand for Arbitration to JAMS and give notice to the other party as specified
							in the JAMS Rules. JAMS provides a form Demand for Arbitration at `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://www.jamsadr.com/'}
								isExternal
							>
								https://www.jamsadr.com/
							</Link>
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The parties agree that the arbitrator shall have exclusive authority to decide all
							issues relating to the interpretation, applicability, enforceability and scope of this
							arbitration agreement.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Arbitration Costs. Payment of all filing, administration and arbitrator fees will be
							governed by the JAMS Rules, and we won’t seek to recover the administration and
							arbitrator fees we are responsible for paying, unless the arbitrator finds your
							Dispute frivolous. If we prevail in arbitration we’ll pay all of our attorneys’ fees
							and costs and won’t seek to recover them from you. If you prevail in arbitration you
							will be entitled to an award of attorneys’ fees and expenses to the extent provided
							under Applicable Law.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Injunctive and Declaratory Relief. Except as provided in Section 14.2 above, the
							arbitrator shall determine all issues of liability on the merits of any claim asserted
							by either party and may award declaratory or injunctive relief only in favor of the
							individual party seeking relief and only to the extent necessary to provide relief
							warranted by that party’s individual claim. To the extent that you or we prevail on a
							claim and seek public injunctive relief (that is, injunctive relief that has the
							primary purpose and effect of prohibiting unlawful acts that threaten future injury to
							the public), the entitlement to and extent of such relief must be litigated in a civil
							court of competent jurisdiction and not in arbitration. The parties agree that
							litigation of any issues of public injunctive relief shall be stayed pending the
							outcome of the merits of any individual claims in arbitration.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Class Action Waiver. YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
							OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER
							IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, if the parties’ Dispute
							is resolved through arbitration, the arbitrator may not consolidate another person’s
							claims with your claims, and may not otherwise preside over any form of a
							representative or class proceeding. If this specific provision is found to be
							unenforceable, then the entirety of this Dispute Resolution section shall be null and
							void.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Severability. With the exception of any of the provisions in Section 15.6 of these
							Terms (“Class Action Waiver”), if an arbitrator or court of competent jurisdiction
							decides that any part of these Terms is invalid or unenforceable, the other parts of
							these Terms will still apply.
						</Text>
						<Heading mt={'20px'} size={'md'} color={'gray.800'}>
							GENERAL INFORMATION
						</Heading>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							{`Privacy Policy. Please refer to our privacy policy, which is incorporated herein by
							reference and available here at `}
							<Link
								color={'#3182ce'}
								textDecoration={'underline'}
								href={'https://OXmarket.com/home/policy'}
								isExternal
							>
								https://OXmarket.com/home/policy
							</Link>
							{`, for information about
							how we collect, use, share and otherwise process information about you.`}
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Consent to Electronic Delivery. You consent to receive all communications, agreements,
							documents, receipts, notices, and disclosures electronically (collectively, our
							“Communications”) that we provide in connection with these Terms or any Services. You
							agree that we may provide our Communications to you by posting them on the Site or by
							emailing them to you at the email address you provide in connection with using the
							Services, if any. You should maintain copies of our Communications by printing a paper
							copy or saving an electronic copy. You may also contact us with questions, complaints,
							or claims concerning the Services at support@ox.market
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Remedies. Any right or remedy of the Company set forth in these Terms is in addition
							to, and not in lieu of, any other right or remedy whether described in these Terms,
							under Applicable Law, at law, or in equity. The failure or delay of the Company in
							exercising or enforcing any right, power, or privilege under these Terms shall not
							operate as a waiver thereof.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Severability. The invalidity or unenforceability of any of these Terms shall not
							affect the validity or enforceability of any other of these Terms, all of which shall
							remain in full force and effect.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Force Majeure. We will have no responsibility or liability for any failure or delay in
							performance of the Site or any of the Services, or any loss or damage that you may
							incur, due to any circumstance or event beyond our control, including without
							limitation any flood, extraordinary weather conditions, earthquake, epidemics and
							pandemics, or other act of God, fire, war, insurrection, riot, labor dispute,
							accident, action of government, communications, power failure, or equipment or
							software malfunction.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Assignment. You may not assign or transfer any right to use the Site or the Services,
							or any of your rights or obligations under these Terms, without our express prior
							written consent, including by operation of law or in connection with any change of
							control. We may assign or transfer any or all of our rights or obligations under these
							Terms, in whole or in part, without notice or obtaining your consent or approval.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Governing Law and Forum Choice. These Terms and any action related thereto will be
							governed by the Panama Arbitration Law and the laws of Panama, without regard to its
							conflict of laws provisions. Except as otherwise expressly set forth in Section 14
							“Dispute Resolution and Arbitration,” the exclusive jurisdiction for all Disputes that
							you and the Company are not required to arbitrate will be the courts located in
							Panama, and you and the Company each waive any objection to jurisdiction and venue in
							such courts.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Headings. Headings of sections are for convenience only and shall not be used to limit
							or construe such sections.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Entire Agreement. These Terms contain the entire agreement between you and the Company
							and supersede all prior and contemporaneous understandings between the parties
							regarding the Site and the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							Interpretation. In the event of any conflict between these Terms and any other
							agreement you may have with us, these Terms will control unless the other agreement
							specifically identifies these Terms and declares that the other agreement supersedes
							these Terms.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							No Third-Party Beneficiaries. You agree that, except as otherwise expressly provided
							in these Terms, there shall be no third-party beneficiaries to the Terms other than
							the Indemnified Parties. Reservation of Rights. You acknowledge that the Services are
							protected by copyright, trademark, and other laws. You agree not to remove, alter or
							obscure any copyright, trademark, service mark or other proprietary rights notices
							incorporated in or accompanying the Services.
						</Text>
						<Text mt={'20px'} fontSize={'md'} color={'gray.600'}>
							The service commitment to the final interpretation of OXmarket.
						</Text>
					</TabPanel>
				</TabPanels>
			</Tabs>
			{/* <Text>
				This website-hosted user interface (this “Interface”) is made available by Adventure One QSS
				Inc., a corporation organized and existing under the laws of Panama (the “Company” “us” “we”
				or “our”)). This Privacy Policy (the “Policy”) governs the manner in which we make the
				Interface available and how we collect, use, maintain and disclose information collected
				from our users (each, a "user", “you”, or “your”) through the Company’s websites, including
				the Interface, web applications mobile applications and all associated sites linked thereto
				by the Interface, or by us or our affiliates (the “Site”).This Policy further applies to all
				information we collect through our Site and otherwise obtain in connection with products and
				Services, content, features, technologies, functions and all related websites we may provide
				to you or to which we may provide access (collectively with the Site, the “Services”).
				Please read this Policy carefully. We are committed to protecting your privacy through our
				compliance with the terms of this Policy. We understand that you may have questions
				regarding this Policy, including your personal information, how it may be collected, and how
				it may be used. You may e-mail us at support@ox.market with any concerns or privacy-related
				questions that you may have. Our Terms of Services (“Terms”) govern all use of our Services
				and, together with the Privacy Policy, constitute your agreement with us (the “Agreement”).
				If you do not agree with the terms of this Policy, please do not access our Site. By
				accessing or using our Services, you agree to the terms of this Policy. Specifically, by (i)
				using, visiting, or accessing the Services, (ii) using, accessing, establishing an account
				through or purchasing any of the Services, and/or (iii) clicking “accept”, “agree”, or “OK”
				(or a similar term) with respect to any of our Terms or similar policies, you consent and
				agree to be legally bound by each of the terms and conditions contained in this Policy. In
				operating the Site and provide the Services we may collect (and/or receive) certain
				information about you and your activities. You hereby authorize us to collect and/or receive
				such information to operate the Site and provide the Services. Applicability This Policy
				applies to all information we collect from you in connection with the Site and offering the
				Services. This Policy does not apply to information collected by us offline or through any
				other means, including on any other website made available by us or by any third party
				(including our affiliates and subsidiaries). Throughout this Policy, we use the term
				"personal information" to describe information that can be associated with a specific person
				and can be used to identify that person. We do not consider personal information to include
				information that has been aggregated and/or anonymized so that it does not identify a
				specific user. Personal Information may also include the personal information of third
				parties that may be contained in information you provide to us through your use of the Site.
				Information Collection and Use
			</Text> */}
		</Stack>
	);
};

export default Privacy;
