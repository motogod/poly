import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useDisconnect } from 'wagmi';
import { useSession, signOut } from 'next-auth/react';
import { Stack, Text, Link, Icon } from '@chakra-ui/react';
import { HiCreditCard, HiOutlineUser, HiOutlineUserAdd } from 'react-icons/hi';
import { BiDiamond, BiLogOut, BiHelpCircle, BiChart } from 'react-icons/bi';
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
			py={'22px'}
			mt={!isMini ? '32px' : ''}
			mb={!isMini ? '44px' : ''}
			mx={'16px'}
			spacing={spacing}
			textAlign={textAlign}
			// borderTop={type === 'pop' ? '1px' : '0px'}
			borderBottom={type === 'pop' ? '1px' : '0px'}
			borderColor={'gray.100'}
			gap={'14px'}
		>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={HiOutlineUser} w={'20px'} h={'20px'} />
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
			</Stack>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={BiChart} w={'20px'} h={'20px'} />
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
			</Stack>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={BiHelpCircle} w={'20px'} h={'20px'} />
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
			</Stack>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={HiOutlineUserAdd} w={'20px'} h={'20px'} />
				<Text
					onClick={() => {
						router.push('/referral');
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					{t('referral')}
				</Text>
			</Stack>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={BiDiamond} w={'20px'} h={'20px'} />
				<Text
					onClick={() => {
						router.push('/rewardtasks');
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					{t('reward_tasks')}
				</Text>
			</Stack>
			<Stack gap={'12px'} direction="row" alignItems={'center'}>
				<Icon as={BiLogOut} w={'20px'} h={'20px'} />
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
						// router.replace('./'); 有導致閃屏現象，暫且改為直接 push 到首頁
						router.push('/home');
					}}
					size={'md'}
					color={'gray.800'}
				>
					{t('logout')}
				</Text>
			</Stack>
		</Stack>
	);
}

export default LoggedMenuSection;
