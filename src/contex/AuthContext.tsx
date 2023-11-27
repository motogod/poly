import React, { EffectCallback, ReactNode, useEffect, useRef } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { watchAccount } from '@wagmi/core';
import { useSDK } from '@metamask/sdk-react';
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

	const { connector: activeConnector } = useAccount();

	// const unwatch = watchAccount(account => console.log('AuthContext account', account));
	const { sdk, connected, connecting, provider, chainId, account: metaAccount } = useSDK();

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisplayNameModal();

	const { user, isAuthenticated } = useSelector((state: RootState) => state.authReducer);

	const { username } = user;

	const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
		async onSuccess(data, variables, context) {
			const { account, chain } = data;
			// 切換 chainId 到 Arbitrum, 若尚未 connect 成功 switchNetwork 會是 undefined
			// WalletConnect 會自動切換到設置的第一個 chainId，多插入一個切換會有 pending 的 bug
			// 只有連接 MetaMask 才執行手動切換
			console.log('AuthContext success');
		},
		onError(error, variables, context) {
			// console.log('error', { error, variables, context });
			// 觸發 MetaMask 時，登入視窗出現 未填密碼直接關閉，再次觸發 MetaMask 時的 error 處理
		},
	});

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
			if (isAuthenticated && (username === null || username === '')) {
				modalOnOpen();
			} else {
				modalOnClose();
				// 確定有名字，變數設為 false，整段 useEffect 避免重複觸發出現彈窗
				// isModalFirst = false;
			}

			if (isAuthenticated) {
				// 一些偵測的 function，像 切換 network，切換 account，瀏覽器與錢包必須執行 connect 之後才有用
				// 所以若確定該瀏覽器的使用者有登入成功過，再重新打開網頁時，自動幫忙 connect 起來
				connectors.forEach(connector => {
					// if (connector.ready && connector.id === 'metaMask') {
					// 	connect({ connector });
					// }
					// if (connector.ready && connector.id === 'walletConnect') {
					// 	connect({ connector });
					// }
				});
			}
		}
	}, [username, modalOnOpen, modalOnClose, isAuthenticated, connect, connectors]);

	useEffect(() => {
		const handleConnectorUpdate = ({ account, chain }: any) => {
			if (account) {
				console.log('new account', account);
			} else if (chain) {
				console.log('new chain', chain);
			}
		};

		if (activeConnector) {
			activeConnector.on('change', handleConnectorUpdate);
		}

		return (): void => {
			activeConnector?.off('change', handleConnectorUpdate);
		};
	}, [activeConnector]);

	return (
		<>
			{modalIsOpen && ModalDom}
			{children}
		</>
	);
}

export default AuthProvider;
