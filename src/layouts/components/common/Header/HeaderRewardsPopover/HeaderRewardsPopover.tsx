import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMediaQuery } from 'react-responsive';
import {
	Stack,
	Text,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Icon,
	Button,
} from '@chakra-ui/react';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { BiDiamond } from 'react-icons/bi';
import { HiFire } from 'react-icons/hi';
import { useLink } from '@/hooks';
import OxImg from '@/../public/assets/svg/icon-ox-points-01.png';
import { zIndexPop } from '@/utils/zIndex';

type HeaderPopType = {
	isLogin: boolean;
	onModalOpen: () => void;
	onModalClose: () => void;
};

function HeaderRewardsPopover({ isLogin, onModalOpen, onModalClose }: HeaderPopType) {
	// for Pop
	const { isOpen: isPopOpen, onToggle, onClose: onPopClose, onOpen: onPopOpen } = useDisclosure();

	const router = useRouter();

	const { t } = useTranslation();

	const { link } = useLink();

	// const { open } = useWeb3Modal();

	const isMini = useMediaQuery({
		query: '(min-width: 375px)',
	});

	const isDeskTopForRewardsButton = useMediaQuery({
		query: '(min-width: 500px)',
	});

	const renderContent = () => {
		return (
			<Stack
				py={'22px'}
				mt={!isMini ? '32px' : ''}
				mb={!isMini ? '44px' : ''}
				mx={'16px'}
				spacing={'4px'}
				textAlign={'left'}
				borderBottom={'1px'}
				borderColor={'gray.100'}
				gap={'14px'}
			>
				<Stack gap={'12px'} direction="row" alignItems={'center'}>
					<Icon as={BiDiamond} w={'20px'} h={'20px'} />
					<Text
						onClick={() => {
							router.push('/rewardtasks');
							onPopClose();
						}}
						cursor={'pointer'}
						size={'md'}
						color={'gray.800'}
					>
						{t('reward_tasks')}
					</Text>
				</Stack>
				<Stack gap={'12px'} direction="row" alignItems={'center'}>
					<Icon as={HiOutlineUserAdd} w={'20px'} h={'20px'} />
					<Text
						onClick={() => {
							router.push('/referral');
							onPopClose();
						}}
						cursor={'pointer'}
						size={'md'}
						color={'gray.800'}
					>
						{t('referral')}
					</Text>
				</Stack>
				<Stack gap={'12px'} direction="row" alignItems={'center'}>
					<Image src={OxImg} width={20} height={20} alt="socialPng" />
					<Text
						onClick={() => {
							router.push('/oxpoints');
							onPopClose();
						}}
						cursor={'pointer'}
						size={'md'}
						color={'gray.800'}
					>
						{t('ox_points')}
					</Text>
				</Stack>
			</Stack>
		);
	};

	return (
		<>
			<Popover
				placement={isDeskTopForRewardsButton ? 'bottom-start' : 'bottom'}
				isOpen={isPopOpen}
				onClose={() => {
					onPopClose();
				}}
			>
				<PopoverTrigger>
					<Button
						size={'sm'}
						onClick={onToggle}
						rounded={'lg'}
						gap={isDeskTopForRewardsButton ? '8px' : '4px'}
						variant="outline"
						bgGradient="linear(to-r, #D53F8C, #FA48A3)"
						color={'#fff'}
						_hover={{ bgGradient: 'linear(to-r, #D53F8C, #FA48A3)' }}
					>
						{t('rewards')} <Icon as={HiFire} boxSize={isDeskTopForRewardsButton ? 5 : 3} />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					maxW={'240px'}
					_focus={{ boxShadow: 'md' }}
					zIndex={zIndexPop}
					px={!isMini ? '6px' : ''}
					py={!isMini ? '22px' : ''}
					mt={'34px'}
					border={'1px'}
					borderColor={'transparent'}
					borderRadius={'12px'}
					bg={'#fff'}
					shadow={'md'}
				>
					{renderContent()}
				</PopoverContent>
			</Popover>
		</>
	);
}

export default HeaderRewardsPopover;
