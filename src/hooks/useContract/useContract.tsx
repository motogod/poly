import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, showToast } from '@/store';
import { useEffect } from 'react';

function useContract() {
	const dispatch = useDispatch<AppDispatch>();
	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: proxyWallet,
		abi: [
			{
				name: 'mint',
				type: 'function',
				stateMutability: 'nonpayable',
				inputs: [],
				outputs: [],
			},
		],
		functionName: 'mint',
	});

	const { write, data, error, isError } = useContractWrite(config);

	// check contract status
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	// 提醒視窗
	useEffect(() => {
		if (error) {
			dispatch(
				showToast({
					isSuccess: false,
					title: error.message,
				})
			);
		}
	}, [error, dispatch]);

	console.log('useContract status', {
		prepareError,
		isPrepareError,
		error,
		isError,
		isLoading,
		isSuccess,
		data,
	});

	return { write, isLoading, isSuccess };
}

export default useContract;
