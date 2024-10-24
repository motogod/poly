import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { isAddress } from 'web3-validator';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { useBaseUrl } from '@/hooks';

function useUtility() {
	const [inputNameErrMsg, setInputNameErrMsg] = useState<string>('');
	const baseUrl = useBaseUrl();

	const { t } = useTranslation();

	// 輸入名稱規則判斷
	const checkEngAndNumberName = (value: string) => {
		// 至少六個字
		if (value.length < 6) {
			setInputNameErrMsg(t('at_least_six_characters_and_numbers'));
			return;
		}

		const engCapital = new RegExp('[A-Z]');
		const eng = new RegExp('[a-z]');
		const num = new RegExp('[0-9]');

		// 必須為小寫
		if (engCapital.test(value)) {
			setInputNameErrMsg(t('name_must_be_lowercase'));
			return;
		}

		// 必須有英文跟數字
		if (eng.test(value) && num.test(value)) {
			setInputNameErrMsg('');
		} else {
			setInputNameErrMsg(t('must_be_in_english_plus_numbers'));
		}
	};

	// 小數點後幾位無條件捨去
	const roundDown = (num: number, decimal: number) => {
		return Math.floor((num + Number.EPSILON) * Math.pow(10, decimal)) / Math.pow(10, decimal);
	};

	// 使用 USDT 交易時要使用的 token 合約地址
	const getContractAddress = (chainId: number) => {
		if (process.env.NODE_ENV === 'development' || baseUrl?.includes('stg')) {
			// https://support.rubydex.com/en/how-to-use-the-arbitrum-goerli-testnet-with-rubydex
			// Test for Arbitrum Sepolia
			if (chainId === 421614) {
				return '0xa3b54346EB20F015bBa6Df41D998E2BF48549D21';
			} else if (chainId === 42161) {
				// Arbitrum One USDT contract address
				return '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
			} else {
				// Ethereum USDT
				return '0xdAC17F958D2ee523a2206206994597C13D831ec7';
			}
		}

		// Arbitrum One USDT contract address
		if (chainId === 42161) {
			return '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
		}
		// Ethereum USDT contract address
		return '0xdAC17F958D2ee523a2206206994597C13D831ec7';
	};

	// 使用者輸入的錢包地址是否符合格式
	const inputAddressValueMsg = (inputValue: string, type?: 'deposit' | 'withdraw') => {
		if (inputValue) {
			if (!isAddress(inputValue)) {
				return t('please_enter_a_avlid_address');
			}
		}

		return '';
	};

	// 使用者輸入的金額數值 跟 錢包的餘額(deposit) 或 存入平台的餘額(withdraw)做比對之後 要顯示的資訊
	const inputValueAndEthValueMsg = (
		inputValue: string,
		ethValue: number,
		type: 'deposit' | 'withdraw'
	) => {
		console.log('inputValue 1', inputValue);
		if (inputValue) {
			if (Number(inputValue) === 0 && !inputValue.includes('.')) {
				return t('the_amountcan_not_be_zero');
			}

			if (inputValue.includes('.')) {
				// 不得大於小數點後第 6 位
				if (inputValue.substring(inputValue.indexOf('.') + 1).length >= 7) {
					return t('there_was_an_error_with_your_amount');
				}
			}

			if (Number(inputValue) > ethValue) {
				return type === 'deposit'
					? t('insufficient_funds_msg')
					: t('insufficient_withdraw_funds_msg');
			}

			// 提款金額最少要大於 5
			if (type === 'withdraw' && Number(inputValue) < 5) {
				return t('withdrawal_amount_is_at_least_five');
			}

			return '';
		}

		return '';
	};

	// 顯示輸入欄位的金額：百位數逗號；小數點不加逗號
	const initInputAmountValue = (inputValue: string) => {
		if (inputValue) {
			// 若輸入數值有小數點，不加入百位數逗點
			if (inputValue.includes('.')) {
				return `${inputValue}`;
			} else {
				return `${String(Number(inputValue).toLocaleString())}`;
			}
		}

		return '';
	};

	const formatAllDate = (dateString: string) => {
		if (dateString) {
			const date = new Date(dateString);
			const formattedDate = format(date, 'yyyy/MM/dd HH:mm', { locale: zhTW });
			return formattedDate;
		}

		return '';
	};

	const checkPromotionsRedeemStatusCode = (code: number) => {
		switch (code) {
			case 201: // 兌換成功
				return t('redemption_successful');
			case 10101:
				return t('insufficient_points');
			case 10102:
				return t('invalid_points_to_redeem');
			case 10103:
				return t('user_redemption_limit_reached');
			case 10104:
				return t('promotion_redemption_limit_reached');
			case 10105:
				return t('something_went_wrong_please_try_again_later');
			case 10106:
				return t('invalid_promotion');
			case 404:
				return t('promotion_is_not_found_or_expired');
			default:
				return '';
		}
	};

	return {
		checkEngAndNumberName,
		inputNameErrMsg,
		roundDown,
		getContractAddress,
		inputValueAndEthValueMsg,
		initInputAmountValue,
		inputAddressValueMsg,
		formatAllDate,
		checkPromotionsRedeemStatusCode,
	};
}

export default useUtility;
