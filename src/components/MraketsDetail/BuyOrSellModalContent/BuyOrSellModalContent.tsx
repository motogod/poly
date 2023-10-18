import React, { useState } from 'react';
import { Stack, Heading, Button, ButtonGroup, IconButton, Input } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import YesOrNoButton from '../Buttons/YesOrNoButton';
import { BuyOrSellModalContentType } from '../type';

function BuyOrSellModalContent(props: BuyOrSellModalContentType) {
	const { transactionType } = props;

	const [transactionValue, setTransactionValue] = useState<string>('');
	const [isYes, setIsYes] = useState(true);

	return (
		<Stack w={'100%'}>
			<Stack mt={'24px'}>
				<Heading
					mb={'14px'}
					fontSize={'14px'}
					color={'gray.500'}
					fontWeight={'700'}
					lineHeight={'17px'}
				>
					Select Outcome
				</Heading>
				<YesOrNoButton
					onClick={() => setIsYes(true)}
					selected={isYes}
					leftText="Yes"
					rightText="0.6 USDT"
				/>
				<YesOrNoButton
					onClick={() => setIsYes(false)}
					selected={!isYes}
					leftText="No"
					rightText="0.4 USDT"
				/>
			</Stack>

			<Stack mt={'24px'}>
				<Stack align={'center'} direction={'row'} justify={'space-between'}>
					<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
						Shares
					</Heading>
					<Button w={'57px'} h={'28px'} size="xs" bg="gray.600" color="#fff">
						Max
					</Button>
				</Stack>
				<ButtonGroup size="sm" isAttached variant="outline">
					<IconButton
						h={'48px'}
						w={'48px'}
						bg={'gray.200'}
						onClick={() => alert('minor')}
						aria-label="Add to friends"
						icon={<MinusIcon w={'9px'} h={'9px'} />}
					/>
					<Input
						w={'81%'}
						onChange={e => setTransactionValue(e.target.value)}
						value={transactionValue}
						placeholder="0.00"
						borderRadius={0}
						textAlign={'center'}
						size="lg"
						border="1px solid #E2E8F0;"
						_placeholder={{ opacity: 1, color: 'gray.400' }}
					/>
					<IconButton
						h={'48px'}
						w={'48px'}
						bg={'gray.200'}
						aria-label="Add to friends"
						icon={<AddIcon w={'9px'} h={'9px'} />}
					/>
				</ButtonGroup>
			</Stack>
			<Stack mt={'14px'} mb={'4px'}>
				<Stack direction={'row'} justify={'space-between'}>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						Share Price
					</Heading>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						0.6 USDT
					</Heading>
				</Stack>
				<Stack direction={'row'} justify={'space-between'}>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						Shares
					</Heading>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						0.00
					</Heading>
				</Stack>
				<Stack direction={'row'} justify={'space-between'}>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						Potential Return
					</Heading>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'500'} lineHeight={'20px'}>
						{`0.00 USDT (0.00%)`}
					</Heading>
				</Stack>
				<Stack direction={'row'} justify={'space-between'}>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
						Total
					</Heading>
					<Heading fontSize={'14px'} color={'gray.800'} fontWeight={'700'} lineHeight={'17px'}>
						0.00 USDT
					</Heading>
				</Stack>
				<Button mt={'24px'} mb={'48px'} w={'100%'} size="lg" bg="teal.500" color="#fff">
					{transactionType}
				</Button>
			</Stack>
		</Stack>
	);
}

export default BuyOrSellModalContent;
