import { createConfig, http, createStorage, cookieStorage } from 'wagmi';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { arbitrum, mainnet, arbitrumSepolia } from 'wagmi/chains';

export const config = createConfig({
	chains: [mainnet, arbitrum, arbitrumSepolia],
	// ssr: true,
	// storage: createStorage({
	// 	storage: cookieStorage,
	// }),
	connectors: [
		metaMask(),
		// injected({
		// 	target() {
		// 		if (typeof window !== 'undefined') {
		// 			return {
		// 				id: 'com.okex.wallet',
		// 				name: 'OKX Wallet',
		// 				provider: window?.ethereum,
		// 			};
		// 		}
		// 	},
		// }),
		walletConnect({
			projectId: process.env.WALLET_CONNECT_PROJECT_ID as string,
			showQrModal: true,
		}),
	],
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http(),
		[arbitrumSepolia.id]: http(),
	},
});
