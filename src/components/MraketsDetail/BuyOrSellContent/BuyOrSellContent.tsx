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
	Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { HiChartBar } from 'react-icons/hi';
import { PhoneIcon, AddIcon, WarningIcon, SpinnerIcon } from '@chakra-ui/icons';
import { BiWalletAlt, BiLoaderAlt } from 'react-icons/bi';
import { HiRefresh } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { motion, useAnimationControls } from 'framer-motion';
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
	getUserFunds,
	getPortfolioValue,
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

	const { t } = useTranslation();

	const { transactionType } = {
		transactionType: 'Buy', // default value
		...props,
	};

	const [isBuy, setIsBuy] = useState(transactionType === 'Buy' ? true : false);
	const [isYes, setIsYes] = useState(true);
	const [selectedType, setSelectedType] = useState<SelectedType>('MARKET');

	const controls = useAnimationControls();

	const [rotateDeg, setRotateDeg] = useState(0);

	const rotateFunction = async (rotateDeg: number) => {
		await controls.start({ rotate: rotateDeg, transition: { duration: 0.5 } });
		return await controls.start({ rotate: rotateDeg + 360, transition: { duration: 0.5 } });
	};

	const dispatch = useDispatch<AppDispatch>();

	const { hold } = useSelector((state: RootState) => state.authReducer.userFunds);
	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { isUserClickYesOrNo, marketDetailData } = useSelector(
		(state: RootState) => state.homeReducer
	);
	const { isTradeOrdersLoading, isTradeSuccess, userMarketYesHold, userMarketNoHold } = useSelector(
		(state: RootState) => state.portfolioReducer
	);

	// 這邊的 hook 會導致觸發 disconnect 如果要導入 (已處理)
	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useLoginModal();

	// Limit Price
	const [limiInputValue, setLimitInputValue] = useState<number | string>(
		marketDetailData?.outcome?.yes
	);

	const {
		getInputProps: getLimitInputProps,
		getIncrementButtonProps: getIncLimitBtnProps,
		getDecrementButtonProps: getDescBtnProps,
	} = useNumberInput({
		step: 0.1,
		// defaultValue: limiInputValue,
		min: 0.01,
		max: 1.0,
		precision: 2,
		value: limiInputValue,
		onChange: value => {
			// 禁止使用者輸入負號
			const newValue = value.replace('-', '');
			setLimitInputValue(newValue);
		},
	});

	const incLimitPrice = getIncLimitBtnProps();
	const decLimitPrice = getDescBtnProps();
	const inputLimitPrice = getLimitInputProps();

	// 選擇 Market、Limit 或 Ｂuy、Sell 按鈕的點擊切換，將所有顯示的值恢復成預設值
	const setAllValueToDefault = () => {
		// selectedType 不變 其他值均恢復為預設該顯示的值
		setShareInputValue(0);
		setIsBuy(true);
		setIsYes(true);
		setLimitInputValue(marketDetailData?.outcome?.yes);
	};

	// 點擊 Buy Sell 按鈕時，將值恢復為預設值
	const setValueUserClickBuyOrSell = () => {
		setShareInputValue(0);

		if (isYes) {
			setLimitInputValue(marketDetailData?.outcome?.yes);
		} else {
			setLimitInputValue(marketDetailData?.outcome?.no);
		}
	};

	// 點擊 Yes No 時，將值恢復為預設值
	// 交易成功時，欄位的值也針對當下狀態恢復為預設值，按鈕狀態不變
	const setValueUserClickYesOrNo = (isClickYes: boolean) => {
		// 不管是 Market 或 Limit，該值恢復為預設值
		setShareInputValue(0);

		if (selectedType === 'LIMIT') {
			if (isClickYes) {
				setLimitInputValue(marketDetailData?.outcome?.yes);
			} else {
				setLimitInputValue(marketDetailData?.outcome?.no);
			}
		}
	};

	useEffect(() => {
		// 使用者在該市場擁有多少 Shares
		dispatch(getUserPortfolioPositionsForHold({ marketId: marketDetailData.id }));
	}, [dispatch, marketDetailData.id]);

	useEffect(() => {
		if (isTradeSuccess !== null) {
			const tradeResultTitle = isTradeSuccess ? t('order_created') : t('order_creation_failed');
			dispatch(showToast({ title: tradeResultTitle, isSuccess: isTradeSuccess }));

			// 交易成功，更新資料
			dispatch(getUserPortfolioPositionsForHold({ marketId: marketDetailData.id }));
			dispatch(getUserFunds({}));
			// User 的 Portfolio Value
			dispatch(getPortfolioValue({ marketId: '' }));
			// 交易成功，更新 Order Book 資料
			if (isYes) {
				dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
			} else {
				dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));
			}

			dispatch(resetTradeOrdersStatus());
			setValueUserClickYesOrNo(isYes);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isTradeSuccess, marketDetailData.slug]);

	// 使用者切換 Yes No 改變 Limit input 的預設值
	useEffect(() => {
		if (router.isReady && Object.keys(marketDetailData).length > 0) {
			if (selectedType === 'MARKET') {
				if (isUserClickYesOrNo) {
					setLimitInputValue(marketDetailData.outcome.yes);
					setSharesMax(Math.round(hold / marketDetailData.outcome.yes));
				} else {
					setLimitInputValue(marketDetailData.outcome.no);
					setSharesMax(Math.round(hold / marketDetailData.outcome.no));
				}
			}
		}
	}, [hold, isUserClickYesOrNo, marketDetailData, router, selectedType, setLimitInputValue]);

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
		// max: isBuy ? sharesMax : userMarketHold,
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
				return t('buy');
			} else {
				return t('sell');
			}
		}

		return t('connect');
	};

	const renderSharePrice = () => {
		if (selectedType === 'MARKET') {
			return `${
				isUserClickYesOrNo ? marketDetailData?.outcome?.yes : marketDetailData?.outcome?.no
			} USDT`;
		}
		console.log('CHECK HERE limiInputValue', limiInputValue);
		return limiInputValue;
	};

	const renderPotentialReturn = () => {
		if (selectedType === 'MARKET' && shareInputValue > 0) {
			if (isUserClickYesOrNo) {
				const cost = marketDetailData?.outcome?.yes * shareInputValue;

				const potentialReturnValue = (shareInputValue / cost) * 100;

				return potentialReturnValue.toFixed(2);
			} else {
				const cost = marketDetailData?.outcome?.no * shareInputValue;

				const potentialReturnValue = (shareInputValue / cost) * 100;

				return potentialReturnValue.toFixed(2);
			}
		}

		if (selectedType === 'LIMIT' && shareInputValue > 0) {
			const price = inputLimitPrice.value;
			const cost = price * shareInputValue;
			const potentialReturnValue = (shareInputValue / cost) * 100;

			return potentialReturnValue.toFixed(2);
		}

		return `0.00`;
	};

	// const isShowCollapseError = () => {
	// 	if (selectedType === 'MARKET') {
	// 		if (isBuy) {
	// 			// 輸入的 Share 不得大於 所能購買的 Share 最大量
	// 			if (shareInputValue > sharesMax) {
	// 				return true;
	// 			}
	// 		} else {
	// 			// 賣出的 Share 不得大於 所擁有的最大量
	// 			if (shareInputValue > userMarketHold) {
	// 				return true;
	// 			}
	// 		}

	// 		return false;
	// 	}

	// 	if (selectedType === 'LIMIT') {
	// 		if (isBuy) {
	// 			// 限制低於 15 不能掛單 ; 輸入的 Share 不得大於 所能掛單的 Share 最大量
	// 			if (shareInputValue < 15 || shareInputValue > sharesMax) {
	// 				return true;
	// 			}
	// 		} else {
	// 			// 掛單的 Share 不得大於 所擁有的最大量
	// 			if (shareInputValue > userMarketHold) {
	// 				return true;
	// 			}
	// 		}

	// 		return false;
	// 	}

	// 	return false;
	// };

	// const renderSharesError = () => {
	// 	if (selectedType === 'MARKET') {
	// 		if (isBuy) {
	// 			if (shareInputValue > sharesMax) {
	// 				return 'Insufficient balance';
	// 			}
	// 		} else {
	// 			if (shareInputValue > userMarketHold) {
	// 				return `You Own ${userMarketHold} Shares`;
	// 			}
	// 		}
	// 	}
	// 	if (selectedType === 'LIMIT') {
	// 		if (isBuy) {
	// 			// 規定輸入 Shares 低於 15 不得買
	// 			if (shareInputValue > 0 && shareInputValue < 15) {
	// 				return 'Minimum 15 shares for limit orders';
	// 			}

	// 			if (shareInputValue > sharesMax) {
	// 				return 'Insufficient balance';
	// 			}
	// 		} else {
	// 			if (shareInputValue > userMarketHold) {
	// 				return `You Own ${userMarketHold} Shares`;
	// 			}
	// 		}
	// 	}

	// 	return '';
	// };

	const renderShareIsValidMsg = (): string => {
		if (selectedType === 'MARKET') {
			if (isBuy) {
				// 輸入的 Share 不得大於 所能購買的 Share 最大量
				if (shareInputValue > sharesMax) {
					return t('insufficient_balance');
				}
			} else {
				// 輸入的 Share 不得大於 使用者擁有的 Share 最大量
				if (isYes) {
					if (shareInputValue > userMarketYesHold) {
						return t('insufficient_balance');
					}
				} else {
					if (shareInputValue > userMarketNoHold) {
						return t('insufficient_balance');
					}
				}
			}

			return '';
		}

		if (selectedType === 'LIMIT') {
			// 限制低於 30 不能掛單
			if (shareInputValue > 0 && shareInputValue < 30) {
				return t('minimum_thirty_shares_for_limit_orders');
			}

			if (isBuy) {
				// 輸入的 Share 不得大於 所能掛單的 Share 最大量
				if (shareInputValue > sharesMax) {
					return t('insufficient_balance');
				}
			} else {
				// 掛單的 Share 不得大於 所擁有的最大量
				if (isYes) {
					if (shareInputValue > userMarketYesHold) {
						return `${t('you')} ${t('own')} ${userMarketYesHold} ${t('shares')}`;
					}
				} else {
					if (shareInputValue > userMarketNoHold) {
						return `${t('you')} ${t('own')} ${userMarketNoHold} ${t('shares')}`;
					}
				}
			}

			return '';
		}

		return '';
	};

	const isDisableTradeButton = (): boolean => {
		// 如果使用者未登入，該按鈕為 Connect 允許點擊
		if (!isAuthenticated) {
			return false;
		}

		if (selectedType === 'MARKET') {
			if (isBuy) {
				return shareInputValue > sharesMax || shareInputValue === 0;
			} else {
				if (shareInputValue === 0) {
					return true;
				}

				if (isYes) {
					return shareInputValue > userMarketYesHold || userMarketYesHold === 0;
				} else {
					return shareInputValue > userMarketNoHold || userMarketNoHold === 0;
				}
			}
		}

		if (selectedType === 'LIMIT') {
			if (shareInputValue > sharesMax || shareInputValue === 0 || shareInputValue < 30) {
				return true;
			}

			if (
				((limiInputValue as number) < 0.01 && (limiInputValue as number) > 1) ||
				shareInputValue === 0
			) {
				return true;
			}

			// Sell 的狀態下要觀察持有的 Share
			if (!isBuy) {
				if (isYes) {
					return shareInputValue > userMarketYesHold;
				} else {
					return shareInputValue > userMarketNoHold;
				}
			}
		}

		return false;
	};

	const renderFeeOrPotentialReturn = (): string => {
		if (selectedType === 'MARKET' && !isBuy) {
			if (isUserClickYesOrNo) {
				const afterFeeCost = (marketDetailData?.outcome?.yes * shareInputValue * 0.05).toFixed(2);

				return `${afterFeeCost} USDT`;
			} else {
				const afterFeeCost = (marketDetailData?.outcome?.no * shareInputValue * 0.05).toFixed(2);

				return `${afterFeeCost} USDT`;
			}
		}

		if (selectedType === 'LIMIT' && !isBuy) {
			const afterFeeCost = ((limiInputValue as number) * shareInputValue * 0.05).toFixed(2);

			return `${afterFeeCost} USDT`;
		}

		return `${shareInputValue * 1} USDT (${renderPotentialReturn()}%)`;
	};

	const renderTotal = (): string => {
		if (selectedType === 'MARKET' && isBuy) {
			return `${
				isUserClickYesOrNo
					? (marketDetailData?.outcome?.yes * shareInputValue).toFixed(2)
					: (marketDetailData?.outcome?.no * shareInputValue).toFixed(2)
			} USDT`;
		}

		if (selectedType === 'MARKET' && !isBuy) {
			if (selectedType === 'MARKET' && !isBuy) {
				if (isUserClickYesOrNo) {
					const afterFeeCost = marketDetailData.outcome.yes * shareInputValue * 0.05;
					const result = (marketDetailData?.outcome?.yes * shareInputValue - afterFeeCost).toFixed(
						2
					);

					return `${result} USDT`;
				} else {
					const afterFeeCost = marketDetailData.outcome.no * shareInputValue * 0.05;

					const result = (marketDetailData?.outcome?.no * shareInputValue - afterFeeCost).toFixed(
						2
					);

					return `${result} USDT`;
				}
			}
		}

		if (selectedType === 'LIMIT' && !isBuy) {
			const afterFeeCost = (limiInputValue as number) * shareInputValue * 0.05;
			const estAmountReceived = (limiInputValue as number) * shareInputValue - afterFeeCost;

			return estAmountReceived.toFixed(2);
		}

		return ((limiInputValue as number) * shareInputValue).toFixed(2);
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
				<Stack direction={'row'} justify={'space-between'} alignItems={'center'}>
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
							setAllValueToDefault();
							setSelectedType(e.target.value as SelectedType);
						}}
					>
						<option value="MARKET">{t('market_price')}</option>
						<option value="LIMIT">{t('price_limit')}</option>
					</Select>
					<Box
						as={motion.div}
						cursor={'pointer'}
						border="0px solid #fff;"
						bg={'transparent'}
						// drag="x"
						// dragConstraints={{ left: -100, right: 100 }}
						animate={controls}
						onClick={() => {
							dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
							dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));

							setRotateDeg(prev => prev + 360);
							rotateFunction(rotateDeg);
						}}
						transition="0.5s linear"
						textAlign={'center'}
						justifyContent={'center'}
					>
						<HiRefresh color="grey" />
					</Box>
				</Stack>
			</Box>
			<Stack>
				<Stack mt={'16px'} position="relative" spacing={1.5} direction="row">
					<BuyOrSellButton
						onClick={() => {
							setIsBuy(true);
							setValueUserClickBuyOrSell();
						}}
						text={t('buy')}
						selected={isBuy}
					/>
					<BuyOrSellButton
						onClick={() => {
							setIsBuy(false);
							setValueUserClickBuyOrSell();
						}}
						text={t('sell')}
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
						{t('select_outcome')}
					</Heading>
					<YesOrNoButton
						onClick={() => {
							// dispatch(getMarketOrderBookYes({ slug: marketDetailData.slug }));
							// 一併去改變 LineChartCard 要顯示 Buy or Sell
							dispatch(userClickYesOrNoButton(true));
							setIsYes(true);
							setValueUserClickYesOrNo(true);
						}}
						selected={isYes}
						leftText="Yes"
						rightText={`${marketDetailData?.outcome ? marketDetailData?.outcome?.yes : ''} USDT`}
					/>
					<YesOrNoButton
						onClick={() => {
							// dispatch(getMarketOrderBookNo({ slug: marketDetailData.slug }));
							dispatch(userClickYesOrNoButton(false));
							setIsYes(false);
							setValueUserClickYesOrNo(false);
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
								{t('limit_price')}
							</Heading>
						</Stack>
						<HStack mt={'16px'} gap={0} maxW="100%">
							<Button borderRadius={'6px 0px 0px 6px'} {...decLimitPrice}>
								-
							</Button>
							<Input
								focusBorderColor="gray.100"
								type="number"
								pattern="[0-9]*"
								// value={limiInputValue}
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
						<Collapse
							in={(limiInputValue as number) < 0.01 || (limiInputValue as number) > 1}
							animateOpacity
						>
							<Text fontSize={'sm'} mt={0} color={'red.500'}>
								Price should be 0.01 ~ 1.00
							</Text>
						</Collapse>
					</Stack>
				)}
				<Stack mt={'24px'}>
					<Stack align={'center'} direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
							{t('shares')}
						</Heading>
						<Stack direction={'row'}>
							<Tag bg={'gray.100'} color={'gray.800'} borderRadius={20} pl={'16px'} pr={'16px'}>
								<TagLabel>
									{isBuy
										? `${t('balance')}: ${hold} USDT`
										: `${t('you')} ${t('own')} ${isYes ? userMarketYesHold : userMarketNoHold} ${t(
												'shares'
										  )}`}
								</TagLabel>
							</Tag>
							<Button
								onClick={() => {
									if (isBuy) {
										setShareInputValue(sharesMax);
									} else {
										isYes
											? setShareInputValue(userMarketYesHold)
											: setShareInputValue(userMarketNoHold);
									}
								}}
								w={'57px'}
								h={'28px'}
								size="xs"
								bg="gray.600"
								_hover={{ bg: 'gray.700' }}
								color="#fff"
							>
								{t('max')}
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
					<Collapse in={renderShareIsValidMsg() !== ''} animateOpacity>
						<Text fontSize={'sm'} mt={0} color={'red.500'}>
							{renderShareIsValidMsg()}
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
											: Number(limiInputValue),
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
							{selectedType === 'MARKET' ? t('share_price') : t('limit_price')}
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{renderSharePrice()}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{t('shares')}
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{shareInputValue.toFixed(2)}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{!isBuy ? `${t('fee')}(5%)` : t('potential_return')}
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
							{renderFeeOrPotentialReturn()}
						</Heading>
					</Stack>
					<Stack direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							{!isBuy ? t('est_amount_received') : t('total')}
						</Heading>
						<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
							{renderTotal()}
						</Heading>
					</Stack>
				</Stack>
				{modalIsOpen && ModalDom}
			</Stack>
		</>
	);
}

export default BuyOrSellContent;
