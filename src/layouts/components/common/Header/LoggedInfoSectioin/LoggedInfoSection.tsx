import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { Stack, Text, Button, Icon, useToast, Spinner } from '@chakra-ui/react';
import {
	HiOutlineDocumentDuplicate,
	HiCollection,
	HiCreditCard,
	HiChevronRight,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';

type LoggedInfoSectionType = {
	close: () => void;
};

function LoggedInfoSection({ close }: LoggedInfoSectionType) {
	const router = useRouter();

	const { address: userAddress } = useSelector((state: RootState) => state.authReducer.user);

	const { address } = useAccount();
	const { data, isError, isLoading, isFetching } = useBalance({
		address: userAddress as `0x${string}`,
	});
	const toast = useToast();

	const sliceWalletAddress = (walletAddress: string | undefined) => {
		if (walletAddress) {
			const firstSix = walletAddress?.slice(0, 6);
			const lastFour = walletAddress?.slice(-4);

			return `${firstSix}...${lastFour}`;
		}

		return '';
	};
	console.log('address', address);
	console.log('data', data);
	console.log('isLoading', isLoading);
	const checkBalance = () => {
		if (isFetching) return <Spinner />;
		// if (isLoading) return <div>Fetching balance…</div>;
		// if (isError) return <div>Error fetching balance</div>;
		return (
			<p>
				Balance: {data?.formatted} {data?.symbol}
			</p>
		);
	};

	return (
		<>
			<Stack align={'center'} direction={'row'}>
				<Icon as={ArbIcon} boxSize={6} borderRadius={'12px'} w={'26px'} h={'26px'} />
				<Button
					w={'100%'}
					ml={'4px'}
					style={{ justifyContent: 'space-between' }}
					rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
					bg={'gray.50'}
					color={'gray.800'}
					border={'0px'}
					borderRadius={'4px'}
					onClick={() => {
						if (userAddress) {
							navigator.clipboard.writeText(userAddress);
							toast({
								title: 'Copied',
								position: 'top',
								status: 'success',
								duration: 1000,
								isClosable: true,
							});
						}
					}}
				>
					{sliceWalletAddress(userAddress)}
				</Button>
			</Stack>
			<Stack mt={'12px'} gap={'12px'} align={'center'} direction={'row'} justify={'space-between'}>
				<Stack
					cursor={'pointer'}
					onClick={() => {
						close();
						router.push('./portfolio');
					}}
					w={'100%'}
					p={'8px'}
					bg={'gray.50'}
				>
					<Stack align={'center'} direction={'row'}>
						<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
							<Stack align={'center'} direction={'row'}>
								<Icon as={HiCollection} w={'20px'} h={'20px'} />
								<Text size={'sm'} color={'gray.800'}>
									Portfolio
								</Text>
							</Stack>
							<Stack>
								<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
							</Stack>
						</Stack>
					</Stack>
					<Stack>
						<Text size={'md'} color={'gray.800'} fontWeight={'800'}>
							{checkBalance()}
						</Text>
					</Stack>
				</Stack>
				<Stack
					cursor={'pointer'}
					onClick={() => {
						close();
						router.push('./funds');
					}}
					w={'100%'}
					p={'8px'}
					bg={'gray.50'}
				>
					<Stack align={'center'} direction={'row'}>
						<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
							<Stack align={'center'} direction={'row'}>
								<Icon as={HiCreditCard} w={'20px'} h={'20px'} />
								<Text size={'sm'} color={'gray.800'}>
									Funds
								</Text>
							</Stack>
							<Stack>
								<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
							</Stack>
						</Stack>
					</Stack>
					<Stack>
						<Text size={'md'} color={'gray.800'} fontWeight={'800'}>
							$0.00
						</Text>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}

export default LoggedInfoSection;
