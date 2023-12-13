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
	Collapse,
} from '@chakra-ui/react';
import { HiQrcode } from 'react-icons/hi';
import { TbAlertTriangle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, postWithdraw } from '@/store';
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

	const { userFunds } = useSelector((state: RootState) => state.authReducer);

	const { address } = useAccount();
	const { chain: currentChain } = useNetwork();
	const { pendingChainId, switchNetwork, isSuccess } = useSwitchNetwork();

	const { write, isLoading } = useSendTokens({ usdtValue: inputValue });
	const { ethValue, tokenDecimals } = useContractForRead();

	const { inputValueAndEthValueMsg, initInputAmountValue } = useUtility();
	const baseUrl = useBaseUrl();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const confirm = useCallback(() => {
		disaptch(postWithdraw({ address: inputAddressValue, amount: Number(inputValue) }));
	}, [disaptch, inputAddressValue, inputValue]);

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
									onClick={() => setInputValue(String(userFunds.hold))}
									fontSize={'small'}
									color={'gray.500'}
								>
									{`$${userFunds.hold} available Max`}
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
							<Text position={'absolute'} top={'41px'} left={2}>
								{inputValue && '$'}
							</Text>
							<Collapse in={inputValueAndEthValueMsg(inputValue, ethValue) !== ''} animateOpacity>
								<Text fontSize={'sm'} mt={1} color={'red.500'}>
									{inputValueAndEthValueMsg(inputValue, ethValue)}
								</Text>
							</Collapse>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Stack w={'100%'} align={'center'}>
							<Button
								isLoading={isLoading}
								isDisabled={inputValue === '' || inputAddressValue === ''}
								w={'100%'}
								bg={'teal.500'}
								color="#fff"
								onClick={() => confirm()}
							>
								Withdraw
							</Button>
						</Stack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[
			isOpen,
			onClose,
			isDesktop,
			inputValue,
			ethValue,
			inputAddressValue,
			address,
			isLoading,
			inputValueAndEthValueMsg,
			initInputAmountValue,
			confirm,
		]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useWithdrawUsdtModal;
