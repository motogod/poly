import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Stack,
	Card,
	Heading,
	Button,
	NumberInput,
	Input,
	useNumberInput,
	HStack,
	Box,
	Select,
	Tag,
	TagLabel,
	Collapse,
	Text,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import {
	RootState,
	AppDispatch,
	userClickYesOrNoButton,
	getMarketOrderBookYes,
	getMarketOrderBookNo,
} from '@/store';
import { useLoginModal } from '@/hooks';
import BuyOrSellButton from '../Buttons/BuyOrSellButton';
import YesOrNoButton from '../Buttons/YesOrNoButton';
import { zIndexMinimum } from '@/utils/zIndex';
import { log } from 'console';

type SelectedType = 'market' | 'limit';

function BuyOrSellContent() {
	const router = useRouter();

	const [isBuy, setIsBuy] = useState(true);
	const [isYes, setIsYes] = useState(true);
	const [selected, setSelected] = useState<SelectedType>('market');

	const dispatch = useDispatch<AppDispatch>();

	const { hold } = useSelector((state: RootState) => state.authReducer.userFunds);
	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { isUserClickYesOrNo, marketDetailData } = useSelector(
		(state: RootState) => state.homeReducer
	);
	console.log('');
	// 這邊的 hook 會導致觸發 disconnect 如果要導入 待處理
	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	// Limit Price
	const [limiInputValue, setLimitInputValue] = useState(0);

	const {
		getInputProps: getLimitInputProps,
		getIncrementButtonProps: getIncLimitBtnProps,
		getDecrementButtonProps: getDescBtnProps,
	} = useNumberInput({
		step: 0.1,
		value: limiInputValue,
		min: 0.01,
		max: 1.0,
		precision: 2,
	});

	const incLimitPrice = getIncLimitBtnProps();
	const decLimitPrice = getDescBtnProps();
	const inputLimitPrice = getLimitInputProps();

	// 使用者切換 Yes No 改變 Limit input 的預設值
	useEffect(() => {
		if (router.isReady && Object.keys(marketDetailData).length > 0) {
			if (isUserClickYesOrNo) {
				setLimitInputValue(marketDetailData.outcome.yes);
			} else {
				setLimitInputValue(marketDetailData.outcome.no);
			}
		}
	}, [isUserClickYesOrNo, marketDetailData, router]);

	// Shares
	const [shareInputValue, setShareInputValue] = useState(0);

	// console.log('shareInputValue =>', shareInputValue);

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
		step: 1,
		// defaultValue: 0.0,
		value: shareInputValue,
		//defaultValue: shareInputValue,
		min: 0,
		max: hold,
		precision: 0,
	});

	// Shares
	const incShares = getIncrementButtonProps();
	const decShares = getDecrementButtonProps();
	const inputShares = getInputProps();

	const renderConfirmButtonText = () => {
		if (isAuthenticated) {
			if (isBuy) {
				return 'Buy';
			} else {
				return 'Sell';
			}
		}

		return 'Connect';
	};

	return (
		<>
			<Box
				// align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
				mt="8px"
				as={Stack}
				zIndex={zIndexMinimum}
				borderRadius={'0px'}
				borderBottom={'1px solid #E2E8F0;'}
				bg={'#fff'}
			>
				<Select
					_hover={{ bg: 'gray.100' }}
					cursor={'pointer'}
					_focusVisible={{
						outline: 'none',
					}}
					fontWeight={'800'}
					border={'0px'}
					borderRadius={'0px'}
					focusBorderColor="transparent"
					borderColor={'gray.200'}
					bg={'#fff'}
					w={'120px'}
					placeholder=""
					size="md"
					defaultValue={selected}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setSelected(e.target.value as SelectedType)
					}
				>
					<option value="market">Market</option>
					<option value="limit">Limit</option>
				</Select>
			</Box>
			<Stack>
				<Stack mt={'16px'} position="relative" spacing={1.5} direction="row">
					<BuyOrSellButton onClick={() => setIsBuy(true)} text="Buy" selected={isBuy} />
					<BuyOrSellButton onClick={() => setIsBuy(false)} text="Sell" selected={!isBuy} />
				</Stack>

				<Stack mt={'24px'}>
					<Heading
						mb={'14px'}
						fontSize={'14px'}
						color={'gray.500'}
						fontWeight={'700'}
						lineHeight={'17px'}
					>
						Select Outcome
					</Heading>
					<YesOrNoButton
						onClick={() => {
							dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
							// 一併去改變 LineChartCard 要顯示 Buy or Sell
							dispatch(userClickYesOrNoButton(true));
							setIsYes(true);
						}}
						selected={isYes}
						leftText="Yes"
						rightText={`${marketDetailData?.outcome ? marketDetailData?.outcome?.yes : ''} USDT`}
					/>
					<YesOrNoButton
						onClick={() => {
							dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));
							dispatch(userClickYesOrNoButton(false));
							setIsYes(false);
						}}
						selected={!isYes}
						leftText="No"
						rightText={`${marketDetailData?.outcome ? marketDetailData?.outcome?.no : ''} USDT`}
					/>
				</Stack>
				{selected === 'limit' && (
					<Stack mt={'24px'}>
						<Stack align={'center'} direction={'row'} justify={'space-between'}>
							<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
								Limite Price
							</Heading>
						</Stack>
						<HStack mt={'16px'} gap={0} maxW="100%">
							<Button
								onClick={() => {
									if (limiInputValue > 0) {
										setLimitInputValue(prev => Number((prev - 0.1).toFixed(2)));
									}
								}}
								borderRadius={'6px 0px 0px 6px'}
								{...decLimitPrice}
							>
								-
							</Button>
							<Input
								type="number"
								textAlign={'center'}
								borderRadius={0}
								border="1px solid #E2E8F0;"
								value={limiInputValue}
								onChange={e => {
									const enterValue = Number(e.target.value);

									if (enterValue < 1) {
										setLimitInputValue(Number(enterValue.toFixed(2)));
									}

									if (enterValue >= 1) {
										setLimitInputValue(1);
									}
								}}
								// {...inputLimitPrice}
							/>
							<Button
								onClick={() => {
									if (limiInputValue < 1) {
										setLimitInputValue(prev => Number((prev + 0.1).toFixed(2)));
									}
								}}
								borderRadius={'0px 6px 6px 0px'}
								{...incLimitPrice}
							>
								+
							</Button>
						</HStack>
						<Collapse in={limiInputValue < 0.01 || limiInputValue > 1} animateOpacity>
							<Text fontSize={'sm'} mt={0} color={'red.500'}>
								Price should be 0.01 ~ 1.00
							</Text>
						</Collapse>
					</Stack>
				)}
				<Stack mt={'24px'}>
					<Stack align={'center'} direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
							Shares
						</Heading>
						<Stack direction={'row'}>
							<Tag bg={'gray.100'} color={'gray.800'} borderRadius={20} pl={'16px'} pr={'16px'}>
								<TagLabel>{`Funds: ${hold} USDT`}</TagLabel>
							</Tag>
							<Button
								onClick={() => setShareInputValue(hold)}
								w={'57px'}
								h={'28px'}
								size="xs"
								bg="gray.600"
								color="#fff"
							>
								Max
							</Button>
						</Stack>
					</Stack>
					<HStack mt={'16px'} gap={0} maxW="100%">
						<Button
							borderRadius={'6px 0px 0px 6px'}
							onClick={() => {
								if (shareInputValue > 0) {
									setShareInputValue(prev => prev - 1);
								}
							}}
							{...decShares}
						>
							-
						</Button>
						<Input
							textAlign={'center'}
							borderRadius={0}
							border="1px solid #E2E8F0;"
							value={shareInputValue}
							onChange={e => {
								const enterValue = Number(e.target.value);
								if (enterValue <= hold) {
									setShareInputValue(Number(e.target.value));
								}
							}}
							// {...inputShares}
						/>
						<Button
							borderRadius={'0px 6px 6px 0px'}
							onClick={() => {
								if (shareInputValue < hold) {
									setShareInputValue(prev => prev + 1);
								}
							}}
							{...incShares}
						>
							+
						</Button>
					</HStack>
				</Stack>
				<Button
					onClick={() => {
						if (isAuthenticated) {
						} else {
							modalOnOpen();
						}
					}}
					mt={'24px'}
					w={'100%'}
					leftIcon={isAuthenticated ? <></> : <Icon as={BiWalletAlt} />}
					size="lg"
					bg={isAuthenticated ? 'gray.600' : 'teal.500'}
					color="#fff"
				>
					{renderConfirmButtonText()}
				</Button>
				<Stack mt={'14px'} mb={'4px'}>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							Share Price
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							0.6 USDT
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							Shares
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							0.00
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							Potential Return
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{`0.00 USDT (0.00%)`}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							Total
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							0.00 USDT
						</Heading>
					</Stack>
				</Stack>
				{modalIsOpen && ModalDom}
			</Stack>
		</>
	);
}

export default BuyOrSellContent;
