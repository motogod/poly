import React, { useEffect, useState, useCallback } from 'react';
import { Stack, Button, Input, Card, CardBody, Grid, Heading, Text } from '@chakra-ui/react';
import { SiweMessage } from 'siwe';
import { headerHeight } from '../../utils/screen';

function SiweMessageFromMobile() {
	const [iosData, setIosData] = useState<any>();
	const [androidData, setAndroidData] = useState<any>();

	// listener to receive msgs from react native
	useEffect(() => {
		let messageListener;
		if (navigator.userAgent.includes('Android')) {
			messageListener = document.addEventListener('message', function (nativeEvent) {
				console.log(nativeEvent);
				alert(nativeEvent);
				setAndroidData(nativeEvent);
			});
		} else {
			messageListener = window.addEventListener('message', function (nativeEvent) {
				console.log(nativeEvent?.data);
				this.alert(nativeEvent?.data);
				setIosData(nativeEvent?.data);
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

	const createSiweMessage = useCallback((address: string, statement: string, chainId: number) => {
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
	}, []);

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<p>SiweMessageFromMobile</p>
			<Button onClick={() => sendMessage()}>
				<Text>Send To React Native</Text>
			</Button>

			<p>{`Show data from React Native Android ${androidData}`}</p>
			<p>{`Show data from React Native IOS ${iosData}`}</p>
		</Stack>
	);
}

export default SiweMessageFromMobile;
