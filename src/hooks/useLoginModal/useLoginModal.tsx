import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import {
	Stack,
	Button,
	Heading,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Icon,
	Box,
	Divider,
	AbsoluteCenter,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { useSiwe } from '@/hooks';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';

function useLoginModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { signInWithEthereum } = useSiwe();

	// callback onSuccess 登入成功時，簽名
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
		onSuccess(data, variables, context) {
			const { account, chain } = data;
			signInWithEthereum(account, chain.id);
		},
	});

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const isWebsiteAgent = () => {
		if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Android')) {
			return false;
		}

		return true;
	};

	const ModalDom = useMemo(
		() => (
			<>
				<Modal size={isDesktop ? 'lg' : 'full'} isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent
						_focus={{ boxShadow: 'md' }}
						maxHeight="100vh"
						borderRadius={20}
						borderBottomRadius={isDesktop ? 20 : 0}
						p={'16px'}
					>
						<ModalHeader>
							<Heading size="md" color="gray.700" mr={5}>
								Connect
							</Heading>
						</ModalHeader>
						<ModalCloseButton size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack>
								<Button
									onClick={async () => {
										await signIn('google');
										onClose();
									}}
									leftIcon={<Icon as={FcGoogle} />}
									w={'100%'}
									size="lg"
									bg={'#fff'}
									border="2px solid #E2E8F0;"
									color="black"
								>
									Sign in with Google
								</Button>
								<Box position="relative" pt={5} pb={5} pl={20} pr={20}>
									<Divider color={'gray.500'} />
									<AbsoluteCenter color={'gray.500'} bg="white" px="4">
										OR
									</AbsoluteCenter>
								</Box>
								<Stack direction={'row'}>
									{connectors.map(connector => (
										<Button
											isLoading={isLoading}
											// disabled={!connector.ready}
											leftIcon={
												<Icon as={connector.id === 'metaMask' ? MetaMaskIcon : WalletConnectIcon} />
											}
											key={connector.id}
											fontSize={{ base: 14, sm: 14, md: 14, lg: 17 }}
											onClick={() => {
												onClose();
												if (isWebsiteAgent()) {
													if (!connector.ready) {
														window.open('https://metamask.io/', '_blank');
													} else {
														connect({ connector });
													}
												} else {
													connect({ connector });
												}
											}}
											w={'100%'}
											size="lg"
											bg={'teal.500'}
											color="#fff"
											// justifyContent={'start'}
										>
											{connector.name}
											{isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
										</Button>
									))}
								</Stack>
							</Stack>
						</ModalBody>

						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>
				</Modal>
			</>
		),
		[isOpen, onClose, connect, connectors, isLoading, pendingConnector, isDesktop]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useLoginModal;