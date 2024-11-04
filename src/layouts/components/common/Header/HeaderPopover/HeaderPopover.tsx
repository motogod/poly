import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useMediaQuery } from 'react-responsive';
import { useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
	Heading,
	Stack,
	Text,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverFooter,
	Icon,
	Button,
	PopoverBody,
	Link,
} from '@chakra-ui/react';
import { BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import { useLink } from '@/hooks';
import LoggedInfoSection from '../LoggedInfoSection';
import LoggedMenuSection from '../LoggedMenuSection';
import { BiDiamond, BiLogOut, BiHelpCircle, BiChart } from 'react-icons/bi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';
import SocialIcon from '../../../../../../public/assets/svg/socialIcons.png';
import XIcon from '../../../../../../public/assets/svg/xicon.png';
import IgIcon from '../../../../../../public/assets/svg/igicon.png';
import { zIndexPop } from '@/utils/zIndex';
import { LocalesType } from '@/../public/locales/type';
import SocialMenuSection from '../SocialMenuSection';

type HeaderPopType = {
	isLogin: boolean;
	onModalOpen: () => void;
	onModalClose: () => void;
};

function HeaderPopover({ isLogin, onModalOpen, onModalClose }: HeaderPopType) {
	// for Pop
	const { isOpen: isPopOpen, onToggle, onClose: onPopClose, onOpen: onPopOpen } = useDisclosure();

	const router = useRouter();

	const locale = router.locale as LocalesType;

	const { t } = useTranslation();

	const { link } = useLink();

	// const { open } = useWeb3Modal();

	const isMini = useMediaQuery({
		query: '(min-width: 375px)',
	});

	const renderTriggerIcon = () => {
		if (isLogin) {
			return (
				<>
					<Icon as={ArbIcon} boxSize={5} borderRadius={'12px'} />
					<Icon as={BiMenuAltLeft} boxSize={6} />
				</>
			);
		}

		return (
			<>
				<Icon as={BiSolidUserCircle} boxSize={6} />
				<Icon as={BiMenuAltLeft} boxSize={6} />
			</>
		);
	};

	const renderContent = () => {
		if (isLogin) {
			return (
				<>
					<PopoverHeader>
						<LoggedInfoSection close={onPopClose} />
					</PopoverHeader>
					<LoggedMenuSection close={onPopClose} type="pop" isMini={isMini} />
					<PopoverFooter mt={'16px'} mb={'16px'}>
						<SocialMenuSection />
					</PopoverFooter>
				</>
			);
		}

		return (
			<>
				<Stack
					position={'relative'}
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
				</Stack>
				<Stack m={'16px'}>
					<SocialMenuSection />
				</Stack>
			</>
		);
	};

	return (
		<>
			<Popover
				placement="bottom-end"
				isOpen={isPopOpen}
				onClose={() => {
					onPopClose();
				}}
			>
				<PopoverTrigger>
					<Button
						onClick={onToggle}
						cursor={'pointer'}
						w={'74px'}
						h={'38px'}
						borderRadius={'19px'}
						border={'1px'}
						borderColor={'gray.400'}
						bg={'#fff'}
					>
						{renderTriggerIcon()}
					</Button>
				</PopoverTrigger>
				<PopoverContent
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

export default HeaderPopover;
