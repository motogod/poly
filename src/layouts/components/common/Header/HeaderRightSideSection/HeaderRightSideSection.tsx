import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useDisconnect, useConnect } from 'wagmi';
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
} from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useSiwe, useLoginModal } from '@/hooks';
import { CommunityIcon } from '../../../../../../public/assets/svg';
import SocialPng from './social.png';
import HeaderPopover from '../HeaderPopover';
import LoggedInfoSectioin from '../LoggedInfoSectioin';
import LoggedMenuSection from '../LoggedMenuSection';

function HeaderRightSideSection() {
	const router = useRouter();
	// const { open } = useWeb3Modal();
	const { status } = useAccount();
	const { disconnect } = useDisconnect();
	const { connectAsync } = useConnect();
	const { signInWithEthereum, connectWallet } = useSiwe();
	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	// full Modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isLogin = status === 'connected' ? true : false;

	const triggerMeta = async () => {
		const { account, chain } = await connectAsync({
			connector: new MetaMaskConnector({}),
		});

		// signInWithEthereum(account);
	};

	const renderModalContent = () => {
		if (isLogin) {
			return (
				<>
					<ModalBody overflowY={'scroll'}>
						<Stack mt={'24px'}>
							<LoggedInfoSectioin />
							<Stack w={'100%'} h={'1px'} bg={'gray.100'} mt={'8px'} />
						</Stack>
						<Stack align={'center'}>
							<LoggedMenuSection close={onClose} type="modal" />
							<Heading mt={'0px'} mb={'16px'} size={'xs'} color={'gray.800'}>
								Community
							</Heading>
							<Image src={SocialPng} width={36} height={36} alt="socialPng" />
						</Stack>
					</ModalBody>
					<Stack
						w={'100%'}
						flexDirection="row"
						position="fixed"
						bottom={0}
						zIndex={5}
						pl={6}
						pr={6}
						pt={4}
						pb={4}
						bg={'#FFFFFF'}
						borderColor={'black'}
						borderTop="1px solid #E2E8F0;"
					>
						<Button w={'100%'} size="lg" bg="teal.500" color="#fff">
							Deposit
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
							Markets
						</Text>
						<Text
							onClick={() => alert('Leaderboard')}
							cursor="pointer"
							fontSize="2xl"
							color="gray.800"
						>
							Leaderboard
						</Text>
						<Text
							onClick={() => alert('How it works')}
							cursor="pointer"
							fontSize="2xl"
							color="gray.800"
						>
							How it works
						</Text>
						<Text
							onClick={() => alert('Affilate')}
							cursor="pointer"
							fontSize="2xl"
							color="gray.800"
							fontWeight={'400'}
						>
							Affilate
						</Text>
						<Heading mt={'60px'} size={'md'} color={'gray.800'} mb={'16px'}>
							Community
						</Heading>
						<Image src={SocialPng} width={36} height={36} alt="socialPng" />
						{/* <Icon cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} mt={'16px'} /> */}
					</Stack>
				</ModalBody>
				<Stack
					w={'100%'}
					flexDirection="row"
					position="fixed"
					bottom={0}
					zIndex={5}
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
			<Stack direction={'row'} align={'center'} spacing={'32px'}>
				{isLogin ? (
					<Stack
						display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
						direction={'row'}
						align={'center'}
						spacing={'32px'}
					>
						<Stack onClick={() => router.push('./portfolio')} cursor={'pointer'}>
							<Text fontSize={'16px'} color={'gray.800'} lineHeight={'12px'}>
								$24000.73
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								Portfolio
							</Heading>
						</Stack>
						<Stack>
							<Text fontSize={'16px'} color={'gray.800'} lineHeight={'12px'}>
								$32000.16
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								Funds
							</Heading>
						</Stack>
						<Button w={'108px'} h={'40px'} size="md" bg="teal.500" color="#fff">
							Deposit
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
							Connect
						</Heading>
						<Heading
							display={{ lg: 'inline', md: 'none', sm: 'none' }}
							cursor="pointer"
							size="sm"
							color="gray.800"
						>
							Leaderboard
						</Heading>
					</>
				)}

				<HeaderPopover isLogin={isLogin} onModalOpen={onOpen} onModalClose={onClose} />
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
		</Stack>
	);
}

export default HeaderRightSideSection;
