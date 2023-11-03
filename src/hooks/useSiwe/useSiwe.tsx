import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';
import { useDispatch } from 'react-redux';
import { login, AppDispatch } from '@/store';

function useCategoryTabsList() {
	const [provider, setProvider] = useState<any>();

	const { signMessageAsync } = useSignMessage();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (typeof window !== undefined) {
			const provider = new BrowserProvider(window.ethereum as any);
			setProvider(provider);
		}
	}, []);

	const createSiweMessage = async (address: string, statement: string, chainId: number) => {
		const domain = window.location.host;
		const origin = window.location.origin;
		console.log('domain', domain);
		console.log('origin', origin);
		const message = new SiweMessage({
			domain: 'localhost',
			address,
			statement,
			uri: origin,
			version: '1',
			chainId,
		});

		return message.prepareMessage();
	};

	const signInWithEthereum = async (address: string, chainId: number) => {
		if (typeof window !== undefined) {
			// const provider = new BrowserProvider(window.ethereum as any);

			try {
				// const signer = await provider.getSigner();
				// const message = await createSiweMessage(
				// 	signer.address,
				// 	'Sign in with Ethereum to the app.'
				// );
				const message = await createSiweMessage(
					address,
					'Sign in with Ethereum to the app.',
					chainId
				);
				// const signature = await signer.signMessage(message);
				const signature = await signMessageAsync({ message });
				// get nonce from backend
				const nonceData = await axios.get(`${process.env.DEV_API}/auth/nonce`);
				const { nonce } = nonceData?.data;

				console.log('nonce', nonce);
				console.log('signature', signature);
				console.log('message', message);

				dispatch(
					login({
						nonce,
						message,
						signature,
					})
				);
			} catch (error) {
				console.log('signInWithEthereum error', error);
			}
		}
	};

	const connectWallet = async () => {
		provider.send('eth_requestAccounts', []).catch(() => console.log('User rejected request'));
	};

	return { signInWithEthereum, connectWallet };
}

export default useCategoryTabsList;
