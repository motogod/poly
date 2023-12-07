import { useEffect, useState } from 'react';
import { useContractRead, useAccount, useBalance, useNetwork } from 'wagmi';
import { useUtility } from '@/hooks';
import { arbitrumContractAbi } from '@/utils/arbitrumAbi';

function useContractForRead() {
	const [ethValue, setEthValue] = useState<number>(0);
	const [tokenDecimals, setTokenDecimals] = useState<number>(0);

	const { address } = useAccount();
	const { chain } = useNetwork();
	const { getContractAddress, roundDown } = useUtility();
	console.log('useContractForRead chain?.id', chain?.id);
	const { data: balanceData } = useContractRead({
		address: getContractAddress(chain?.id as number), // token contract address
		abi: arbitrumContractAbi,
		functionName: 'balanceOf',
		args: [address], // wallet address
	});
	console.log('useContractForRead balanceData', balanceData);
	const { data } = useBalance({ address: getContractAddress(chain?.id as number) });

	useEffect(() => {
		if (balanceData || Number(balanceData) === 0) {
			const value = Number(balanceData) / 1e18; // 1 ETH = 1e18 Wei
			const roundDownValue = roundDown(value, 5); // 去除小數點後五位
			console.log('useContractForRead useEffect setState success', Number(balanceData));
			setEthValue(roundDownValue);
		}
	}, [balanceData, roundDown]);

	useEffect(() => {
		if (data) {
			setTokenDecimals(data?.decimals);
		}
	}, [data]);

	return { ethValue, tokenDecimals };
}

export default useContractForRead;
