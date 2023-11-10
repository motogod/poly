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

	return <>{children}</>;
}

export default AuthProvider;
