import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserAuth, AppDispatch } from '@/store';

type Props = {
	children: ReactNode;
};

function AuthProvider({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(checkUserAuth({}));
	}, [dispatch]);

	useEffect(() => {
		alert('Auth');
	}, []);

	return <>{children}</>;
}

export default AuthProvider;
