import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useContractRead, useAccount, useBalance, useNetwork } from 'wagmi';
import { useUtility } from '@/hooks';
import { arbitrumContractAbi } from '@/utils/arbitrumAbi';

function useContractForRead() {
	const [ethValue, setEthValue] = useState<number>(0);
	const [tokenDecimals, setTokenDecimals] = useState<number>(0);

	const { address } = useAccount();
	const { chain } = useNetwork();
	const { getContractAddress, roundDown } = useUtility();

	const { data: balanceData, error: contractReadError } = useContractRead({
		address: getContractAddress(chain?.id as number), // token contract address
		abi: arbitrumContractAbi,
		functionName: 'balanceOf',
		args: [address], // wallet address
	});

	const { data } = useBalance({ address: getContractAddress(chain?.id as number) });

	useEffect(() => {
		if (balanceData || Number(balanceData) === 0) {
			// 判斷測試鏈 還是 主鏈 代入的 decimals 不一樣
			const decimals = chain?.id === 421613 ? 18 : 6;
			const value = ethers.formatUnits(balanceData as number, decimals);
			const roundDownValue = roundDown(Number(value), 5); // 去除小數點後五位

			setEthValue(roundDownValue);
		}
	}, [balanceData, roundDown, chain?.id]);

	useEffect(() => {
		if (data) {
			setTokenDecimals(data?.decimals);
		}
	}, [data]);

	return { ethValue, tokenDecimals, contractReadError };
}

export default useContractForRead;
