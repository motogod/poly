import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi';
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
	const [inputAddressValue, setInputAddressValue] = useState('');
	const [inputValue, setInputValue] = useState<string>('');

	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);

	const { address } = useAccount();
	const { chain: currentChain } = useNetwork();
	const { pendingChainId, switchNetwork, isSuccess } = useSwitchNetwork();

	// const { write, isLoading } = useSendTokens({ usdtValue: inputValue });
	const { ethValue, tokenDecimals } = useContractForRead();

	const { getContractAddress } = useUtility();
	const baseUrl = useBaseUrl();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

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

	const isChainOnEtherOrArbitrum = useCallback(() => {
		const currentChainId = currentChain?.id;
		if (currentChainId !== 1 && currentChainId !== 421613 && currentChainId !== 42161) {
			return false;
		}

		return true;
	}, [currentChain]);

	// const confirm = useCallback(() => {
	// 	console.log('1');
	// 	// 若在其他鏈上 不做交易 先讓使用者切換到 Arbitrum
	// 	if (!isChainOnEtherOrArbitrum()) {
	// 		console.log('2');
	// 		if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
	// 			console.log('3');
	// 			switchNetwork?.(421613);
	// 		} else {
	// 			console.log('4');
	// 			switchNetwork?.(42161);
	// 		}
	// 		console.log('5');
	// 		return;
	// 	}
	// 	console.log('6');
	// 	write?.();
	// }, [baseUrl, isChainOnEtherOrArbitrum, switchNetwork, write]);

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
									Only send to a USDT address on the Mainnet and Arbitrum network.
								</Text>
							</Stack>
						</Stack>
						<FormControl mt={'10px'}>
							<Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
								<FormLabel fontWeight={'800'}>Address</FormLabel>
								<Text
									// textUnderlineOffset={'1px'}
									textDecoration={'underline'}
									cursor={'pointer'}
									onClick={() => setInputAddressValue(address as `0x${string}`)}
									fontSize={'small'}
									color={'gray.500'}
								>
									{`Use connected`}
								</Text>
							</Stack>
							<InputGroup>
								<Input
									minLength={0}
									value={inputAddressValue}
									autoCapitalize={'none'}
									onChange={e => setInputAddressValue(e.target.value)}
									placeholder={'0x...'}
									border="2px solid #E2E8F0;"
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
							{/* <Button
								isLoading={isLoading}
								isDisabled={false}
								w={'100%'}
								bg={'teal.500'}
								color="#fff"
								onClick={() => alert('Test')}
							>
								Withdraw
							</Button> */}
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[isOpen, onClose, isDesktop, inputValue, ethValue, inputAddressValue, address]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useWithdrawUsdtModal;
