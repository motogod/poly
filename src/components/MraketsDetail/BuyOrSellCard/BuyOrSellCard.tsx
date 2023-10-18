import React, { useState } from 'react';
import { Stack, Card, Heading, Button, ButtonGroup, IconButton, Input } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { BiWalletAlt } from 'react-icons/bi';
import BuyOrSellButton from '../Buttons/BuyOrSellButton';
import YesOrNoButton from '../Buttons/YesOrNoButton';

function BuyOrSellCard() {
	const [isBuy, setIsBuy] = useState(true);
	const [transactionValue, setTransactionValue] = useState<string>('');
	const [isYes, setIsYes] = useState(true);

	return (
		<Card
			p={'16px'}
			w={'100%'}
			cursor="pointer"
			shadow="lg"
			border="1px solid #E2E8F0;"
			borderRadius="3xl"
		>
			<Stack>
				<Stack mt={'20px'} position="relative" spacing={1.5} direction="row">
					<BuyOrSellButton onClick={() => setIsBuy(true)} text="Buy" selected={isBuy} />
					<BuyOrSellButton onClick={() => setIsBuy(false)} text="Sell" selected={!isBuy} />
				</Stack>

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
							w={'72%'}
							value={transactionValue}
							onChange={e => setTransactionValue(e.target.value)}
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
				<Button
					mt={'24px'}
					w={'100%'}
					leftIcon={<Icon as={BiWalletAlt} />}
					size="lg"
					bg="teal.500"
					color="#fff"
				>
					Connect
				</Button>
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
				</Stack>
			</Stack>
		</Card>
	);
}

export default BuyOrSellCard;
