import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function useReferral() {
	const [mounted, setMounted] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const { referral } = router.query;

	if (referral) {
		return referral;
	}

	return '';
}

export default useReferral;
