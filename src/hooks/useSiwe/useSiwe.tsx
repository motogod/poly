import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import { useSignMessage, useDisconnect } from 'wagmi';
import { useDispatch } from 'react-redux';
import { loginWithSiwe, AppDispatch } from '@/store';

function useCategoryTabsList() {
	const [provider, setProvider] = useState<any>();

	const { signMessageAsync, isLoading, reset } = useSignMessage();
	const { disconnect } = useDisconnect();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (typeof window !== undefined) {
			const provider = new BrowserProvider(window.ethereum as any);
			setProvider(provider);
		}
	}, []);

	const createSiweMessage = async (
		address: string,
		statement: string,
		chainId: number,
		nonce: string
	) => {
		const domain = window.location.host;
		const origin = window.location.origin;
		console.log('domain', domain);
		console.log('origin', origin);
		const message = new SiweMessage({
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId,
			nonce,
		});

		return message.prepareMessage();
	};

	const signInWithEthereum = async (address: string, chainId: number, origin: string) => {
		if (typeof window !== undefined) {
			// const provider = new BrowserProvider(window.ethereum as any);

			try {
				// const signer = await provider.getSigner();
				// const message = await createSiweMessage(
				// 	signer.address,
				// 	'Sign in with Ethereum to the app.'
				// );
				// get nonce from backend
				const nonceData = await axios.get(`${process.env.DEV_API}/auth/nonce`, {
					withCredentials: true,
				});
				console.log('nonceData', nonceData);
				const { nonce } = nonceData?.data.data;

				const message = await createSiweMessage(
					address,
					'Sign in with Ethereum to the app.',
					chainId,
					nonce
				);
				console.log('message is', message);
				// const signature = await signer.signMessage(message);
				const signature = await signMessageAsync({ message });

				// console.log('login params', JSON.stringify({ nonce, signature, message, origin }));

				dispatch(
					loginWithSiwe({
						nonce,
						message,
						signature,
						origin,
					})
				);
			} catch (error) {
				console.log('signInWithEthereum error', error);
				alert(error);
				disconnect();
			}
		}
	};

	const connectWallet = async () => {
		provider.send('eth_requestAccounts', []).catch(() => console.log('User rejected request'));
	};

	return { signInWithEthereum, connectWallet, isLoading, reset };
}

export default useCategoryTabsList;
