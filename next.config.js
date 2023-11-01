/** @type {import('next').NextConfig} */
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
		domains: ['media.newyorker.com'],
		formats: ['image/avif', 'image/webp'],
	},
	env: {
		WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
		DEV_API: process.env.DEV_API,
	},
};

module.exports = nextConfig;
