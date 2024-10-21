import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useDisconnect } from 'wagmi';
import { useSession, signOut } from 'next-auth/react';
import { Stack, Text, Link } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logout, AppDispatch } from '@/store';
import { useLink } from '@/hooks';

type LoggedMenuSectionType = {
	close: () => void;
	type: 'pop' | 'modal';
	isMini: boolean;
};

function LoggedMenuSection({ close, type, isMini }: LoggedMenuSectionType) {
	const router = useRouter();

	const { t } = useTranslation();

	const { link } = useLink();

	const { disconnect } = useDisconnect();
	const { data: session } = useSession();

	const disaptch = useDispatch<AppDispatch>();

	const textAlign = type === 'pop' ? 'left' : 'center';
	const spacing = type === 'pop' ? '4px' : '12px';

	return (
		<Stack
			py={'32px'}
			mt={!isMini ? '32px' : ''}
			mb={!isMini ? '44px' : ''}
			mx={'16px'}
			spacing={spacing}
			textAlign={textAlign}
			borderTop={type === 'pop' ? '1px' : '0px'}
			borderBottom={type === 'pop' ? '1px' : '0px'}
			borderColor={'gray.100'}
		>
			<Text
				onClick={() => {
					router.push('./profile');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				{t('profile_settings')}
			</Text>
			<Text
				onClick={() => {
					router.push('/markets');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				{t('markets')}
			</Text>
			<Link href={link().howItWorksLink} isExternal _hover={{ textDecoration: 'none' }}>
				<Text
					onClick={() => {
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					{t('logged_menu_how_it_works')}
				</Text>
			</Link>
			<Text
				onClick={() => {
					router.push('/referral');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				{t('referral_program')}
			</Text>
			<Text
				onClick={() => {
					router.push('/oxpoints');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				OX Points
			</Text>
			<Text
				onClick={() => {
					router.push('/rewardtasks');
					close();
				}}
				cursor={'pointer'}
				size={'md'}
				color={'gray.800'}
			>
				Reward Tasks
			</Text>
			<Link href={link().rewardsLink} isExternal _hover={{ textDecoration: 'none' }}>
				<Text
					onClick={() => {
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					{t('rewards')}
				</Text>
			</Link>
			<Text
				cursor={'pointer'}
				onClick={() => {
					// server 登出
					disaptch(logout({}));
					// 若有 google 的登入資料在瀏覽器，登出刪除
					if (session) {
						signOut({ redirect: false });
					}
					// 關閉錢包連結
					disconnect();
					// 關閉彈跳視窗
					close();
					router.replace('./');
				}}
				size={'md'}
				color={'gray.800'}
			>
				{t('logout')}
			</Text>
		</Stack>
	);
}

export default LoggedMenuSection;
