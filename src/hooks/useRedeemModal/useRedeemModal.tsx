import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
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
	Divider,
} from '@chakra-ui/react';
import { zIndexQRCodeModal } from '@/utils/zIndex';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, showToast, AppDispatch, postRedeemClaim } from '@/store';

type ModalDataType = {
	winnerType: 'YES' | 'NO';
	shares: number;
	outcome: 'YES' | 'NO';
	isUserWin: boolean;
	marketId: string;
};

function useRedeemModal() {
	const { t } = useTranslation();

	const dispatch = useDispatch<AppDispatch>();

	const [modalData, setModalData] = useState<ModalDataType>({
		winnerType: 'YES',
		shares: 0,
		outcome: 'YES',
		isUserWin: true,
		marketId: '',
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { isPostRedeemClaimLoading, isPostRedeemClaimSuccess } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	useEffect(() => {
		if (isPostRedeemClaimSuccess !== null) {
			const tradeResultTitle = isPostRedeemClaimSuccess
				? t('withdrawal_suceesfully')
				: t('withdrawal_failed');

			dispatch(showToast({ title: tradeResultTitle, isSuccess: isPostRedeemClaimSuccess }));

			onClose();
		}
	}, [dispatch, isPostRedeemClaimLoading, isPostRedeemClaimSuccess, onClose, t]);

	const getFeeResult = useCallback(() => {
		return modalData?.shares * 0.05;
	}, [modalData?.shares]);

	const getTotalClaim = useCallback(() => {
		if (modalData?.isUserWin) {
			return `$${(modalData?.shares - getFeeResult()).toFixed(2)}`;
		} else {
			return '$0.00';
		}
	}, [getFeeResult, modalData?.isUserWin, modalData?.shares]);

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
						<ModalHeader></ModalHeader>
						<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
						<ModalBody>
							<Stack mb={8} justify={'center'} align={'center'}>
								<Stack mb={'20px'} direction={'row'}>
									<Stack direction={'row'} align={'center'}>
										<Heading size="md" color="gray.700">
											{`Winners: ${modalData?.winnerType}`}
										</Heading>
									</Stack>
								</Stack>

								<Divider mb={6} mt={4} borderColor="gray.700" />

								<Stack direction={'row'} align={'center'}>
									<Heading size="md" color="gray.700">
										Your Earnings
									</Heading>
								</Stack>
							</Stack>
							<Stack spacing={2}>
								<Stack direction={'row'} align={'center'} justify={'space-between'}>
									<Text fontSize="sm" color="gray.700">
										{t('position')}
									</Text>
									<Heading size="sm" color={modalData?.outcome === 'YES' ? 'green.500' : 'red.500'}>
										{modalData?.outcome}
									</Heading>
								</Stack>
								<Stack direction={'row'} align={'center'} justify={'space-between'}>
									<Text fontSize="sm" color="gray.700">
										{t('shares')}
									</Text>
									<Text fontSize="sm" color="gray.700">
										${modalData?.shares.toFixed(2)}
									</Text>
								</Stack>
								<Stack direction={'row'} align={'center'} justify={'space-between'}>
									<Text fontSize="sm" color="gray.700">
										{t('value_per_share')}
									</Text>
									<Text fontSize="sm" color="gray.700">
										{modalData?.isUserWin ? '$1.00' : '$0.00'}
									</Text>
								</Stack>
								{modalData?.isUserWin && (
									<Stack direction={'row'} align={'center'} justify={'space-between'}>
										<Text fontSize="sm" color="gray.700">
											{`${t('fee')}(5%)`}
										</Text>
										<Text>{`$${getFeeResult()}`}</Text>
									</Stack>
								)}
							</Stack>
							<Stack mt={6} direction={'row'} align={'center'} justify={'space-between'}>
								<Text fontSize="sm" color="gray.700">
									{t('total')} {t('claim')}
								</Text>
								<Heading size="sm" color="gray.700">
									{getTotalClaim()}
								</Heading>
							</Stack>
							<Button
								isLoading={isPostRedeemClaimLoading}
								size={'lg'}
								mt={8}
								w={'100%'}
								colorScheme="teal"
								color="#fff"
								onClick={() => {
									dispatch(
										postRedeemClaim({ marketId: modalData?.marketId, outcome: modalData?.outcome })
									);
								}}
							>
								{t('claim')}
							</Button>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		),
		[
			isDesktop,
			isOpen,
			modalData?.winnerType,
			modalData?.outcome,
			modalData?.shares,
			modalData?.isUserWin,
			modalData?.marketId,
			t,
			getFeeResult,
			getTotalClaim,
			isPostRedeemClaimLoading,
			onClose,
			dispatch,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose, setModalData };
}

export default useRedeemModal;
