import { useState } from 'react';

type AgentType = 'iPhone' | 'Android' | 'web';

function useUtility() {
	const [inputNameErrMsg, setInputNameErrMsg] = useState<string>('');

	const checkEngAndNumberName = (value: string) => {
		if (value.length < 6) {
			setInputNameErrMsg('At least six characters');
			return;
		}

		const engCapital = new RegExp('[A-Z]');
		const eng = new RegExp('[a-z]');
		const num = new RegExp('[0-9]');

		if (engCapital.test(value)) {
			setInputNameErrMsg('Name must be lowercase');
			return;
		}

		if (eng.test(value) && num.test(value)) {
			setInputNameErrMsg('');
		} else {
			setInputNameErrMsg('Must be in English plus numbers');
		}
	};

	// 若是網頁開啟，使用者未安裝 MetaMask 引導至 MetaMask 官網
	const isWebsiteAgent = (): AgentType => {
		if (navigator.userAgent.includes('iPhone')) {
			return 'iPhone';
		}

		if (navigator.userAgent.includes('Android')) {
			return 'Android';
		}

		return 'web';
	};

	return { checkEngAndNumberName, inputNameErrMsg, isWebsiteAgent };
}

export default useUtility;
