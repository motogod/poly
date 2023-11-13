import { useState } from 'react';

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

	return { checkEngAndNumberName, inputNameErrMsg };
}

export default useUtility;
