import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
	children: ReactNode;
};

function DisplayNameProvider({ children }: Props) {
	const { displayName } = useSelector((state: RootState) => state.authReducer.userProfile);

	useEffect(() => {
		if (!displayName) {
			// alert('No~~');
		}
	}, [displayName]);

	return <>{children}</>;
}

export default DisplayNameProvider;
