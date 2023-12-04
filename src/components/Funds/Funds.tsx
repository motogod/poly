import React, { useEffect, useState } from 'react';
import {
	Stack,
	Button,
	Input,
	Card,
	CardBody,
	Grid,
	Container,
	Heading,
	Text,
	Icon,
	IconButton,
} from '@chakra-ui/react';
import AppContainer from '@/components/common/Container';
import { useTranslation } from 'next-i18next';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '../../utils/screen';
import { HiCreditCard } from 'react-icons/hi';

function Funds() {
	const { t } = useTranslation();

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
								Balance
							</Text>
						</Stack>
						<Text
							fontSize={{ lg: '4xl', md: 'xl', sm: 'xl' }}
							color={'gray.800'}
							lineHeight={{ lg: 10, md: 1, sm: 1 }}
						>
							{`$ 12000.16 USDT`}
						</Text>
						<Stack direction={'row'} mt={{ lg: '36px', md: '16px', sm: '16px' }}>
							<Button
								w={{ lg: '172px', md: '100px', sm: '100px' }}
								h={{ lg: '48px', md: '40px', sm: '40px' }}
								colorScheme="teal"
							>
								Deposit
							</Button>
							<Button
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
		</Stack>
	);
}

export default Funds;
