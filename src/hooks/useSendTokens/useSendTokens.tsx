import {
	usePrepareContractWrite,
	useContractWrite,
	useContractRead,
	useWaitForTransaction,
	erc20ABI,
	useNetwork,
} from 'wagmi';
import { ethers } from 'ethers';
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

	// 使用者所連接自己錢包的 address
	const { address } = useAccount();
	const { chain } = useNetwork();

	const { getContractAddress } = useUtility();

	const units = Number(props?.usdtValue) * 1000000000000;

	console.log('useSendTokens address =>', getContractAddress(chain?.id as number));
	const { config, error: prepareContractWriteError } = usePrepareContractWrite({
		// from my MetaMask USDT token contract address
		address: getContractAddress(chain?.id as number),
		abi: arbitrumContractAbi,
		functionName: 'transfer',
		args: [
			proxyWallet, // proxyWallet address
			// ethers.parseEther('0.0001'), // convert to wei
			// 1000000000000 => 12 個 0 = 1 USDT convert to USDT
			ethers.parseUnits(String(units), 6),
		],
	});

	const { write, data, error, isError, isSuccess, isLoading } = useContractWrite(config);

	console.log('useSendTokens status', {
		address,
		proxyWallet,
		data,
		error,
		isError,
		isSuccess,
		isLoading,
		prepareContractWriteError,
	});

	return { write, data, isSuccess, isLoading, prepareContractWriteError };
}

export default useSendTokens;
