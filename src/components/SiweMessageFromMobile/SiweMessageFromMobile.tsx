import React, { useEffect, useState, useCallback } from 'react';
import {
	Stack,
	Button,
	Input,
	Card,
	CardBody,
	Grid,
	Heading,
	Text,
	Spinner,
} from '@chakra-ui/react';
import { SiweMessage } from 'siwe';
import { headerHeight } from '../../utils/screen';

function SiweMessageFromMobile() {
	const [iosData, setIosData] = useState<any>();
	const [androidData, setAndroidData] = useState<any>();
	const [message, setMessage] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	// listener to receive msgs from react native
	useEffect(() => {
		setIsLoading(true);

		const createSiweMessage = async (address: string, statement: string, chainId: number) => {
			const domain = window.location.host;
			const origin = window.location.origin;

			const message = new SiweMessage({
				domain,
				address,
				statement,
				uri: origin,
				version: '1',
				chainId,
			});

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
						alert(err);
					});
			});
		} else {
			messageListener = window.addEventListener('message', function (nativeEvent) {
				setTimeout(() => {
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
							alert(err);
						});
				}, 1000);
			});
		}

		return messageListener;
		// not woriking Android
		// const messageListener = window.addEventListener('message', nativeEvent => {
		// 	console.log(nativeEvent?.data);
		// 	alert(nativeEvent?.data);
		// 	setData(nativeEvent?.data);
		// });
		// return messageListener;
	}, []);

	useEffect(() => {
		if (message) {
			if (typeof window !== undefined && window.ReactNativeWebView) {
				window.ReactNativeWebView.postMessage(message);
			}
		}
	}, [message]);

	// method to send msg to react native
	const sendMessage = () => {
		if (typeof window !== undefined && window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage('Hi from React website');
		}
	};

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<p>SiweMessageFromMobile</p>
			<Button onClick={() => sendMessage()}>
				<Text>Send To React Native</Text>
			</Button>
			{isLoading && <Spinner />}
			<p>{`Show data from React Native Android ${androidData}`}</p>
			<p>{`address ${androidData?.address}`}</p>
			<p>{`statement ${androidData?.statement}`}</p>
			<p>{`chainId ${androidData?.chainId}`}</p>
			<p>{`Show data from React Native IOS ${iosData}`}</p>
			<p>{`address ${iosData?.address}`}</p>
			<p>{`statement ${iosData?.statement}`}</p>
			<p>{`chainId ${iosData?.chainId}`}</p>
		</Stack>
	);
}

export default SiweMessageFromMobile;
