import React, { ReactNode, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, resetToast } from '@/store';

type Props = {
	children: ReactNode;
};

function ToastContext({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const toast = useToast();

	const { isToastSuccess, toastTitle } = useSelector((state: RootState) => state.toastReducer);

	useEffect(() => {
		if (isToastSuccess !== null) {
			if (isToastSuccess) {
				toast({
					title: toastTitle,
					position: 'top',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
			} else {
				toast({
					title: toastTitle,
					position: 'top',
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
			}

			dispatch(resetToast());
		}
	}, [isToastSuccess, toastTitle, toast, dispatch]);

	return <>{children}</>;
}

export default ToastContext;
