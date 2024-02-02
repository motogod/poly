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
	tradeOrders,
	showToast,
	resetTradeOrdersStatus,
	getUserPortfolioPositionsForHold,
} from '@/store';
import { useLoginModal } from '@/hooks';
import BuyOrSellButton from '../Buttons/BuyOrSellButton';
import YesOrNoButton from '../Buttons/YesOrNoButton';
import { zIndexMinimum } from '@/utils/zIndex';
import { TransactionEnum } from '../type';

type SelectedType = 'MARKET' | 'LIMIT';

type Props = {
	transactionType?: TransactionEnum;
};

function BuyOrSellContent(props?: Props) {
	const router = useRouter();

	const { transactionType } = {
		transactionType: 'Buy', // default value
		...props,
	};

	const [isBuy, setIsBuy] = useState(transactionType === 'Buy' ? true : false);
	const [isYes, setIsYes] = useState(true);
	const [selectedType, setSelectedType] = useState<SelectedType>('MARKET');

	const dispatch = useDispatch<AppDispatch>();

	const { hold } = useSelector((state: RootState) => state.authReducer.userFunds);
	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { isUserClickYesOrNo, marketDetailData } = useSelector(
		(state: RootState) => state.homeReducer
	);
	const { isTradeOrdersLoading, isTradeSuccess, userMarketHold } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	// 這邊的 hook 會導致觸發 disconnect 如果要導入 待處理
	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	// Limit Price
	const [limiInputValue, setLimitInputValue] = useState(0);
	const [limitMax, setLimitMax] = useState(0);
	console.log('limiInputValue =>', limiInputValue);
	const {
		getInputProps: getLimitInputProps,
		getIncrementButtonProps: getIncLimitBtnProps,
		getDecrementButtonProps: getDescBtnProps,
	} = useNumberInput({
		step: 0.1,
		defaultValue: limiInputValue,
		min: 0.01,
		max: 1.0,
		precision: 2,
		onChange: value => {
			console.log(value);
			// 禁止使用者輸入負號
			const newValue = value.replace('-', '');
			setLimitInputValue(Number(newValue));
		},
	});

	const incLimitPrice = getIncLimitBtnProps();
	const decLimitPrice = getDescBtnProps();
	const inputLimitPrice = getLimitInputProps();

	useEffect(() => {
		dispatch(getUserPortfolioPositionsForHold({ marketId: marketDetailData.id }));
	}, [dispatch, marketDetailData.id]);

	useEffect(() => {
		if (isTradeSuccess !== null) {
			const tradeResultTitle = isTradeSuccess ? 'Trade success' : 'Trade fail';
			dispatch(showToast({ title: tradeResultTitle, isSuccess: isTradeSuccess }));
			// 交易成功，更新 Order Book 資料
			if (isYes) {
				dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
			} else {
				dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));
			}

			dispatch(resetTradeOrdersStatus());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isTradeSuccess, marketDetailData.slug]);

	// 使用者切換 Yes No 改變 Limit input 的預設值
	useEffect(() => {
		if (router.isReady && Object.keys(marketDetailData).length > 0) {
			if (isUserClickYesOrNo) {
				setLimitInputValue(marketDetailData.outcome.yes);
				setSharesMax(Math.round(hold / marketDetailData.outcome.yes));
			} else {
				setLimitInputValue(marketDetailData.outcome.no);
				setSharesMax(Math.round(hold / marketDetailData.outcome.no));
			}
		}
	}, [hold, isUserClickYesOrNo, marketDetailData, router]);

	// Shares
	const [shareInputValue, setShareInputValue] = useState(0);
	const [sharesMax, setSharesMax] = useState(0);

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
		step: selectedType === 'MARKET' ? 1 : 10,
		// defaultValue: 0.0,
		value: shareInputValue,
		// defaultValue: shareInputValue,
		min: 0,
		// max: hold,
		max: isBuy ? sharesMax : userMarketHold,
		precision: 0,
		onChange: value => {
			// 禁止使用者輸入負號
			const newValue = value.replace('-', '');
			setShareInputValue(Number(newValue));
		},
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

	const renderPotentialReturn = () => {
		if (shareInputValue > 0) {
			const price = isYes ? marketDetailData?.outcome?.yes : marketDetailData?.outcome?.no;
			const cost = price * shareInputValue;
			const potentialReturnValue = (shareInputValue / cost) * 100;

			return potentialReturnValue.toFixed(2);
		}

		return `0.00`;
	};

	const isShowCollapseError = () => {
		if (selectedType === 'MARKET') {
			if (isBuy) {
				if (shareInputValue > sharesMax) {
					return true;
				}
			} else {
				if (shareInputValue > userMarketHold) {
					return true;
				}
			}

			return false;
		}

		if (selectedType === 'LIMIT') {
			if (isBuy) {
				if (shareInputValue < 15 || shareInputValue > sharesMax) {
					return true;
				}
			} else {
				if (shareInputValue > userMarketHold) {
					return true;
				}
			}

			return false;
		}

		return false;
	};

	const renderSharesError = () => {
		if (selectedType === 'MARKET') {
			if (isBuy) {
				if (shareInputValue > sharesMax) {
					return 'Insufficient balance';
				}
			} else {
				if (shareInputValue > userMarketHold) {
					return `You Own ${userMarketHold} Shares`;
				}
			}
		}
		if (selectedType === 'LIMIT') {
			if (isBuy) {
				// 規定輸入 Shares 低於 15 不得買
				if (shareInputValue > 0 && shareInputValue < 15) {
					return 'Minimum 15 shares for limit orders';
				}

				if (shareInputValue > sharesMax) {
					return 'Insufficient balance';
				}
			} else {
				if (shareInputValue > userMarketHold) {
					return `You Own ${userMarketHold} Shares`;
				}
			}
		}

		return '';
	};

	const isDisableTradeButton = () => {
		// 如果使用者未登入，該按鈕為 Connect 允許點擊
		if (!isAuthenticated) {
			return false;
		}

		if (selectedType === 'MARKET') {
			if (isBuy) {
				return shareInputValue > sharesMax || shareInputValue === 0;
			} else {
				return shareInputValue > userMarketHold || userMarketHold === 0;
			}
		}

		if (selectedType === 'LIMIT') {
			if (isBuy) {
				return shareInputValue > sharesMax || shareInputValue === 0;
			} else {
				return (
					(limiInputValue < 0.01 && limiInputValue > 1) ||
					shareInputValue > userMarketHold ||
					userMarketHold === 0
				);
			}
		}

		return false;
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
					defaultValue={selectedType}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
						setShareInputValue(0);
						setSelectedType(e.target.value as SelectedType);
					}}
				>
					<option value="MARKET">Market</option>
					<option value="LIMIT">Limit</option>
				</Select>
			</Box>
			<Stack>
				<Stack mt={'16px'} position="relative" spacing={1.5} direction="row">
					<BuyOrSellButton onClick={() => setIsBuy(true)} text="Buy" selected={isBuy} />
					<BuyOrSellButton
						onClick={() => {
							setIsBuy(false);
							if (shareInputValue > userMarketHold) {
								setShareInputValue(userMarketHold);
							}
						}}
						text="Sell"
						selected={!isBuy}
					/>
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
							setShareInputValue(0);
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
							setShareInputValue(0);
							setIsYes(false);
						}}
						selected={!isYes}
						leftText="No"
						rightText={`${marketDetailData?.outcome ? marketDetailData?.outcome?.no : ''} USDT`}
					/>
				</Stack>
				{selectedType === 'LIMIT' && (
					<Stack mt={'24px'}>
						<Stack align={'center'} direction={'row'} justify={'space-between'}>
							<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
								Limite Price
							</Heading>
						</Stack>
						<HStack mt={'16px'} gap={0} maxW="100%">
							<Button borderRadius={'6px 0px 0px 6px'} {...decLimitPrice}>
								-
							</Button>
							<Input
								focusBorderColor="gray.100"
								type="number"
								value={limiInputValue}
								textAlign={'center'}
								borderRadius={0}
								border="1px solid #E2E8F0;"
								{...inputLimitPrice}
							/>
							{/* <Input
							focusBorderColor="gray.100"
								type="number"
								textAlign={'center'}
								borderRadius={0}
								border="1px solid #E2E8F0;"
								value={limiInputValue}
								{...inputLimitPrice}
							/> */}
							<Button borderRadius={'0px 6px 6px 0px'} {...incLimitPrice}>
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
								<TagLabel>
									{isBuy ? `Balance: ${hold} USDT` : `You Own ${userMarketHold} Shares`}
								</TagLabel>
							</Tag>
							<Button
								onClick={() => {
									isBuy ? setShareInputValue(sharesMax) : setShareInputValue(userMarketHold);
								}}
								w={'57px'}
								h={'28px'}
								size="xs"
								bg="gray.600"
								_hover={{ bg: 'gray.700' }}
								color="#fff"
							>
								Max
							</Button>
						</Stack>
					</Stack>
					<HStack mt={'16px'} gap={0} maxW="100%">
						<Button borderRadius={'6px 0px 0px 6px'} {...decShares}>
							-
						</Button>
						<Input
							focusBorderColor="gray.100"
							type="number"
							pattern="[0-9]*"
							textAlign={'center'}
							borderRadius={0}
							border="1px solid #E2E8F0;"
							value={shareInputValue}
							{...inputShares}
						/>
						<Button borderRadius={'0px 6px 6px 0px'} {...incShares}>
							+
						</Button>
					</HStack>
					<Collapse in={isShowCollapseError()} animateOpacity>
						<Text fontSize={'sm'} mt={0} color={'red.500'}>
							{renderSharesError()}
						</Text>
					</Collapse>
				</Stack>
				<Button
					isDisabled={isDisableTradeButton()}
					isLoading={isTradeOrdersLoading}
					onClick={() => {
						if (isAuthenticated) {
							dispatch(
								tradeOrders({
									type: selectedType,
									direction: isBuy ? 'BUY' : 'SELL',
									outcome: isUserClickYesOrNo ? 'YES' : 'NO',
									marketId: marketDetailData?.id,
									price:
										selectedType === 'MARKET'
											? isUserClickYesOrNo
												? marketDetailData?.outcome?.yes
												: marketDetailData?.outcome?.no
											: limiInputValue,
									quantity: isUserClickYesOrNo
										? Number(shareInputValue.toFixed(2))
										: Number(shareInputValue.toFixed(2)),
								})
							);
						} else {
							modalOnOpen();
						}
					}}
					mt={'24px'}
					w={'100%'}
					leftIcon={isAuthenticated ? <></> : <Icon as={BiWalletAlt} />}
					size="lg"
					bg={isAuthenticated ? 'gray.600' : 'teal.500'}
					_hover={{ bg: isAuthenticated ? 'gray.700' : 'teal.600' }}
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
							{`${
								isUserClickYesOrNo ? marketDetailData?.outcome?.yes : marketDetailData?.outcome?.no
							} USDT`}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							Shares
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{shareInputValue.toFixed(2)}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							Potential Return
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{`${shareInputValue * 1} USDT (${renderPotentialReturn()}%)`}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							Total
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							{`${
								isUserClickYesOrNo
									? (marketDetailData?.outcome?.yes * shareInputValue).toFixed(2)
									: (marketDetailData?.outcome?.no * shareInputValue).toFixed(2)
							} USDT`}
						</Heading>
					</Stack>
				</Stack>
				{modalIsOpen && ModalDom}
			</Stack>
		</>
	);
}

export default BuyOrSellContent;
