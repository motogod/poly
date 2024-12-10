/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['wagmi', '@wagmi/connectors', 'viem']);

const nextConfig = {
	reactStrictMode: false,
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
	images: {
		domains: [
			'media.newyorker.com',
			'icons.iconarchive.com',
			'www.unlock-bc.com',
			'image.cnbcfm.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
		DEV_API: process.env.DEV_API,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		SECRET: process.env.SECRET,
	},
	i18n,
};

module.exports = withTM(nextConfig);
