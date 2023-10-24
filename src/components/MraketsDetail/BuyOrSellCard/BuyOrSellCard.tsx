import React, { HtmlHTMLAttributes, useState } from 'react';
import {
	Stack,
	Card,
	Heading,
	Button,
	Input,
	useNumberInput,
	HStack,
	Box,
	Select,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import BuyOrSellButton from '../Buttons/BuyOrSellButton';
import YesOrNoButton from '../Buttons/YesOrNoButton';

type SelectedType = 'market' | 'limit';

function BuyOrSellCard() {
	const [isBuy, setIsBuy] = useState(true);
	const [isYes, setIsYes] = useState(true);
	const [selected, setSelected] = useState<SelectedType>('market');

	const {
		getInputProps: getLimitInputProps,
		getIncrementButtonProps: getIncLimitBtnProps,
		getDecrementButtonProps: getDescBtnProps,
	} = useNumberInput({
		step: 0.01,
		defaultValue: 0.0,
		min: 0.0,
		max: 1.0,
		precision: 2,
	});

	// Limit Price
	const incLimitPrice = getIncLimitBtnProps();
	const decLimitPrice = getDescBtnProps();
	const inputLimitPrice = getLimitInputProps();

	console.log('inputLimitPrice', inputLimitPrice.value);

	const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
		step: 0.01,
		defaultValue: 0.0,
		min: 0.0,
		max: 1.0,
		precision: 2,
	});

	// Shares
	const incShares = getIncrementButtonProps();
	const decShares = getDecrementButtonProps();
	const inputShares = getInputProps();

	console.log('inputShares', inputShares.value);

	return (
		<Card
			p={'24px'}
			w={'100%'}
			cursor="pointer"
			shadow="lg"
			border="1px solid #E2E8F0;"
			borderRadius="3xl"
		>
			<Box
				// align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
				mt="8px"
				as={Stack}
				borderBottom={'1px solid #E2E8F0;'}
			>
				<Select
					border={'0px'}
					focusBorderColor="transparent"
					borderColor={'gray.200'}
					bg={'#fff'}
					w={'120px'}
					placeholder=""
					size="md"
					defaultValue={selected}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setSelected(e.target.value as SelectedType)
					}
				>
					<option value="market">Market</option>
					<option value="limit">Limit</option>
				</Select>
			</Box>
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
				{selected === 'limit' && (
					<Stack mt={'24px'}>
						<Stack align={'center'} direction={'row'} justify={'space-between'}>
							<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
								Limite Price
							</Heading>
						</Stack>
						<HStack mt={'16px'} gap={0} maxW="100%">
							<Button borderRadius={'6px 0px 0px 6px'} {...decLimitPrice}>
								-
							</Button>
							<Input
								textAlign={'center'}
								borderRadius={0}
								border="1px solid #E2E8F0;"
								{...inputLimitPrice}
							/>
							<Button borderRadius={'0px 6px 6px 0px'} {...incLimitPrice}>
								+
							</Button>
						</HStack>
					</Stack>
				)}
				<Stack mt={'24px'}>
					<Stack align={'center'} direction={'row'} justify={'space-between'}>
						<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
							Shares
						</Heading>
						<Button w={'57px'} h={'28px'} size="xs" bg="gray.600" color="#fff">
							Max
						</Button>
					</Stack>
					<HStack mt={'16px'} gap={0} maxW="100%">
						<Button borderRadius={'6px 0px 0px 6px'} {...decShares}>
							-
						</Button>
						<Input
							textAlign={'center'}
							borderRadius={0}
							border="1px solid #E2E8F0;"
							{...inputShares}
						/>
						<Button borderRadius={'0px 6px 6px 0px'} {...incShares}>
							+
						</Button>
					</HStack>
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
