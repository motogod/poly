import { useSimulateContract, useWriteContract, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { parseUnits, formatUnits } from 'viem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useUtility } from '@/hooks';
import { arbitrumContractAbi } from '@/utils/arbitrumAbi';

type Props = {
	usdtValue: string;
};

function useSendTokens(props?: Props) {
	const dispatch = useDispatch<AppDispatch>();
	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);

	// 使用者所連接自己錢包的 addressu
	const { address, chain } = useAccount();

	const { getContractAddress } = useUtility();

	// ethers.parseUnits 塞入的的值不得為空 ; 且小數點後不能超過 6 位數 否則報錯
	const unitsValue = props?.usdtValue ? Number(props?.usdtValue).toFixed(6) : '0';
	const decimals = chain?.id === 421614 ? 6 : 6;
	console.log('unitsValue =>', unitsValue);
	const { data, error: prepareContractWriteError } = useSimulateContract({
		address: getContractAddress(chain?.id as number), // MetaMask USDT token contract address
		abi: arbitrumContractAbi,
		functionName: 'transfer',
		args: [
			proxyWallet, // proxyWallet address
			ethers.parseUnits(String(unitsValue), decimals),
		],
	});

	const { writeContract, isSuccess, isPending, error } = useWriteContract();

	// console.log('useSendTokens status', {
	// 	address,
	// 	proxyWallet,
	// 	data,
	// 	error,
	// 	isError,
	// 	isSuccess,
	// 	isLoading,
	// 	prepareContractWriteError,
	// });

	return { writeContract, isPending, data, isSuccess, prepareContractWriteError };
}

export default useSendTokens;
