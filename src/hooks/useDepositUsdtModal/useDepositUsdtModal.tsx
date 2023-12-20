import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { useMediaQuery } from 'react-responsive';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Select,
	Text,
	Button,
	Stack,
	Input,
	FormControl,
	FormLabel,
	Heading,
	ModalCloseButton,
	Grid,
	Icon,
	InputGroup,
	InputRightElement,
	Collapse,
} from '@chakra-ui/react';
import { HiQrcode } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, showToast, getCategories } from '@/store';
import {
	useContractForRead,
	useUtility,
	useBaseUrl,
	useSendTokens,
	useQRCodeModal,
	useMsgModal,
} from '@/hooks';
import { zIndexLoginModal } from '@/utils/zIndex';
import { UsdtIcon } from '@/../public/assets/svg';

type assetType = 'ethereumAsset' | '';
type etherType = 'ethereum' | 'arbitrum' | '';

function useDepositUsdtModal() {
	const disaptch = useDispatch<AppDispatch>();

	const [seleectedAsset, setSelectedAsset] = useState<assetType>('');
	const [selectedEther, setSelectedEther] = useState<etherType>('');
	const [inputValue, setInputValue] = useState<string>('');
	const [debounceInputValue] = useDebounce(inputValue, 500);

	const [isShowInputLayout, setIsShowInputLayout] = useState(true);
	const [isCopied, setIsCopied] = useState(false);

	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);

	const { chain: currentChain } = useNetwork();
	const { pendingChainId, switchNetwork, isSuccess } = useSwitchNetwork();

	const {
		write,
		isLoading,
		isSuccess: isDepositSuccess,
		prepareContractWriteError,
	} = useSendTokens({ usdtValue: debounceInputValue });
	const { ethValue, tokenDecimals, contractReadError } = useContractForRead();

	const { getContractAddress, inputValueAndEthValueMsg, initInputAmountValue } = useUtility();
	const baseUrl = useBaseUrl();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		ModalDom: qrcodeModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useQRCodeModal({
		contractAddress: getContractAddress(currentChain?.id as number),
		receiverAddress: proxyWallet,
		decimals: tokenDecimals,
		chainId: currentChain?.id as number,
	});

	const {
		ModalDom: msgModalDom,
		isOpen: msgModalIsOpen,
		onOpen: msgModalOnOpen,
		onClose: msgModalOnClose,
	} = useMsgModal({ selectedEther });

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const changeNetwork = useCallback(
		(ether: etherType) => {
			if (ether === 'ethereum') {
				switchNetwork?.(1);
			} else {
				process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')
					? switchNetwork?.(421614)
					: switchNetwork?.(42161);
			}
		},
		[switchNetwork, baseUrl]
	);

	useEffect(() => {
		// disaptch(getCategories());
		if (currentChain) {
			// 依據使用者一開始在哪條鏈上，來決定初始 Select 的值 不是在主鏈上就是 arbitrum
			let defaultEther: etherType = 'arbitrum';
			if (currentChain?.id === 1) {
				defaultEther = 'ethereum';
			}

			defaultEther === 'ethereum' ? setSelectedAsset('ethereumAsset') : setSelectedAsset('');
			setSelectedEther(defaultEther);
		}
	}, [currentChain, disaptch]);

	useEffect(() => {
		if (isDepositSuccess) {
			disaptch(showToast({ isSuccess: true, title: 'Deposit suceesfully' }));
			onClose();
		}
	}, [isDepositSuccess, onClose, disaptch]);

	// 測試 Error
	// useEffect(() => {
	// 	if (contractReadError) {
	// 		disaptch(showToast({ isShow: false, title: `contractRead ${contractReadError.message}` }));
	// 	}
	// }, [contractReadError, disaptch]);

	// 測試 Error
	// useEffect(() => {
	// 	if (prepareContractWriteError) {
	// 		disaptch(
	// 			showToast({ isShow: false, title: `contractWrite ${prepareContractWriteError.message}` })
	// 		);
	// 	}
	// }, [prepareContractWriteError, disaptch]);

	useEffect(() => {
		if (isSuccess) {
			// 切換鏈成功 改變 Select 上的值
			if (pendingChainId === 1) {
				setSelectedAsset('ethereumAsset');
				setSelectedEther('ethereum');
			} else {
				setSelectedAsset('');
				setSelectedEther('arbitrum');
			}
		}
	}, [isSuccess, pendingChainId]);

	const renderTitleMsg = useCallback(() => {
		if (selectedEther === 'ethereum') {
			return 'Send USDT (on Ethereum) and receive the equivalent value in your wallet in ~7 minutes.';
		}

		return 'Send USDT (on Arbitrum) and receive the equivalent value in your wallet in <1 minute.';
	}, [selectedEther]);

	// 顯示 Select 第二個選項要顯示 Arbitrum Goerli or Arbitrum One
	const renderArbitrumName = useCallback(() => {
		// 如果使用者目前在主鏈上，看是否為開發環境
		if (currentChain?.id === 1) {
			if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
				return 'Arbitrum Goerli';
			} else {
				return 'Arbitrum One';
			}
		}

		// 若不在主鏈上，則看當下是哪個來顯示
		if (currentChain?.id !== 1) {
			if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
				if (currentChain?.id === 421614) {
					return 'Arbitrum Sepolia';
				}
				if (currentChain?.id === 42161) {
					return 'Arbitrum One';
				}
			}
		}

		// 不在主鏈 也不在 Arbitrum，一率顯示 Arbitrum
		if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
			return 'Arbitrum Goerli';
		}

		return 'Arbitrum One';
	}, [currentChain, baseUrl]);

	const isChainOnEtherOrArbitrum = useCallback(() => {
		const currentChainId = currentChain?.id;
		if (currentChainId !== 1 && currentChainId !== 421614 && currentChainId !== 42161) {
			return false;
		}

		return true;
	}, [currentChain]);

	const renderConfirmText = useCallback(() => {
		if (!isChainOnEtherOrArbitrum()) {
			return 'Switch to Arbitrum';
		}

		return 'Confirm';
	}, [isChainOnEtherOrArbitrum]);

	const renderInputLayoutSection = useCallback(() => {
		if (isShowInputLayout) {
			return (
				<>
					<Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
						<FormLabel fontWeight={'800'}>Amount</FormLabel>
						<Text
							cursor={'pointer'}
							onClick={() => setInputValue(String(ethValue))}
							fontSize={'small'}
							color={'gray.500'}
						>
							{`$${ethValue} available Max`}
						</Text>
					</Stack>
					<Input
						position={'relative'}
						value={initInputAmountValue(inputValue)}
						autoCapitalize={'none'}
						pl={5}
						onChange={e => {
							const changeValue = e.target.value.replaceAll(',', '');

							// 非數字系列或逗點，不儲存進輸入欄位
							if (!isNaN(Number(changeValue))) {
								setInputValue(changeValue);
							}
						}}
						placeholder={''}
						border="2px solid #E2E8F0;"
					/>
					<Text position={'absolute'} top={'40px'} left={2}>
						{inputValue && '$'}
					</Text>
					<Collapse
						in={inputValueAndEthValueMsg(inputValue, ethValue, 'deposit') !== ''}
						animateOpacity
					>
						<Text fontSize={'sm'} mt={1} color={'red.500'}>
							{inputValueAndEthValueMsg(inputValue, ethValue, 'deposit')}
						</Text>
					</Collapse>
				</>
			);
		}

		return (
			<Grid
				flexDirection={'row'}
				templateColumns={{
					lg: '80% 18%',
					md: 'repeat(1, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={2}
			>
				<InputGroup>
					<Input
						cursor={'pointer'}
						isDisabled={true}
						type="number"
						bg={'gray.200'}
						defaultValue={proxyWallet}
						autoCapitalize={'none'}
						placeholder={proxyWallet}
						border="1px solid #E2E8F0;"
					/>
					<InputRightElement
						onClick={() => {
							modalOnOpen();
						}}
						cursor={'pointer'}
					>
						<Icon as={HiQrcode} w={'20px'} h={'20px'} />
					</InputRightElement>
				</InputGroup>
				<Button
					w={'100%'}
					bg={'teal.500'}
					color="#fff"
					onClick={() => {
						setIsCopied(true);
						setTimeout(() => {
							setIsCopied(value => !value);
							msgModalOnOpen();
						}, 1000);
						navigator.clipboard.writeText(proxyWallet);
					}}
				>
					{isCopied ? 'Copied' : 'Copy'}
				</Button>
			</Grid>
		);
	}, [
		isCopied,
		ethValue,
		inputValue,
		isShowInputLayout,
		proxyWallet,
		modalOnOpen,
		msgModalOnOpen,
		inputValueAndEthValueMsg,
		initInputAmountValue,
	]);

	const confirm = useCallback(() => {
		// 若在其他鏈上 不做交易 先讓使用者切換到 Arbitrum
		if (!isChainOnEtherOrArbitrum()) {
			if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
				switchNetwork?.(421614);
			} else {
				switchNetwork?.(42161);
			}

			return;
		}

		// 如果使用者輸入的數值不符合餘額範圍內，返回不執行交易
		if (inputValueAndEthValueMsg(inputValue, ethValue, 'deposit') !== '') {
			return;
		}

		write?.();
	}, [
		baseUrl,
		isChainOnEtherOrArbitrum,
		switchNetwork,
		inputValueAndEthValueMsg,
		ethValue,
		inputValue,
		write,
	]);

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
								Deposit USDT
							</Heading>
						</Stack>
					</ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} size={'lg'} m={'16px'} />
					<ModalBody>
						<Text fontSize={'sm'} mb={'20px'}>
							{renderTitleMsg()}
						</Text>
						<Grid
							flexDirection={'row'}
							templateColumns={{
								lg: '60% 38%',
								md: 'repeat(1, 1fr)',
								sm: 'repeat(1, 1fr)',
							}}
							gap={2}
						>
							<Stack>
								<FormControl>
									<FormLabel fontWeight={'800'}>Asset</FormLabel>
									<Select
										disabled={true}
										border={'1px'}
										borderColor={'gray.200'}
										bg={'gray.300'}
										placeholder=""
										size="md"
										value={seleectedAsset}
										onChange={e => console.log(e.target.value)}
									>
										<option value="ethereumAsset">USDT</option>
										<option value=""></option>
									</Select>
								</FormControl>
							</Stack>
							<Stack>
								<FormControl>
									<FormLabel fontWeight={'800'}>Network</FormLabel>
									<Select
										cursor={'pointer'}
										border={'1px'}
										borderColor={'gray.200'}
										bg={'#fff'}
										placeholder=""
										size="md"
										value={selectedEther}
										onChange={(e: any) => {
											changeNetwork(e.target.value);
										}}
									>
										<option value="ethereum">Ethereum</option>
										<option value="arbitrum">{renderArbitrumName()}</option>
									</Select>
								</FormControl>
							</Stack>
						</Grid>
						<FormControl mt={'10px'}>{renderInputLayoutSection()}</FormControl>
					</ModalBody>

					<ModalFooter>
						<Stack w={'100%'} align={'center'}>
							{isShowInputLayout && (
								<Button
									isLoading={isLoading}
									isDisabled={isChainOnEtherOrArbitrum() && !inputValue}
									w={'100%'}
									bg={'teal.500'}
									color="#fff"
									onClick={() => confirm()}
								>
									{renderConfirmText()}
								</Button>
							)}
							<Text
								mt={'12px'}
								onClick={() => setIsShowInputLayout(value => !value)}
								cursor={'pointer'}
								fontWeight={'bold'}
								color={'teal.500'}
							>
								{isShowInputLayout ? 'Send from exchange instead' : 'Deposit from wallet instead'}
							</Text>
						</Stack>
					</ModalFooter>
				</ModalContent>
				{modalIsOpen && qrcodeModalDom}
				{msgModalIsOpen && msgModalDom}
			</Modal>
		),
		[
			isOpen,
			onClose,
			isDesktop,
			changeNetwork,
			renderArbitrumName,
			selectedEther,
			inputValue,
			confirm,
			renderConfirmText,
			isChainOnEtherOrArbitrum,
			renderTitleMsg,
			isLoading,
			renderInputLayoutSection,
			seleectedAsset,
			isShowInputLayout,
			modalIsOpen,
			qrcodeModalDom,
			msgModalIsOpen,
			msgModalDom,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useDepositUsdtModal;
