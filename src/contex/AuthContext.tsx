import React, { ReactNode, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth, AppDispatch, getUserProfile, RootState } from '@/store';
import { useDisplayNameModal } from '@/hooks';

type Props = {
	children: ReactNode;
};

let isFirst = true;

function AuthProvider({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const initialized = useRef(false);

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisplayNameModal();

	const { userProfile, isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	const { displayName } = userProfile;

	useEffect(() => {
		if (isFirst) {
			isFirst = false;

			setTimeout(() => {
				// 確認是否已登入
				dispatch(checkUserAuth({}));
				// 確認是否有創建名稱
				dispatch(getUserProfile({}));
			}, 1000);
		}
	}, [dispatch]);

	useEffect(() => {
		// 已登入過，但尚未創建名稱
		if (!displayName && isAuthenticated) {
			modalOnOpen();
		} else {
			modalOnClose();
		}
	}, [displayName, modalOnOpen, modalOnClose, isAuthenticated]);

	return (
		<>
			{modalIsOpen && ModalDom}
			{children}
		</>
	);
}

export default AuthProvider;
