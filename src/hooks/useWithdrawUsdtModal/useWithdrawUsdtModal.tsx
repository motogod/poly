import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useAccount } from 'wagmi';
import { useMediaQuery } from 'react-responsive';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Text,
	Button,
	Stack,
	Input,
	FormControl,
	FormLabel,
	Heading,
	ModalCloseButton,
	Icon,
	InputGroup,
	Collapse,
} from '@chakra-ui/react';
import { TbAlertTriangle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, postWithdraw, showToast } from '@/store';
import { useContractForRead, useUtility, useBaseUrl, useSendTokens } from '@/hooks';
import { zIndexLoginModal } from '@/utils/zIndex';
import { UsdtIcon } from '@/../public/assets/svg';
import { resetWithdrawStatus } from '@/store/actions';

function useWithdrawUsdtModal() {
	const disaptch = useDispatch<AppDispatch>();

	const { t } = useTranslation();

	const [inputAddressValue, setInputAddressValue] = useState('');
	const [isAddressEmpty, setIsAddressEmpty] = useState(false);
	const [amountValue, setAmountValue] = useState<string>('');
	const [isAmountEmpay, setIsAmountEmpay] = useState(false);

	const { userFunds, isWithdrawSuccess, isWithdrawLoading } = useSelector(
		(state: RootState) => state.authReducer
	);

	const { address } = useAccount();

	const { ethValue } = useContractForRead();

	const { inputValueAndEthValueMsg, initInputAmountValue, inputAddressValueMsg } = useUtility();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const confirm = useCallback(() => {
		// 使用者按下執行按鈕之後 確認是否空欄位 顯示提醒告知訊息
		if (inputAddressValue === '') {
			setIsAddressEmpty(true);
			return;
		}

		if (amountValue === '') {
			setIsAmountEmpay(true);
			return;
		}

		setIsAddressEmpty(false);
		setIsAmountEmpay(false);

		// 如果使用者輸入的數值不符合正確格式的 wallet address，返回不執行交易
		if (inputAddressValueMsg(inputAddressValue) !== '') {
			return;
		}

		// 如果使用者輸入的數值不符合正確格式或範圍內的 amount，返回不執行交易
		if (inputValueAndEthValueMsg(amountValue, userFunds.hold, 'withdraw')) {
			return;
		}

		disaptch(postWithdraw({ address: inputAddressValue, amount: Number(amountValue) }));
	}, [
		inputAddressValue,
		amountValue,
		inputAddressValueMsg,
		inputValueAndEthValueMsg,
		userFunds.hold,
		disaptch,
	]);

	useEffect(() => {
		// 開啟 Modal 資料恢復為預設
		setInputAddressValue('');
		setIsAddressEmpty(false);
		setAmountValue('');
		setIsAmountEmpay(false);
	}, [isOpen]);

	useEffect(() => {
		if (isWithdrawSuccess !== null) {
			if (isWithdrawSuccess) {
				disaptch(
					showToast({
						isSuccess: true,
						title: t('the_withdrawal_is_currently_under_review'),
					})
				);
				onClose();
			} else {
				disaptch(showToast({ isSuccess: false, title: t('withdrawal_failed') }));
			}
		}

		disaptch(resetWithdrawStatus());
	}, [onClose, isWithdrawSuccess, disaptch, t]);

	const ModalDom = useMemo(
		() => (
			<Modal size={isDesktop ? 'lg' : 'full'} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay zIndex={zIndexLoginModal} />
				<ModalContent
					containerProps={{
						zIndex: zIndexLoginModal,
					}}
					_focus={{ boxShadow: 'md' }}
					maxHeight="100vh"
					borderRadius={20}
					borderBottomRadius={isDesktop ? 20 : 0}
					p={'16px'}
				>
					<ModalHeader>
						<Stack direction={'row'} align={'center'}>
							<Icon as={UsdtIcon} boxSize={8} />
							<Heading size="md" color="gray.700" mr={5}>
								{`${t('withdraw')} USDT`}
							</Heading>
						</Stack>
					</ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
					<ModalBody>
						<Stack p={4} bg="gray.200" borderRadius={10} display={'flex'} flexDirection={'row'}>
							<Stack>
								<Icon mt={'2px'} as={TbAlertTriangle} boxSize={4} color={'yellow.500'} />
							</Stack>
							<Stack>
								<Text fontSize="sm" color="gray.800">
									{t('only_send_to_a_usdt_address')}
								</Text>
							</Stack>
						</Stack>
						<FormControl mt={'10px'}>
							<Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
								<FormLabel fontWeight={'800'}>{t('address')}</FormLabel>
								{address && (
									<Text
										textDecoration={'underline'}
										cursor={'pointer'}
										onClick={() => {
											setInputAddressValue(address as `0x${string}`);
											setIsAddressEmpty(false);
										}}
										fontSize={'small'}
										color={'gray.500'}
									>
										{t('use_connected')}
									</Text>
								)}
							</Stack>
							<InputGroup>
								<Input
									minLength={0}
									value={inputAddressValue}
									autoCapitalize={'none'}
									onChange={e => {
										if (e.target.value) {
											setIsAddressEmpty(false);
										}
										setInputAddressValue(e.target.value);
									}}
									placeholder={'0x...'}
									border="2px solid #E2E8F0;"
								/>
							</InputGroup>
							<Collapse
								in={isAddressEmpty ? true : inputAddressValueMsg(inputAddressValue) !== ''}
								animateOpacity
							>
								<Text fontSize={'sm'} mt={1} color={'red.500'}>
									{isAddressEmpty
										? t('please_enter_a_avlid_address')
										: inputAddressValueMsg(inputAddressValue)}
								</Text>
							</Collapse>
						</FormControl>
						<FormControl mt={'10px'}>
							<Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
								<FormLabel fontWeight={'800'}>{t('amount')}</FormLabel>
								<Text
									cursor={'pointer'}
									onClick={() => {
										setAmountValue(String(userFunds.hold));
										setIsAmountEmpay(false);
									}}
									fontSize={'small'}
									color={'gray.500'}
								>
									{`$${userFunds.hold} ${t('available_max')}`}
								</Text>
							</Stack>
							<Input
								position={'relative'}
								value={initInputAmountValue(amountValue)}
								autoCapitalize={'none'}
								pl={5}
								onChange={e => {
									if (e.target.value) {
										setIsAmountEmpay(false);
									}
									const changeValue = e.target.value.replaceAll(',', '');

									// 非數字系列或逗點，不儲存進輸入欄位
									if (!isNaN(Number(changeValue))) {
										setAmountValue(changeValue);
									}
								}}
								placeholder={'$'}
								border="2px solid #E2E8F0;"
							/>
							<Text position={'absolute'} top={'41px'} left={2}>
								{amountValue && '$'}
							</Text>
							<Collapse
								in={
									isAmountEmpay
										? true
										: inputValueAndEthValueMsg(amountValue, userFunds.hold, 'withdraw') !== ''
								}
								animateOpacity
							>
								<Text fontSize={'sm'} mt={1} color={'red.500'}>
									{isAmountEmpay
										? 'Please enter amount'
										: inputValueAndEthValueMsg(amountValue, userFunds.hold, 'withdraw')}
								</Text>
							</Collapse>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Stack w={'100%'} align={'center'}>
							<Button
								isLoading={isWithdrawLoading}
								// isDisabled={amountValue === '' || inputAddressValue === ''}
								w={'100%'}
								bg={'teal.500'}
								color="#fff"
								onClick={() => confirm()}
							>
								{t('withdraw')}
							</Button>
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[
			isDesktop,
			isOpen,
			onClose,
			inputAddressValue,
			isAddressEmpty,
			inputAddressValueMsg,
			userFunds.hold,
			initInputAmountValue,
			amountValue,
			isAmountEmpay,
			inputValueAndEthValueMsg,
			isWithdrawLoading,
			address,
			confirm,
			t,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useWithdrawUsdtModal;
