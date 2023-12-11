import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
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
	Box,
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
} from '@chakra-ui/react';
import { HiQrcode } from 'react-icons/hi';
import { TbAlertTriangle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
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

function useWithdrawUsdtModal() {
	const disaptch = useDispatch<AppDispatch>();

	const [seleectedAsset, setSelectedAsset] = useState<assetType>('');
	const [selectedEther, setSelectedEther] = useState<etherType>('');
	const [inputValue, setInputValue] = useState<string>('');
	const [isShowInputLayout, setIsShowInputLayout] = useState(true);
	const [isCopied, setIsCopied] = useState(false);

	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);

	const { chain: currentChain } = useNetwork();
	const { pendingChainId, switchNetwork, isSuccess } = useSwitchNetwork();

	const { write, isLoading } = useSendTokens({ usdtValue: inputValue });
	const { ethValue, tokenDecimals } = useContractForRead();

	const { getContractAddress } = useUtility();
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
					? switchNetwork?.(421613)
					: switchNetwork?.(42161);
			}
		},
		[switchNetwork, baseUrl]
	);

	useEffect(() => {
		if (currentChain) {
			// 依據使用者一開始在哪條鏈上，來決定初始 Select 的值 不是在主鏈上就是 arbitrum
			let defaultEther: etherType = 'arbitrum';
			if (currentChain?.id === 1) {
				defaultEther = 'ethereum';
			}

			defaultEther === 'ethereum' ? setSelectedAsset('ethereumAsset') : setSelectedAsset('');
			setSelectedEther(defaultEther);
		}
	}, [currentChain]);

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
				if (currentChain?.id === 421613) {
					return 'Arbitrum Goerli';
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
		if (currentChainId !== 1 && currentChainId !== 421613 && currentChainId !== 42161) {
			return false;
		}

		return true;
	}, [currentChain]);

	const confirm = useCallback(() => {
		console.log('1');
		// 若在其他鏈上 不做交易 先讓使用者切換到 Arbitrum
		if (!isChainOnEtherOrArbitrum()) {
			console.log('2');
			if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
				console.log('3');
				switchNetwork?.(421613);
			} else {
				console.log('4');
				switchNetwork?.(42161);
			}
			console.log('5');
			return;
		}
		console.log('6');
		write?.();
	}, [baseUrl, isChainOnEtherOrArbitrum, switchNetwork, write]);

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
								Withdraw USDT
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
									Only send to a USDT address on the Arbitrum network.
								</Text>
							</Stack>
						</Stack>
						<FormControl mt={'10px'}>
							<FormLabel fontWeight={'800'}>Address</FormLabel>
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
							</InputGroup>
						</FormControl>
						<FormControl mt={'10px'}>
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
								type="number"
								minLength={0}
								maxLength={16}
								value={inputValue}
								autoCapitalize={'none'}
								onChange={e => setInputValue(e.target.value)}
								placeholder={''}
								border="2px solid #E2E8F0;"
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Stack w={'100%'} align={'center'}>
							<Button
								isLoading={isLoading}
								isDisabled={false}
								w={'100%'}
								bg={'teal.500'}
								color="#fff"
								onClick={() => alert('Test')}
							>
								Withdraw
							</Button>
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[isOpen, onClose, isDesktop, inputValue, isLoading, ethValue, proxyWallet]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useWithdrawUsdtModal;
