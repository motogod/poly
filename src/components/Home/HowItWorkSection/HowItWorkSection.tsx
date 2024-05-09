import {
	Center,
	Heading,
	Stack,
	Text,
	Grid,
	GridItem,
	Button,
	Icon,
	Box,
	Link,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { paddingMainHorizontal } from '@/utils/screen';
import { HiCreditCard, PlaceIcon, ChooseMarketIcon, EarnIcon } from '../../../../public/assets/svg';
import styles from './howItWork.module.scss';
import Next from '../../../../public/next.svg';

function HowItWorkSection() {
	const { t } = useTranslation();

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
						<Link
							href="https://oxmarket.gitbook.io/howitworks"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Heading mt="20" color="gray.50" size="xl">
								{t('how_it_works')}
							</Heading>
						</Link>
					</Center>
					<Stack mt={{ md: '20', sm: '10' }} mb={{ md: '20', sm: '10' }} px={{ md: '40', sm: '6' }}>
						<Grid templateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }} gap={5}>
							<GridItem>
								<Icon as={HiCreditCard} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									{t('connect_wallet')}
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{t('how_it_works_desc')}
								</Text>
							</GridItem>
							<GridItem>
								<Icon as={ChooseMarketIcon} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									{t('choose_a_market')}
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{t('how_it_works_desc')}
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
									{t('place_a_bet')}
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{t('how_it_works_desc')}
								</Text>
							</GridItem>
							<GridItem>
								<Icon as={EarnIcon} w={'48px'} h={'48px'} ml={'-4px'} />
								<Heading mt="20px" color="teal.200" size="md">
									{t('earn_if_you_are_right')}
								</Heading>
								<Text mt="2" color="gray.50" size="md">
									{t('how_it_works_desc')}
								</Text>
							</GridItem>
						</Grid>
					</Stack>
					<Center mb="40">
						<Link
							href="https://oxmarket.gitbook.io/howitworks"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Button px="7" py="6" borderRadius="3xl" colorScheme="teal">
								{t('learn_more')}
							</Button>
						</Link>
					</Center>
				</Stack>
			</Stack>
		</>
	);
}

export default HowItWorkSection;
