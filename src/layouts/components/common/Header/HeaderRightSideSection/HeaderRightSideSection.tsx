import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useMediaQuery } from 'react-responsive';
import { useAccount, useDisconnect, useConnect, useBalance } from 'wagmi';
import {
	Heading,
	Stack,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Icon,
	ModalFooter,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
	Link,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BiWalletAlt } from 'react-icons/bi';
import {
	useSiwe,
	useLoginModal,
	useContract,
	useContractForRead,
	useDepositUsdtModal,
} from '@/hooks';
import { CommunityIcon } from '../../../../../../public/assets/svg';
import SocialPng from './social.png';
import HeaderPopover from '../HeaderPopover';
import LoggedInfoSectioin from '../LoggedInfoSection';
import LoggedMenuSection from '../LoggedMenuSection';
import { zIndexHeader } from '@/utils/zIndex';

function HeaderRightSideSection() {
	const router = useRouter();

	const { t } = useTranslation();
	// const { open } = useWeb3Modal();
	const { status } = useAccount();
	const { disconnect } = useDisconnect();
	const { connectAsync } = useConnect();
	// const { signInWithEthereum, connectWallet } = useSiwe();
	// const { write, isLoading: contractIsLoading } = useContract();
	const { ethValue } = useContractForRead();

	const isMini = useMediaQuery({
		query: '(min-width: 375px)',
	});

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	const {
		ModalDom: DepositModalDom,
		isOpen: depositModalIsOpen,
		onOpen: depositModalOnOpen,
		onClose: depositModalOnClose,
	} = useDepositUsdtModal();

	const { isAuthenticated, user, userFunds, portfolioValue } = useSelector(
		(state: RootState) => state.authReducer
	);

	const { data, isError, isLoading } = useBalance({ address: user.address as `0x${string}` });

	// full Modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isLogin = status === 'connected' ? true : false;

	const triggerMeta = async () => {
		const { account, chain } = await connectAsync({
			connector: new MetaMaskConnector({}),
		});

		// signInWithEthereum(account);
	};

	const checkBalance = () => {
		if (isLoading)
			return (
				<div>
					<p>Fetching balance…</p>
				</div>
			);
		if (isError)
			return (
				<div>
					<p>Error fetching balance</p>
				</div>
			);

		// return `$${ethValue.toLocaleString()} USDT`;
		return portfolioValue?.toFixed(2);
	};

	const renderModalContent = () => {
		if (isAuthenticated) {
			return (
				<>
					<ModalBody overflowY={'scroll'}>
						<Stack mt={'24px'}>
							<LoggedInfoSectioin close={onClose} />
							<Stack w={'100%'} h={'1px'} bg={'gray.100'} mt={'8px'} />
						</Stack>
						<Stack align={'center'}>
							<LoggedMenuSection close={onClose} type="modal" isMini={isMini} />
							<Heading mt={'0px'} mb={'16px'} size={'xs'} color={'gray.800'}>
								{t('community')}
							</Heading>
							<Link
								href="https://t.me/+0U48zkxj9Lw5NTc1"
								isExternal
								_hover={{ textDecoration: 'none' }}
							>
								<Image src={SocialPng} width={36} height={36} alt="socialPng" />
							</Link>
						</Stack>
						<ModalFooter h={'100px'} />
					</ModalBody>
					<Stack
						onClick={() => {
							onClose();
							depositModalOnOpen();
						}}
						w={'100%'}
						flexDirection="row"
						position="fixed"
						bottom={0}
						zIndex={zIndexHeader}
						pl={6}
						pr={6}
						pt={4}
						pb={4}
						bg={'#FFFFFF'}
						borderColor={'black'}
						borderTop="1px solid #E2E8F0;"
					>
						<Button w={'100%'} size="lg" colorScheme="teal">
							{t('deposit')}
						</Button>
					</Stack>
				</>
			);
		}

		return (
			<>
				<ModalBody>
					<Stack gap={'12px'} mt={'24px'} alignItems={'center'} position={'relative'}>
						<Text
							onClick={() => {
								onClose();
								router.push('./markets');
							}}
							cursor="pointer"
							fontSize="2xl"
							color="gray.800"
						>
							{t('markets')}
						</Text>
						<Link
							href="https://oxmarket.gitbook.io/howitworks"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Text cursor="pointer" fontSize="2xl" color="gray.800">
								{t('how_it_work_center')}
							</Text>
						</Link>
						<Heading mt={'60px'} size={'md'} color={'gray.800'} mb={'16px'}>
							{t('community')}
						</Heading>
						<Link
							href="https://t.me/+0U48zkxj9Lw5NTc1"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Image src={SocialPng} width={36} height={36} alt="socialPng" />
						</Link>
						{/* <Icon cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} mt={'16px'} /> */}
					</Stack>
				</ModalBody>
				<Stack
					w={'100%'}
					flexDirection="row"
					position="fixed"
					bottom={0}
					zIndex={zIndexHeader}
					pl={6}
					pr={6}
					pt={4}
					pb={4}
					bg={'#FFFFFF'}
					borderColor={'black'}
					borderTop="1px solid #E2E8F0;"
				>
					{/* <Button
						onClick={() => {
							onClose();
							isLogin ? disconnect() : open();
						}}
						leftIcon={<Icon as={BiWalletAlt} />}
						w={'100%'}
						size="lg"
						bg="teal.500"
						color="#fff"
					>
						{isLogin ? 'Disconnect' : 'Connect Wallet'}
					</Button> */}
				</Stack>
			</>
		);
	};

	return (
		<Stack direction="row" alignItems="center" spacing={6}>
			<Stack
				direction={'row'}
				align={'center'}
				spacing={{ base: '8px', sm: '8px', md: '32px', lg: '32px' }}
			>
				{isAuthenticated ? (
					<Stack
						// display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
						direction={'row'}
						align={'center'}
						spacing={'16px'}
					>
						<Stack
							display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
							p={'12px'}
							_hover={{ bg: 'gray.100', p: '12px', borderRadius: 6 }}
							onClick={() => router.push('/portfolio')}
							cursor={'pointer'}
						>
							<Text fontSize={'md'} color={'gray.800'} lineHeight={'12px'}>
								{checkBalance()}
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								{t('portfolio')}
							</Heading>
						</Stack>
						<Stack
							display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
							p={'12px'}
							_hover={{ bg: 'gray.100', p: '12px', borderRadius: 6 }}
							onClick={() => router.push('/funds')}
							cursor={'pointer'}
						>
							<Text fontSize={'16px'} color={'gray.800'} lineHeight={'12px'}>
								{`$${userFunds?.hold?.toFixed(2)}`}
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								{t('funds')}
							</Heading>
						</Stack>
						<Button
							onClick={() => depositModalOnOpen()}
							// w={'108px'}
							// h={'40px'}
							size={'md'}
							colorScheme="teal"
						>
							{t('deposit')}
						</Button>
					</Stack>
				) : (
					<>
						<Heading
							onClick={() => modalOnOpen()}
							// onClick={() => (status === 'disconnected' ? triggerMeta() : disconnect())}
							display={{ lg: 'inline', md: 'none', sm: 'none' }}
							cursor="pointer"
							size="sm"
							color="gray.800"
						>
							{t('connect')}
						</Heading>
					</>
				)}
				<HeaderPopover
					isLogin={isAuthenticated !== null && isAuthenticated}
					onModalOpen={onOpen}
					onModalClose={onClose}
				/>
			</Stack>

			<Modal size="full" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent _focus={{ boxShadow: 'md' }} maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} size="lg" mt={1} mr={2} />
					{renderModalContent()}
				</ModalContent>
			</Modal>
			{modalIsOpen && ModalDom}
			{depositModalIsOpen && DepositModalDom}
		</Stack>
	);
}

export default HeaderRightSideSection;
