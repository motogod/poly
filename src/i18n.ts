import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from '../public/locales/en/common.json';
import zh from '../public/locales/zh-Hans/common.json';
import vi from '../public/locales/vi/common.json';
// import th from '../public/locales/th/common.json';

export const defaultNS = 'common';
export const resources = {
	en: {
		common,
	},
	zh: {
		zh,
	},
	vi: {
		vi,
	},
	// th: {
	// 	th,
	// },
} as const;

i18n.use(initReactI18next).init({
	lng: 'en',
	ns: ['common'],
	defaultNS,
	resources,
});
