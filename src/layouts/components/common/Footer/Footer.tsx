'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	Box,
	Container,
	Stack,
	SimpleGrid,
	Text,
	useColorModeValue,
	Heading,
	Select,
	Icon,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { paddingMainHorizontal } from '@/utils/screen';
import { PrimaryPink } from '@/utils/color';
import { CommunityIcon } from '../../../../../public/assets/svg';
import SocialIcon from '../../../../../public/assets/svg/socialIcons.png';
import NextIcon from '../../../../../public/next.svg';
import { LocalesEnum } from '@/../public/locales/type';

const selectorOptions = Object.entries(LocalesEnum).map(([value, label]) => ({
	value,
	label,
}));

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'500'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

export default function LargeWithAppLinksAndSocial() {
	const { t, i18n } = useTranslation();

	const router = useRouter();

	const changeLocale = (locale: any) => {
		// 變更語系網址 shallow: true 避免刷新頁面
		router.push(
			{
				pathname: router.pathname,
				query: router.query,
			},
			router.asPath,
			{ locale, shallow: true }
		);
		// 直接動態變換更新語系
		i18n.changeLanguage(locale);
	};

	return (
		<Box
			px={paddingMainHorizontal}
			backgroundColor="gray.50"
			// bg={useColorModeValue('gray.50', 'gray.900')}
			// color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container as="div" maxW={'100%'} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
					<Stack align={'flex-start'}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<CircleIcon cursor="pointer" boxSize={12} color={PrimaryPink} />
							<Heading cursor="pointer" size="md" color={PrimaryPink} mr={5}>
								Gomarket
							</Heading>
						</Stack>
						<Box mt="2" as={Stack}>
							<Select
								_hover={{ bg: 'gray.100' }}
								cursor={'pointer'}
								_focusVisible={{
									outline: 'none',
								}}
								border={'1px'}
								borderColor={'gray.200'}
								bg={'#fff'}
								w="320px"
								placeholder=""
								size="md"
								defaultValue={i18n.language}
								onChange={e => changeLocale(e.target.value)}
							>
								{/* {selectorOptions.map(value => (
									<>
										<option value={value.value}>{value.label}</option>
									</>
								))} */}
								<option value="en">English</option>
								<option value="zh">Chinese</option>
								<option value="jp">Japanese</option>
							</Select>
						</Box>
					</Stack>

					<Stack align={'flex-start'} />

					<Stack align={'flex-start'}>
						<ListHeader>Markets</ListHeader>
						<Box as="a" href={'#'} _hover={{ color: 'gray.600' }}>
							How it works
						</Box>
						<Box as="a" href={'#'} _hover={{ color: 'gray.600' }}>
							FAQ
						</Box>
						<Box as="a" href={'#'} _hover={{ color: 'gray.600' }}>
							{t('privacy_policy')}
						</Box>
					</Stack>

					<Stack align={'flex-start'}>
						<ListHeader>Support</ListHeader>
						{/* <Icon cursor={'pointer'} as={SocialIcon} w={'36px'} h={'36px'} /> */}
						<Image src={SocialIcon} width={36} height={36} alt="socialPng" />
						{/* <AppStoreBadge />
		        <PlayStoreBadge /> */}
					</Stack>
				</SimpleGrid>
			</Container>

			<Box
				borderTopWidth={0}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'100%'}
					py={14}
					mb={{ md: '72px', sm: '72px' }}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ md: 'space-between' }}
					align={{ md: 'center' }}
				>
					<Text>© 2024 gomarket.com</Text>
				</Container>
			</Box>
		</Box>
	);
}
