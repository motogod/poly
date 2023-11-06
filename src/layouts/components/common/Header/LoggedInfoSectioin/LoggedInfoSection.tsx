import React from 'react';
import { useRouter } from 'next/router';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { Stack, Text, Button, Icon, useToast } from '@chakra-ui/react';
import {
	HiOutlineDocumentDuplicate,
	HiCollection,
	HiCreditCard,
	HiChevronRight,
} from 'react-icons/hi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';

function LoggedInfoSection() {
	const { address } = useAccount();
	const { data, isError, isLoading } = useBalance({ address });
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
	const checkBalance = () => {
		if (isLoading) return <div>Fetching balance…</div>;
		if (isError) return <div>Error fetching balance</div>;
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
						if (address) {
							navigator.clipboard.writeText(address);
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
					{sliceWalletAddress(address)}
				</Button>
			</Stack>
			<Stack mt={'12px'} gap={'12px'} align={'center'} direction={'row'} justify={'space-between'}>
				<Stack w={'100%'} p={'8px'} bg={'gray.50'}>
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
				<Stack w={'100%'} p={'8px'} bg={'gray.50'}>
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
							$32000.16
						</Text>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
}

export default LoggedInfoSection;
