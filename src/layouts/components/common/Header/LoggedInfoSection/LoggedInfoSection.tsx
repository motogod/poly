import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { Stack, Text, Button, Icon, useToast, Spinner, Divider } from '@chakra-ui/react';
import {
	HiOutlineDocumentDuplicate,
	HiCollection,
	HiCreditCard,
	HiChevronRight,
} from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useContractForRead } from '@/hooks';
import { getPoints } from '@/store/thunks/fetchPoint';
import OxImg from '@/../public/assets/svg/icon-ox-points-01.png';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';

type LoggedInfoSectionType = {
	close: () => void;
};

function LoggedInfoSection({ close }: LoggedInfoSectionType) {
	const router = useRouter();

	const { t } = useTranslation();

	const { proxyWallet } = useSelector((state: RootState) => state.authReducer.userProfile);
	const { userFunds, portfolioValue } = useSelector((state: RootState) => state.authReducer);
	const { userPointData } = useSelector((state: RootState) => state.pointReducer);

	const dispatch = useDispatch<AppDispatch>();

	const { ethValue } = useContractForRead();
	const { address } = useAccount();
	const { data, isError, isLoading, isFetching } = useBalance({
		// address: proxyWallet as `0x${string}`,
		address: '0x05111E862280c8b135bCB5Ee173c557f3e1BBcD8',
	});
	const toast = useToast();

	useEffect(() => {
		dispatch(getPoints({ page: 1, take: 20 }));
	}, [dispatch]);

	const sliceWalletAddress = (walletAddress: string | undefined) => {
		if (walletAddress) {
			const firstSix = walletAddress?.slice(0, 6);
			const lastFour = walletAddress?.slice(-4);

			return `${firstSix}...${lastFour}`;
		}

		return '';
	};

	const checkBalance = () => {
		if (isFetching) return <Spinner />;
		// if (isLoading) return <div>Fetching balance…</div>;
		// if (isError) return <div>Error fetching balance</div>;
		return portfolioValue?.toFixed(2);
		// return `Balance: ${ethValue} USDT`;
	};

	return (
		<>
			<Stack align={'center'} direction={'row'} p={'12px'}>
				<Icon as={ArbIcon} boxSize={6} borderRadius={'12px'} w={'26px'} h={'26px'} />
				<Button
					w={'100%'}
					ml={'4px'}
					style={{ justifyContent: 'space-between' }}
					rightIcon={<Icon boxSize={5} as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
					bg={'gray.50'}
					color={'gray.800'}
					border={'0px'}
					borderRadius={'4px'}
					onClick={() => {
						if (proxyWallet) {
							navigator.clipboard.writeText(proxyWallet);
							toast({
								title: t('copied'),
								position: 'top',
								status: 'success',
								duration: 1000,
								isClosable: true,
							});
						}
					}}
				>
					{sliceWalletAddress(proxyWallet)}
				</Button>
			</Stack>
			<Stack align={'center'} direction={'row'} justify={'space-between'}>
				<Stack
					_hover={{ bg: 'gray.200' }}
					borderRadius={6}
					cursor={'pointer'}
					onClick={() => {
						close();
						router.push('/portfolio');
					}}
					w={'100%'}
					pl={'14px'}
					pr={'20px'}
					pt={'12px'}
					pb={'12px'}
				>
					<Stack align={'center'} direction={'row'}>
						<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
							<Stack gap={'12px'} align={'center'} direction={'row'}>
								<Icon as={HiCollection} w={'20px'} h={'20px'} />
								<Text fontSize={'sm'} color={'gray.800'}>
									{t('logged_menu_profile')}
								</Text>
							</Stack>
							<Stack direction={'row'} alignItems={'center'}>
								<Text fontSize={'md'} color={'gray.800'} fontWeight={'800'}>
									{checkBalance()}
								</Text>
								<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Divider borderColor="gray.300" />
			<Stack
				_hover={{ bg: 'gray.200' }}
				borderRadius={6}
				cursor={'pointer'}
				onClick={() => {
					close();
					router.push('/funds');
				}}
				w={'100%'}
				pl={'14px'}
				pr={'20px'}
				pt={'12px'}
				pb={'12px'}
			>
				<Stack align={'center'} direction={'row'}>
					<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
						<Stack gap={'12px'} align={'center'} direction={'row'}>
							<Icon as={HiCreditCard} w={'20px'} h={'20px'} />
							<Text fontSize={'sm'} color={'gray.800'}>
								{t('funds')}
							</Text>
						</Stack>
						<Stack direction={'row'} alignItems={'center'}>
							<Text fontSize={'md'} color={'gray.800'} fontWeight={'800'}>
								{`$${userFunds?.hold?.toFixed(2)}`}
							</Text>
							<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Divider borderColor="gray.300" />
			<Stack
				_hover={{ bg: 'gray.200' }}
				borderRadius={6}
				cursor={'pointer'}
				onClick={() => {
					close();
					router.push('/oxpoints');
				}}
				w={'100%'}
				pl={'14px'}
				pr={'20px'}
				pt={'12px'}
				pb={'12px'}
			>
				<Stack align={'center'} direction={'row'}>
					<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
						<Stack gap={'12px'} align={'center'} direction={'row'}>
							<Image src={OxImg} width={20} height={20} alt="socialPng" />
							<Text fontSize={'sm'} color={'gray.800'}>
								OX Points
							</Text>
						</Stack>
						<Stack direction={'row'} alignItems={'center'}>
							<Text fontSize={'md'} color={'gray.800'} fontWeight={'800'}>
								{userPointData.balance}
							</Text>
							<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			<Divider borderColor="gray.300" />
		</>
	);
}

export default LoggedInfoSection;
