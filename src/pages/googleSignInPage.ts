import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

const GoogleSignInPage = () => {
	const { data: session } = useSession();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (session === null) void signIn('google');
		if (session) window.close();
	}, [session, dispatch]);

	return null;
};

export default GoogleSignInPage;
