import React from 'react';
import { useRouter } from 'next/router';
import { useDisconnect } from 'wagmi';
import { Stack, Text } from '@chakra-ui/react';

type LoggedMenuSectionType = {
	close: () => void;
	type: 'pop' | 'modal';
};

function LoggedMenuSection({ close, type }: LoggedMenuSectionType) {
	const router = useRouter();

	const { disconnect } = useDisconnect();

	const textAlign = type === 'pop' ? 'left' : 'center';
	const spacing = type === 'pop' ? '4px' : '12px';

	return (
		<Stack
			py={'32px'}
			mt={'32px'}
			mb={'44px'}
			mx={'16px'}
			spacing={spacing}
			textAlign={textAlign}
			borderTop={type === 'pop' ? '1px' : '0px'}
			borderBottom={type === 'pop' ? '1px' : '0px'}
			borderColor={'gray.100'}
		>
			<Text
				onClick={() => {
					router.push('./portfolio');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				Profile
			</Text>
			<Text
				onClick={() => {
					router.push('./markets');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				Markets
			</Text>
			<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
				Leaderboard
			</Text>
			<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
				How it works
			</Text>
			<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
				Affiliate
			</Text>
			<Text
				cursor={'pointer'}
				onClick={() => {
					disconnect();
					close();
				}}
				size={'md'}
				color={'gray.800'}
			>
				Disconnect
			</Text>
		</Stack>
	);
}

export default LoggedMenuSection;
