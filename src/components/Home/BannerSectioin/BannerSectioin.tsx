import {
	Card,
	Center,
	Heading,
	Stack,
	Text,
	Grid,
	GridItem,
	Button,
	Icon,
	Link,
	FormLabel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useLink } from '@/hooks';
import earnItPng from '@/../public/earn-it.png';
import parisPng from '@/../public/paris-2024.png';

function BannerSectioin() {
	const { t } = useTranslation();

	const { link } = useLink();

	const router = useRouter();

	return (
		<>
			<Stack position={'relative'} mt={{ sm: '48px', md: '48px', lg: '50px' }}>
				<Card
					position={'relative'}
					h={360}
					ml={{ lg: '42px', md: '26px', sm: '16px' }}
					mr={{ lg: '40px', md: '26px', sm: '16px' }}
					borderRadius="3xl"
					filter="brightness(60%)"
				>
					<Image
						style={{ width: '100%', height: '100%', borderRadius: 20 }}
						src={parisPng}
						alt="funds_background"
						fill
						objectFit={'cover'}
					/>
				</Card>
				<Stack
					width={'90%'}
					height={'50%'}
					justifyContent={'space-between'}
					textAlign={'center'}
					position={'absolute'}
					left={0}
					top={0}
					right={0}
					bottom={0}
					margin={'auto'}
				>
					<Text fontSize={'3xl'} color={'#fff'} fontWeight={'bold'}>
						{t('earn_over_USDT')}
					</Text>
					<Center>
						<Link href={link().earnItLink} isExternal _hover={{ textDecoration: 'none' }}>
							<Button
								onClick={() => null}
								px="7"
								py="6"
								borderRadius="3xl"
								bg={'gray.50'}
								color={'gray.800'}
							>
								{t('earn_it')}
							</Button>
						</Link>
					</Center>
				</Stack>
			</Stack>
		</>
	);
}

export default BannerSectioin;
