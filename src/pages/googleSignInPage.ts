import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

const GoogleSignInPage = () => {
	const { data: session } = useSession();

	useEffect(() => {
		if (session === null) void signIn('google');
		if (session) window.close();
	}, [session]);

	return null;
};

export default GoogleSignInPage;
