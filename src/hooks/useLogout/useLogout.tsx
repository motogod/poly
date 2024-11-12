import { useSession, signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';

function useLogout() {
	// for google
	const { data: session, status } = useSession();

	const { disconnect } = useDisconnect();

	const logout = () => {
		if (session) {
			signOut();
			return;
		}
		disconnect();
	};

	return { logout };
}

export default useLogout;
