import { useState } from 'react';
import { isAddress } from 'web3-validator';
import { useBaseUrl } from '@/hooks';

function useUtility() {
	const [inputNameErrMsg, setInputNameErrMsg] = useState<string>('');
	const baseUrl = useBaseUrl();

	// 輸入名稱規則判斷
	const checkEngAndNumberName = (value: string) => {
		// 至少六個字
		if (value.length < 6) {
			setInputNameErrMsg('At least six characters');
			return;
		}

		const engCapital = new RegExp('[A-Z]');
		const eng = new RegExp('[a-z]');
		const num = new RegExp('[0-9]');

		// 必須為小寫
		if (engCapital.test(value)) {
			setInputNameErrMsg('Name must be lowercase');
			return;
		}

		// 必須有英文跟數字
		if (eng.test(value) && num.test(value)) {
			setInputNameErrMsg('');
		} else {
			setInputNameErrMsg('Must be in English plus numbers');
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
			console.log('inputValue=>', inputValue);
			if (!isAddress(inputValue)) {
				return 'Please enter a avlid address that starts with "0x"';
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
		console.log('inputValueAndEthValueMsg');
		if (inputValue) {
			if (Number(inputValue) === 0 && !inputValue.includes('.')) {
				return "Amount must can't be 0";
			}

			if (inputValue.includes('.')) {
				// 不得大於小數點後第 6 位
				if (inputValue.substring(inputValue.indexOf('.') + 1).length >= 7) {
					return 'There was an error with your amount. Please try again.';
				}
			}

			if (Number(inputValue) > ethValue) {
				return 'Insufficient funds. You cannot deposit more than your available balance.';
			}

			// 提款金額最少要大於 5
			if (type === 'withdraw' && Number(inputValue) < 5) {
				return 'Withdrawal amount is at least $5';
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

	return {
		checkEngAndNumberName,
		inputNameErrMsg,
		roundDown,
		getContractAddress,
		inputValueAndEthValueMsg,
		initInputAmountValue,
		inputAddressValueMsg,
	};
}

export default useUtility;
