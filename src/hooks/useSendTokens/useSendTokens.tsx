import {
	usePrepareContractWrite,
	useContractWrite,
	useContractRead,
	useWaitForTransaction,
	erc20ABI,
	useNetwork,
} from 'wagmi';
import { ethers } from 'ethers';
import { parseUnits, formatUnits } from 'viem';
import { useAccount } from 'wagmi';
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
	const { address } = useAccount();
	const { chain } = useNetwork();

	const { getContractAddress } = useUtility();

	// ethers.parseUnits 塞入的的值不得為空 ; 且小數點後不能超過 6 位數 否則報錯
	const unitsValue = props?.usdtValue ? Number(props?.usdtValue).toFixed(6) : '0';
	const decimals = chain?.id === 421613 ? 18 : 6;
	console.log('unitsValue =>', unitsValue);
	const { config, error: prepareContractWriteError } = usePrepareContractWrite({
		address: getContractAddress(chain?.id as number), // MetaMask USDT token contract address
		abi: arbitrumContractAbi,
		functionName: 'transfer',
		args: [
			proxyWallet, // proxyWallet address
			ethers.parseUnits(String(unitsValue), decimals),
		],
	});

	const { write, data, error, isError, isSuccess, isLoading } = useContractWrite(config);

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

	return { write, data, isSuccess, isLoading, prepareContractWriteError };
}

export default useSendTokens;
