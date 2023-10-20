import React, { useEffect } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import TopTopicSection from './TopTopicSection';
import CategorySection from './CategorySection';
import HowItWorkSection from './HowItWorkSection';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '../../utils/screen';
import { TestApi } from '@/api';

interface loginTypes {
	auth: Array<string>;
	userInfo: {
		account: string;
		username: string;
	};
	token: string;
}

function Home() {
	useEffect(() => {
		console.log('Home');
		TestApi<loginTypes>({})
			.then(value => {
				console.log('TestApi', value);
			})
			.catch(err => console.log('TestApi err', err));
	}, []);

	return (
		<Stack backgroundColor="gray.50">
			<Stack mt={headerHeight}>
				<Stack mt={{ lg: '56px', md: '0px', sm: '0px' }}>
					<TopTopicSection />
				</Stack>
				<Stack px={paddingMainHorizontal} py={0}>
					<CategorySection />
				</Stack>
			</Stack>
			<Stack>
				<HowItWorkSection />
			</Stack>
			<Stack
				display={{ lg: 'none', md: 'inline', sm: 'inline' }}
				w={'100%'}
				flexDirection="row"
				position="fixed"
				bottom={0}
				zIndex={5}
				pl={6}
				pr={6}
				pt={4}
				pb={4}
				bg={'#FFFFFF'}
				borderColor={'black'}
				borderTop="1px solid #E2E8F0;"
			>
				<Button
					leftIcon={<Icon as={BiWalletAlt} />}
					w={'100%'}
					size="lg"
					bg="teal.500"
					color="#fff"
				>
					Connect Wallet
				</Button>
			</Stack>
		</Stack>
	);
}

export default Home;
