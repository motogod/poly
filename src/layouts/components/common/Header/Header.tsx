import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Heading, Stack } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getUserFunds, RootState, getPortfolioValue } from '@/store';
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

	const { t } = useTranslation();

	const dispatch = useDispatch<AppDispatch>();
	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getUserFunds({}));
			// 目前只能透過這隻 API 取得 User 的 Portfolio Value
			dispatch(getPortfolioValue({ marketId: '' }));
			setInterval(() => {
				dispatch(getUserFunds({}));
				dispatch(getPortfolioValue({ marketId: '' }));
			}, 60000);
		}
	}, [dispatch, isAuthenticated]);

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
					_hover={{ color: 'gray.600' }}
					onClick={() => router.push('/')}
					cursor="pointer"
					size="md"
					color="gray.700"
					mr={5}
				>
					Gomarket
				</Heading>
				<Heading
					_hover={{ color: 'gray.600' }}
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					onClick={() => router.push('/markets')}
					cursor="pointer"
					size="sm"
					color="gray.800"
					mr={5}
				>
					{t('markets')}
				</Heading>
				<Heading
					_hover={{ color: 'gray.600' }}
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					{t('how_it_works')}
				</Heading>
			</Stack>
			<HeaderRightSideSection />
		</Stack>
	);
}

export default Header;
