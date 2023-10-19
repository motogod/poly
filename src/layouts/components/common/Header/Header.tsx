import React from 'react';
import { useRouter } from 'next/router';
import { Heading, Stack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import HeaderRightSideSection from './HeaderRightSideSection';

import { PrimaryPink } from '@/utils/color';
import { headerHeight } from '@/utils/screen';

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

function Header() {
	const router = useRouter();

	return (
		<Stack
			px={{ md: '116px', sm: '16px' }}
			py={{ md: 6, sm: 4 }}
			w="100%"
			h={headerHeight}
			position="fixed"
			zIndex={5}
			flexDirection="row"
			justifyContent="space-between"
			bg={'gray.50'}
			shadow={'md'}
		>
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircleIcon cursor="pointer" boxSize={12} color={PrimaryPink} />
				<Heading
					onClick={() => router.push('/')}
					cursor="pointer"
					size="md"
					color="gray.700"
					mr={5}
				>
					Gomarket
				</Heading>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					onClick={() => router.push('./markets')}
					cursor="pointer"
					size="sm"
					color="gray.800"
					mr={5}
				>
					Markets
				</Heading>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					How it works
				</Heading>
			</Stack>
			<HeaderRightSideSection />
		</Stack>
	);
}

export default Header;
