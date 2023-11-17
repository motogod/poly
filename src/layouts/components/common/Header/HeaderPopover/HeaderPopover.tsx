import React from 'react';
import { useRouter } from 'next/router';
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
} from '@chakra-ui/react';
import { BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import LoggedInfoSectioin from '../LoggedInfoSectioin';
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
	const { isOpen: isPopOpen, onToggle, onClose: onPopClose } = useDisclosure();

	const router = useRouter();

	// const { open } = useWeb3Modal();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const renderTriggerIcon = () => {
		if (isLogin) {
			return (
				<>
					<Icon as={ArbIcon} boxSize={5} borderRadius={'12px'} mr={'-8px'} />
					<Icon as={BiMenuAltLeft} boxSize={6} />
				</>
			);
		}

		return (
			<>
				<Icon as={BiSolidUserCircle} boxSize={6} mr={'-10px'} />
				<Icon as={BiMenuAltLeft} boxSize={6} />
			</>
		);
	};

	const renderContent = () => {
		if (isLogin) {
			return (
				<>
					<PopoverHeader>
						<LoggedInfoSectioin close={onPopClose} />
					</PopoverHeader>
					<LoggedMenuSection close={onPopClose} type="pop" />
					<PopoverFooter>
						<Heading size={'sx'} color={'gray.800'} fontWeight={'800'}>
							Community
						</Heading>
						<Icon mt={'16px'} cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} />
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
						router.push('./markets');
					}}
					cursor="pointer"
					fontSize="md"
					color="gray.800"
				>
					Markets
				</Text>
				<Text onClick={() => alert('Leaderboard')} cursor="pointer" size={'md'} color={'gray.800'}>
					Leaderboard
				</Text>
				<Text onClick={() => alert('How it works')} cursor="pointer" fontSize="md" color="gray.800">
					How it works
				</Text>
				<Text
					onClick={() => alert('Affilate')}
					cursor="pointer"
					fontSize="md"
					color="gray.800"
					fontWeight={'400'}
				>
					Affilate
				</Text>
				<Heading mt={'60px'} size={'md'} color={'gray.800'}>
					Community
				</Heading>
				<Icon cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} mt={'16px'} />
			</Stack>
		);
	};

	return (
		<>
			<Popover
				placement="bottom-start"
				isOpen={isPopOpen}
				onClose={() => {
					onPopClose();
				}}
			>
				<PopoverTrigger>
					<Stack
						onClick={() => {
							isDesktop ? onToggle() : onModalOpen();
						}}
						cursor={'pointer'}
						w={'74px'}
						h={'38px'}
						direction={'row'}
						align={'center'}
						justify={'center'}
						borderRadius={'19px'}
						border={'1px'}
						borderColor={'gray.400'}
					>
						{renderTriggerIcon()}
					</Stack>
				</PopoverTrigger>
				<PopoverContent
					_focus={{ boxShadow: 'md' }}
					zIndex={zIndexPop}
					px={'6px'}
					py={'22px'}
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
