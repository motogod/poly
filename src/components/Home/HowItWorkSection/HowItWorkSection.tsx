import { Center, Heading, Stack, Text, Grid, GridItem, Button, Icon, Box } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { paddingMainHorizontal } from '@/utils/screen';
import { HiCreditCard, PlaceIcon, ChooseMarketIcon, EarnIcon } from '../../../../public/assets/svg';
import styles from './howItWork.module.scss';
import Next from '../../../../public/next.svg';

function HowItWorkSection() {
	return (
		<>
			{/* <Image
				src="/testHow.png"
				alt="next"
				sizes="100vw"
				width={100}
				height={100}
				style={{ width: '100%', height: '500' }}
			/> */}
			{/* <div className={styles.triangle}></div> */}
			<Stack mt={{ sm: '48px', md: '48px', lg: '120px' }} backgroundColor="gray.800">
				<Stack px={paddingMainHorizontal}>
					<Center>
						<Heading mt="20" color="gray.50" size="xl">
							How It Works
						</Heading>
					</Center>
					<Stack mt={{ md: '20', sm: '10' }} mb={{ md: '20', sm: '10' }} px={{ md: '40', sm: '6' }}>
						<Grid templateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }} gap={5}>
							<GridItem>
								<Icon as={HiCreditCard} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									Connect Wallet
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{
										"To trade, you'll need to fund your account, If you already own crypto, you can deposit funds directly fro a wallet or exchange."
									}
								</Text>
							</GridItem>
							<GridItem>
								<Icon as={ChooseMarketIcon} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									Choose a Market
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{
										"To trade, you'll need to fund your account, If you already own crypto, you can deposit funds directly fro a wallet or exchange."
									}
								</Text>
							</GridItem>
						</Grid>
						<Grid
							mt={{ md: '10', sm: '5' }}
							templateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
							gap={5}
						>
							<GridItem>
								<Icon as={PlaceIcon} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									Place a Bet
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{
										"To trade, you'll need to fund your account, If you already own crypto, you can deposit funds directly fro a wallet or exchange."
									}
								</Text>
							</GridItem>
							<GridItem>
								<Icon as={EarnIcon} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									{"Earn if You're Right"}
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{
										"To trade, you'll need to fund your account, If you already own crypto, you can deposit funds directly fro a wallet or exchange."
									}
								</Text>
							</GridItem>
						</Grid>
					</Stack>
					<Center mb="40">
						<Button
							onClick={() => alert('Learn More')}
							px="7"
							py="6"
							borderRadius="3xl"
							colorScheme="teal"
						>
							Learn More
						</Button>
					</Center>
				</Stack>
			</Stack>
		</>
	);
}

export default HowItWorkSection;
