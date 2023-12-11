import React, { useEffect, useMemo, useState } from 'react';
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
	Text,
	Button,
	Icon,
} from '@chakra-ui/react';
import { TbAlertTriangle } from 'react-icons/tb';
import { zIndexQRCodeModal } from '@/utils/zIndex';

type Props = {
	selectedEther: 'ethereum' | 'arbitrum' | '';
};

function useMsgModal({ selectedEther }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const ModalDom = useMemo(
		() => (
			<>
				<Modal
					size={isDesktop ? 'lg' : 'full'}
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
							<Stack direction={'row'} align={'center'}>
								<Icon as={TbAlertTriangle} boxSize={4} color={'yellow.500'} />
								<Heading size="md" color="gray.700">
									Important
								</Heading>
							</Stack>
						</ModalHeader>
						<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack justify={'center'} align={'center'}>
								<Stack mb={'20px'} direction={'row'}>
									<Text>
										<b style={{ fontWeight: 'bold' }}>Remember: </b>
										{`When sending USDT to this address from an exchange, like Coninbase or
									Binance, make sure to select `}
										<u style={{ fontWeight: 'bold' }}>{selectedEther}</u> as the network or you may
										lose your funds.
									</Text>
								</Stack>
								<Button w={'100%'} bg={'teal.500'} color="#fff" onClick={() => onClose()}>
									Got it
								</Button>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		),
		[isOpen, onClose, isDesktop, selectedEther]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useMsgModal;
