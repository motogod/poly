import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heading, Stack, useToast } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginWithGoogle, RootState, resetCheckAuthToast } from '@/store';
import HeaderRightSideSection from './HeaderRightSideSection';

import { PrimaryPink } from '@/utils/color';
import { headerHeight, paddingMainHorizontal } from '@/utils/screen';
import { zIndexHeader } from '@/utils/zIndex';

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

function Header() {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();
	const toast = useToast();

	const { isAuthenticated, checkAuthSuccess, checkAuthTitle } = useSelector(
		(state: RootState) => state.authReducer
	);
	// 統一放在 Header 這邊來顯示登入時的提醒視窗
	useEffect(() => {
		console.log('Header useEffect isAuthenticated', isAuthenticated);
		if (checkAuthSuccess) {
			toast({
				title: checkAuthTitle,
				position: 'top',
				status: 'success',
				duration: 2000,
				isClosable: true,
			});

			dispatch(resetCheckAuthToast());
		}
	}, [isAuthenticated, checkAuthSuccess, toast, checkAuthTitle, dispatch]);

	return (
		<Stack
			px={paddingMainHorizontal}
			py={{ md: '12px', sm: '4px' }}
			w="100%"
			h={headerHeight}
			position="fixed"
			zIndex={zIndexHeader}
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
