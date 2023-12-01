import React, { useEffect, useState, useCallback } from 'react';
import { Stack, Button, Text, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { SiweMessage } from 'siwe';
import { headerHeight } from '../../utils/screen';

function SiweMessageFromMobile() {
	const [iosData, setIosData] = useState<any>();
	const [androidData, setAndroidData] = useState<any>();
	const [nonceValue, setNonceValue] = useState('');
	const [message, setMessage] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	// listener to receive msgs from react native
	useEffect(() => {
		setIsLoading(true);

		const createSiweMessage = async (address: string, statement: string, chainId: number) => {
			const domain = window.location.host;
			const origin = window.location.origin;

			const nonceData = await axios.get(`${process.env.DEV_API}/auth/nonce`, {
				withCredentials: true,
			});

			const { nonce } = nonceData?.data.data;

			const message = new SiweMessage({
				domain,
				address,
				statement,
				uri: origin,
				version: '1',
				chainId,
				nonce,
			});

			setNonceValue(nonce);

			return message.prepareMessage();
		};

		let messageListener;

		if (navigator.userAgent.includes('Android')) {
			messageListener = document.addEventListener('message', function (nativeEvent) {
				const event = nativeEvent as MessageEvent;
				const data = JSON.parse(event.data);
				const { address, statement, chainId } = data;
				setAndroidData(data);
				createSiweMessage(address, statement, chainId)
					.then(value => {
						setIsLoading(false);
						setMessage(value);
					})
					.catch(err => {
						setIsLoading(false);
					});
			});
		} else {
			messageListener = window.addEventListener('message', function (nativeEvent) {
				const data = JSON.parse(nativeEvent?.data);

				const { address, statement, chainId } = data;
				setIosData(data);
				createSiweMessage(address, statement, chainId)
					.then(value => {
						setIsLoading(false);
						setMessage(value);
					})
					.catch(err => {
						setIsLoading(false);
					});
			});
		}

		return messageListener;
	}, []);

	useEffect(() => {
		if (message && nonceValue) {
			if (typeof window !== undefined && window.ReactNativeWebView) {
				alert({ message, nonce: nonceValue });
				window.ReactNativeWebView.postMessage(JSON.stringify({ message, nonce: nonceValue }));
			}
		}
	}, [message, nonceValue]);

	// method to send msg to react native
	const sendMessage = () => {
		if (typeof window !== undefined && window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage('Hi from React website');
		}
	};

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<p>SiweMessageFromMobile</p>
			{/* <Button onClick={() => sendMessage()}>
				<Text>Send To React Native</Text>
			</Button> */}
			{isLoading && <Spinner />}
			<p>{`Show data from React Native Android ${androidData}`}</p>
			<p>{`address ${androidData?.address}`}</p>
			<p>{`statement ${androidData?.statement}`}</p>
			<p>{`chainId ${androidData?.chainId}`}</p>
			<p>{`nonce ${androidData?.nonce}`}</p>
			<p>{`Show data from React Native IOS ${iosData}`}</p>
			<p>{`address ${iosData?.address}`}</p>
			<p>{`statement ${iosData?.statement}`}</p>
			<p>{`chainId ${iosData?.chainId}`}</p>
			<p>{`nonce ${iosData?.nonce}`}</p>
		</Stack>
	);
}

export default SiweMessageFromMobile;
