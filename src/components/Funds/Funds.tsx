import React, { useEffect, useState } from 'react';
import { Stack, Button, Card, CardBody, Heading, Text, Icon } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { HiCreditCard } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useContractForRead, useDepositUsdtModal, useWithdrawUsdtModal } from '@/hooks';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';

function Funds() {
	const { t } = useTranslation();

	const { userFunds } = useSelector((state: RootState) => state.authReducer);
	const { ethValue } = useContractForRead();

	const {
		ModalDom: DepositModalDom,
		isOpen: depositModalIsOpen,
		onOpen: depositModalOnOpen,
		onClose: depositModalOnClose,
	} = useDepositUsdtModal();

	const {
		ModalDom: WithdrawModalDom,
		isOpen: withdrawModalIsOpen,
		onOpen: withdrawModalOnOpen,
		onClose: withdrawModalOnClose,
	} = useWithdrawUsdtModal();

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Card
				mt={paddingMainVertical}
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				minH={'434px'}
				shadow="lg"
				border="1px solid #E2E8F0;"
				borderRadius="3xl"
			>
				<CardBody p={0}>
					<Stack
						w={'100%'}
						h={'243px'}
						borderRadius={'3xl'}
						bg="linear-gradient(#319795, #319795);"
						color="white"
						justify={'center'}
					>
						<Heading fontSize={'x-large'} ml={'70px'} size={'lg'} color={'#fff'}>
							Wallet
						</Heading>
					</Stack>
					<Stack mt={{ lg: '73px', md: '16px', sm: '16px' }} ml={'35px'} mb={'32px'}>
						<Stack direction={'row'} alignItems={'center'}>
							<Icon as={HiCreditCard} w={'25px'} h={'25px'} />
							<Text fontSize={'xl'} color={'gray.800'}>
								Funds
							</Text>
						</Stack>
						<Text
							fontSize={{ lg: '4xl', md: 'xl', sm: 'xl' }}
							color={'gray.800'}
							lineHeight={{ lg: 10, md: 1, sm: 1 }}
						>
							{`$ ${userFunds?.hold?.toFixed(2)} USDT`}
						</Text>
						<Stack direction={'row'} mt={{ lg: '36px', md: '16px', sm: '16px' }}>
							<Button
								onClick={() => depositModalOnOpen()}
								w={{ lg: '172px', md: '100px', sm: '100px' }}
								h={{ lg: '48px', md: '40px', sm: '40px' }}
								colorScheme="teal"
							>
								Deposit
							</Button>
							<Button
								onClick={() => withdrawModalOnOpen()}
								w={{ lg: '172px', md: '100px', sm: '100px' }}
								h={{ lg: '48px', md: '40px', sm: '40px' }}
								colorScheme="gray"
							>
								Withdraw
							</Button>
						</Stack>
					</Stack>
				</CardBody>
			</Card>
			{depositModalIsOpen && DepositModalDom}
			{withdrawModalIsOpen && WithdrawModalDom}
		</Stack>
	);
}

export default Funds;
