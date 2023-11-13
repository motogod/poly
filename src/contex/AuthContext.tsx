import React, { ReactNode, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth, AppDispatch, getUserProfile, RootState } from '@/store';
import { useDisplayNameModal } from '@/hooks';

type Props = {
	children: ReactNode;
};
// useEffect 跑兩次問題，規避掉
let isFirst = true;
let isModalFirst = true;

function AuthProvider({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisplayNameModal();

	const { user, isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	const { username } = user;

	useEffect(() => {
		if (isFirst) {
			isFirst = false;

			setTimeout(() => {
				// 確認是否已登入
				dispatch(checkUserAuth({}));
				// 確認是否有創建名稱
				dispatch(getUserProfile({}));
			}, 500);
		}
	}, [dispatch, modalOnClose, isAuthenticated, username, modalOnOpen]);

	useEffect(() => {
		// 已登入過，但尚未創建名稱
		if (isModalFirst && isAuthenticated !== null) {
			if (isAuthenticated && username === null) {
				modalOnOpen();
			} else {
				modalOnClose();
			}
			isModalFirst = false;
		}
	}, [username, modalOnOpen, modalOnClose, isAuthenticated]);

	return (
		<>
			{modalIsOpen && ModalDom}
			{children}
		</>
	);
}

export default AuthProvider;
