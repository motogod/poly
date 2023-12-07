import { useState } from 'react';
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
			// Test for Arbitrum Goerli
			if (chainId === 421613) {
				return '0x05111E862280c8b135bCB5Ee173c557f3e1BBcD8';
			} else if (chainId === 42161) {
				// Arbitrum One USDT contract address
				return '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
			} else {
				return '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
			}
		}

		// Arbitrum One USDT contract address
		return '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';
	};

	return { checkEngAndNumberName, inputNameErrMsg, roundDown, getContractAddress };
}

export default useUtility;
