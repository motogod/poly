import React, { useEffect, useState, useCallback } from 'react';
import { Stack, Button, Input, Card, CardBody, Grid, Heading, Text } from '@chakra-ui/react';
import { SiweMessage } from 'siwe';
import { headerHeight } from '../../utils/screen';

function SiweMessageFromMobile() {
	const [iosData, setIosData] = useState<any>();
	const [androidData, setAndroidData] = useState<any>();

	// listener to receive msgs from react native
	useEffect(() => {
		const createSiweMessage = async (address: string, statement: string, chainId: number) => {
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
			});
		} else {
			messageListener = window.addEventListener('message', function (nativeEvent) {
				const data = JSON.parse(nativeEvent?.data);
				const { address, statement, chainId } = data;
				setIosData(data);
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
