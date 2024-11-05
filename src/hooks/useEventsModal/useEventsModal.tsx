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
	Collapse,
} from '@chakra-ui/react';
import { useUtility } from '@/hooks';
import { zIndexQRCodeModal } from '@/utils/zIndex';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, showToast, AppDispatch, resetUserPromotionsRedeem } from '@/store';
import { Promotions } from '@/api';
import { postPromotionsRedeem, getPoints } from '@/store/thunks/fetchPoint';

function useEventsModal() {
	const { t } = useTranslation();

	const dispatch = useDispatch<AppDispatch>();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { formatAllDate, checkPromotionsRedeemStatusCode } = useUtility();

	const [modalData, setModalData] = useState<Promotions>();

	const { isUserPromotionsRedeemLoading, userPromotionsRedeemStatusCode } = useSelector(
		(state: RootState) => state.pointReducer
	);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	useEffect(() => {
		if (userPromotionsRedeemStatusCode === 201) {
			dispatch(showToast({ title: t('redemption_successful'), isSuccess: true })); // 呈現兌換成功 toast
			dispatch(getPoints({ page: 1, take: 20 })); // 更新 User Point
			dispatch(resetUserPromotionsRedeem({})); // reset 兌換 API 的 status code 為 0
			onClose(); // 關閉 Modal
		}
	}, [userPromotionsRedeemStatusCode, onClose, dispatch, t]);

	const ModalDom = useMemo(
		() => (
			<>
				<Modal
					size={isDesktop ? 'lg' : 'full'}
					isOpen={isOpen}
					onClose={() => {
						dispatch(resetUserPromotionsRedeem({}));
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
							<Stack mb={8} justify={'center'}>
								<Stack mb={'20px'} direction={'row'}>
									<Stack direction={'row'}>
										<Heading size="lg" color="gray.700">
											{modalData?.title}
										</Heading>
									</Stack>
								</Stack>
								<Stack>
									<Heading onClick={e => null} size="sm" color="gray.800">
										{t('redemption_period')}
									</Heading>
									<Text color={'#1A202C'} fontSize={'md'}>
										{`${formatAllDate(modalData?.startAt || '')} - ${formatAllDate(
											modalData?.endAt || ''
										)} (GMT+8)`}
									</Text>
								</Stack>
							</Stack>
							<Stack>
								<Stack>
									<Heading onClick={e => null} size="sm" color="gray.800">
										{t('instructions')}
									</Heading>
								</Stack>
								<Stack ml={4}>
									<div dangerouslySetInnerHTML={{ __html: `${modalData?.description}` }} />
								</Stack>
							</Stack>
							<Button
								isLoading={isUserPromotionsRedeemLoading}
								size={'lg'}
								mt={8}
								w={'100%'}
								colorScheme="teal"
								color="#fff"
								onClick={() => {
									dispatch(postPromotionsRedeem({ id: modalData?.id as string }));
								}}
							>
								{t('confirm_redeem')}
							</Button>
							<Stack h={6}>
								<Collapse in={true} animateOpacity>
									<Text color="#FF0000" size="sm">
										{checkPromotionsRedeemStatusCode(userPromotionsRedeemStatusCode)}
									</Text>
								</Collapse>
							</Stack>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		),
		[
			checkPromotionsRedeemStatusCode,
			dispatch,
			formatAllDate,
			isDesktop,
			isOpen,
			isUserPromotionsRedeemLoading,
			modalData?.description,
			modalData?.endAt,
			modalData?.id,
			modalData?.startAt,
			modalData?.title,
			onClose,
			userPromotionsRedeemStatusCode,
			t,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose, setModalData };
}

export default useEventsModal;
