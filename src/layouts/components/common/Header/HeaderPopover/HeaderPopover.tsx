import React from 'react';
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
import LoggedInfoSection from '../LoggedInfoSection';
import LoggedMenuSection from '../LoggedMenuSection';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';
import { zIndexPop } from '@/utils/zIndex';

type HeaderPopType = {
	isLogin: boolean;
	onModalOpen: () => void;
	onModalClose: () => void;
};

function HeaderPopover({ isLogin, onModalOpen, onModalClose }: HeaderPopType) {
	// for Pop
	const { isOpen: isPopOpen, onToggle, onClose: onPopClose, onOpen: onPopOpen } = useDisclosure();

	const router = useRouter();

	const { t } = useTranslation();

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
					<PopoverFooter>
						<Heading size={'sx'} color={'gray.800'} fontWeight={'800'}>
							{t('community')}
						</Heading>
						<Link
							href="https://t.me/+0U48zkxj9Lw5NTc1"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Icon mt={'16px'} cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} />
						</Link>
					</PopoverFooter>
				</>
			);
		}

		return (
			<Stack gap={'12px'} mt={'24px'} alignItems={'center'} position={'relative'}>
				{/* <Text
					onClick={() => {
						onPopClose();
						open();
					}}
					cursor="pointer"
					fontSize="md"
					color="gray.800"
				>
					Connect
				</Text> */}
				<Text
					onClick={() => {
						onPopClose();
						router.push('/markets');
					}}
					cursor="pointer"
					fontSize="md"
					color="gray.800"
				>
					{t('markets')}
				</Text>
				<Link
					href="https://oxmarket.gitbook.io/howitworks"
					isExternal
					_hover={{ textDecoration: 'none' }}
				>
					<Text cursor="pointer" fontSize="md" color="gray.800">
						{t('how_it_work_center')}
					</Text>
				</Link>
				<Heading mt={'20px'} size={'md'} color={'gray.800'}>
					{t('community')}
				</Heading>
				<Link href="https://t.me/+0U48zkxj9Lw5NTc1" isExternal _hover={{ textDecoration: 'none' }}>
					<Icon
						cursor={'pointer'}
						as={CommunityIcon}
						w={'36px'}
						h={'36px'}
						mt={'6px'}
						mb={'10px'}
					/>
				</Link>
			</Stack>
		);
	};

	return (
		<>
			<Popover
				placement="bottom-end"
				isOpen={isPopOpen}
				// onClose={() => {
				// 	onPopClose();
				// }}
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
