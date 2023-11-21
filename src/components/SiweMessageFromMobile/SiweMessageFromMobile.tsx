import React, { useEffect, useState } from 'react';
import { Stack, Button, Input, Card, CardBody, Grid, Heading, Text } from '@chakra-ui/react';

import { headerHeight } from '../../utils/screen';

function SiweMessageFromMobile() {
	// listener to receive msgs from react native
	useEffect(() => {
		const messageListener = window.addEventListener('message', nativeEvent => {
			console.log(nativeEvent?.data);
			alert(nativeEvent?.data);
		});
		return messageListener;
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
		</Stack>
	);
}

export default SiweMessageFromMobile;
