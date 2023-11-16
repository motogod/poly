import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import NewWindow from 'react-new-window';
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
	Input,
	Text,
	Spinner,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';
import { useConnect, useDisconnect, useAccount, useNetwork } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginWithGoogle, RootState } from '@/store';
import { useSiwe } from '@/hooks';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';

function useLoadingConnectModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { address } = useAccount();
	const { chain } = useNetwork();

	const ModalDom = useMemo(
		() => (
			<>
				<Modal size={'full'} isOpen={isOpen} onClose={() => onClose()}>
					<ModalOverlay zIndex="10" />
					<ModalContent
						containerProps={{
							zIndex: '10',
						}}
						bg={'#fff'}
						_focus={{ boxShadow: 'md' }}
						maxHeight="100vh"
						borderRadius={20}
						borderBottomRadius={0}
						p={'16px'}
					>
						<ModalHeader alignSelf={'center'}>Connect Wallet</ModalHeader>

						<ModalBody>
							<Stack mt={'12px'} align={'center'}>
								<Stack align={'center'} justify={'center'}>
									<Icon w={'32px'} h={'32px'} as={WalletConnectIcon} />
									<Spinner
										size={'xl'}
										thickness="4px"
										speed="0.65s"
										emptyColor="gray.200"
										color="blue.500"
										position={'absolute'}
									/>
								</Stack>
								<Text mt={'12px'} fontSize="xl" color="gray.800">
									Please sign the message in your WalletConnect compatible wallet to connect to
									market.
								</Text>
								<Text mt={'12px'} fontSize="xl" color="gray.800">
									{`address ${address}`}
								</Text>
								<Text mt={'12px'} fontSize="xl" color="gray.800">
									{`chain ${chain}`}
								</Text>
							</Stack>
						</ModalBody>

						{/* <ModalFooter></ModalFooter> */}
					</ModalContent>
				</Modal>
			</>
		),
		[isOpen, onClose]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useLoadingConnectModal;
