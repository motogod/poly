import React, { EffectCallback, ReactNode, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import {
	useAccount,
	useAccountEffect,
	useConnect,
	useSwitchChain,
	useDisconnect,
	createConfig,
	http,
	useClient,
} from 'wagmi';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { arbitrum, mainnet, arbitrumGoerli, arbitrumSepolia } from 'wagmi/chains';
import { watchClient } from '@wagmi/core';
import { watchChainId } from '@wagmi/core';
import { watchAccount } from '@wagmi/core';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
	checkUserAuth,
	AppDispatch,
	getUserProfile,
	RootState,
	logout,
	resetCheckAuthToast,
	getCategories,
	setIsFirstLogin,
} from '@/store';
import { useDisplayNameModal, useSiwe } from '@/hooks';
import { config } from '@/config';

type Props = {
	children: ReactNode;
};
// useEffect 跑兩次問題，規避掉
let isFirst = true;
let isModalFirst = true;

function AuthProvider({ children }: Props) {
	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const toast = useToast();

	const { connector: activeConnector, isConnected, address } = useAccount();
	const { switchChain } = useSwitchChain();
	// const { chain: currentChain } = useNetwork();
	const { disconnect } = useDisconnect();

	const client = useClient();

	useAccountEffect({
		onConnect(data) {
			console.log('connected', data);
		},
		onDisconnect() {
			console.log('disconnected');
		},
	});

	const { signInWithEthereum, isLoading: isSignInLoading, reset: resetSignIn } = useSiwe();
	// const unwatch = watchAccount(account => console.log('AuthContext account', account));

	const {
		ModalDom,
		isOpen: modalIsOpen,
		onOpen: modalOnOpen,
		onClose: modalOnClose,
	} = useDisplayNameModal();

	const { user, isAuthenticated, isFirstLogin, checkAuthSuccess, checkAuthTitle } = useSelector(
		(state: RootState) => state.authReducer
	);

	const { username, origin } = user;

	// const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
	// 	async onSuccess(data, variables, context) {
	// 		const { account, chain } = data;
	// 		// 切換 chainId 到 Arbitrum, 若尚未 connect 成功 switchNetwork 會是 undefined
	// 		// WalletConnect 會自動切換到設置的第一個 chainId，多插入一個切換會有 pending 的 bug
	// 		// 所以只有連接 MetaMask 才執行手動切換
	// 		if (variables.connector.id === 'metaMask') {
	// 			// Arbitrum Sepolia or Arbitrum
	// 			process.env.NODE_ENV === 'development'
	// 				? switchChain?.({ chainId: 421614 })
	// 				: switchChain?.({ chainId: 42161 });
	// 		}
	// 	},
	// 	onError(error, variables, context) {},
	// });

	const { connect, connectors } = useConnect({
		mutation: {
			onSuccess: async (data, variables: any, context) => {
				const { accounts, chainId } = data;

				// 切換 chainId 到 Arbitrum, 若尚未 connect 成功 switchNetwork 會是 undefined
				// WalletConnect 會自動切換到設置的第一個 chainId，多插入一個切換會有 pending 的 bug
				// 所以只有連接 MetaMask 才執行手動切換
				console.log('switchChain TEST variables', variables);
				if (variables.connector.type === 'metaMask') {
					// Arbitrum Sepolia or Arbitrum
					console.log('switchChain TEST');
					process.env.NODE_ENV === 'development'
						? switchChain?.({ chainId: 421614 })
						: switchChain?.({ chainId: 42161 });
				}
			},
			onError: (error, variables, context) => {},
		},
	});

	useEffect(() => {
		watchChainId(config, {
			onChange(chainId) {
				console.log('Chain ID changed!', chainId);
			},
		});

		watchAccount(config, {
			onChange(data) {
				// dispatch(setIsFirstLogin(false));
				// console.log('HERE data', data);
				// console.log('HERE isAuthenticated', isAuthenticated);
				// console.log('HERE isFirstLogin', isFirstLogin);
				if (!isFirstLogin && checkAuthTitle !== 'Login suceesfully') {
					console.log('HERE 1');
					if (data?.address) {
						// console.log('HERE 2');
						// // 使用者切換 account，登出，確保讓使用者重新登入 跟後端溝通是切換後的 account
						// dispatch(logout({}));
						// disconnect();
						// router.push('/home');
					}
				}
			},
		});
	}, [disconnect, dispatch, router, checkAuthTitle, isFirstLogin]);

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
				// connectors.forEach(connector => {
				// 	console.log('AuthContext connector', connector);
				// 	if (connector.ready && connector.type === origin) {
				// 		connect({ connector });
				// 	}
				// });

				// wagmi v2
				const isExistBrowserConnector = connectors.find(value => value.type === origin);

				if (isExistBrowserConnector) {
					console.log('isExistBrowserConnector');
					if (!isConnected) {
						connect({ connector: isExistBrowserConnector });
					}
				}
			}
		}
	}, [
		username,
		modalOnOpen,
		modalOnClose,
		isAuthenticated,
		connect,
		connectors,
		origin,
		switchChain,
		isConnected,
	]);

	// 連接 MetaMask 或 WalletConnect 狀況下，偵測使用者切換錢包 account
	// useEffect(() => {
	// 	const handleConnectorUpdate = async ({ account, chain }: any) => {
	// if (account) {
	// 	console.log('new account', { account, chain });
	// 	// 使用者切換 account，登出，確保讓使用者重新登入 跟後端溝通是切換後的 account
	// 	dispatch(logout({}));
	// 	disconnect();
	// 	// router.replace('./'); 有導致閃屏現象，暫且改為直接 push 到首頁
	// 	router.push('/home');
	// } else if (chain) {
	// 	console.log('new chain', { account, chain });
	// }
	// 	};

	// 	if (activeConnector) {
	// 		activeConnector.on('change', handleConnectorUpdate);
	// 	}

	// 	return (): void => {
	// 		activeConnector?.off('change', handleConnectorUpdate);
	// 	};
	// }, [activeConnector, dispatch, disconnect, router]);

	// 顯示 登入 登出 成功、失敗時的提醒視窗
	useEffect(() => {
		if (checkAuthSuccess !== null) {
			if (checkAuthSuccess) {
				toast({
					title: checkAuthTitle,
					position: 'top',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
			} else {
				toast({
					title: checkAuthTitle,
					position: 'top',
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
			}

			// 提醒視窗出現之後就重置狀態 checkAuthSuccess === null
			dispatch(resetCheckAuthToast());
		}
	}, [isAuthenticated, checkAuthSuccess, toast, checkAuthTitle, dispatch]);

	// 撈取 Markets 的 Categories 選單資料
	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<>
			{modalIsOpen && ModalDom}
			{children}
		</>
	);
}

export default AuthProvider;
