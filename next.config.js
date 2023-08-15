/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['media.newyorker.com'],
		formats: ['image/avif', 'image/webp'],
	},
};

module.exports = nextConfig;
