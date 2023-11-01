import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { useDispatch } from 'react-redux';
import { getNonce, login, AppDispatch } from '@/store';

function useCategoryTabsList() {
	const [provider, setProvider] = useState<any>();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (typeof window !== undefined) {
			const provider = new BrowserProvider(window.ethereum as any);
			setProvider(provider);
		}
	}, []);

	const createSiweMessage = async (address: string, statement: string) => {
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
			chainId: 1,
		});

		return message.prepareMessage();
	};

	const signInWithEthereum = async () => {
		if (typeof window !== undefined) {
			const provider = new BrowserProvider(window.ethereum as any);

			try {
				const signer = await provider.getSigner();
				const message = await createSiweMessage(
					signer.address,
					'Sign in with Ethereum to the app.'
				);
				const signature = await signer.signMessage(message);
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

	const connectWallet = () => {
		provider.send('eth_requestAccounts', []).catch(() => console.log('User rejected request'));
	};

	return { signInWithEthereum, connectWallet };
}

export default useCategoryTabsList;
