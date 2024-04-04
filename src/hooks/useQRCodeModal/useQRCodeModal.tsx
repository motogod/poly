import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import QRCode from 'react-qr-code';
import { useMediaQuery } from 'react-responsive';
import {
	Heading,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Stack,
} from '@chakra-ui/react';
import { useNetwork } from 'wagmi';
import { MetaMaskIcon, WalletConnectIcon } from '../../../public/assets/svg';
import { zIndexQRCodeModal } from '@/utils/zIndex';

type Props = {
	contractAddress: string;
	receiverAddress: string; // 存進去的帳戶 給 proxyWallet
	decimals: number;
	chainId: number;
};

function useQRCodeModal({ contractAddress, receiverAddress, decimals, chainId }: Props) {
	const [errorMsg, setErrorMsg] = useState('');

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { t } = useTranslation();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});
	console.log('decimals', decimals);
	const ModalDom = useMemo(
		() => (
			<>
				<Modal
					size={isDesktop ? 'sm' : 'full'}
					isOpen={isOpen}
					onClose={() => {
						onClose(); // 關閉視窗
					}}
				>
					<ModalOverlay zIndex={zIndexQRCodeModal} />
					<ModalContent
						containerProps={{
							zIndex: zIndexQRCodeModal,
						}}
						_focus={{ boxShadow: 'md' }}
						maxHeight="100vh"
						borderRadius={20}
						borderBottomRadius={isDesktop ? 20 : 0}
						p={'16px'}
					>
						<ModalHeader>
							<Heading textAlign={'center'} size="md" color="gray.700" mr={0}>
								{`${t('send')} USDT`}
							</Heading>
						</ModalHeader>
						<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack justify={'center'} align={'center'}>
								<QRCode
									value={`ethereum:${receiverAddress}`}
									// value={`https://metamask.app.link/send/0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9@42161/transfer?address=${receiverAddress}`}
								/>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		),
		[isOpen, onClose, isDesktop, receiverAddress, t]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useQRCodeModal;
