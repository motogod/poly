'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
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
	Link,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppDispatch,
	getMarkets,
	getSpotlightMarkets,
	getHomeCategorySectionMarkets,
} from '@/store';
import { paddingMainHorizontal } from '@/utils/screen';
import { PrimaryPink } from '@/utils/color';
import { CommunityIcon } from '../../../../../public/assets/svg';
import SocialIcon from '../../../../../public/assets/svg/socialIcons.png';
import NextIcon from '../../../../../public/next.svg';
import { LocalesEnum } from '@/../public/locales/type';
import logoImg from '@/../public/logo.png';

const selectorOptions = Object.entries(LocalesEnum).map(([value, label]) => ({
	value,
	label,
}));

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'500'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

export default function LargeWithAppLinksAndSocial() {
	const { t, i18n } = useTranslation();

	const dispatch = useDispatch<AppDispatch>();

	const router = useRouter();

	const changeLocale = (locale: LocalesEnum) => {
		// 變更語系網址 shallow: true 避免刷新頁面
		// 設為 true 避免刷新頁面 有時更換語言會失效
		router.push(
			{
				pathname: router.pathname,
				query: router.query,
			},
			router.asPath,
			{ locale, shallow: false }
		);

		// 直接動態變換更新語系
		i18n.changeLanguage(locale);

		// 一些透過 API 抓到的內容有區分語系 更新，必須設置點延遲才能使用到正確 seted language 的 API
		setTimeout(() => {
			dispatch(getSpotlightMarkets());
			dispatch(getHomeCategorySectionMarkets({ childrenCategories: [] }));
			dispatch(
				getMarkets({
					categories: '',
					volumeValue: 'volume-default',
					dateValue: 'date-default',
				})
			);
		}, 300);
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
							<Stack onClick={() => router.push('/')} cursor={'pointer'}>
								<Image src={logoImg} alt="logoImg" />
							</Stack>
							<Heading cursor="pointer" size="md" color={PrimaryPink} mr={5}>
								ox.market
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
								onChange={e => changeLocale(e.target.value as LocalesEnum)}
							>
								{selectorOptions.map((value, index) => (
									<>
										<option key={`${value.value}${index}`} value={value.value}>
											{value.label}
										</option>
									</>
								))}
								{/* <option value="en">English</option>
								<option value="zh">Chinese</option>
								<option value="jp">Japanese</option> */}
							</Select>
						</Box>
					</Stack>

					<Stack align={'flex-start'} />

					<Stack align={'flex-start'}>
						<ListHeader>{t('markets')}</ListHeader>
						<Link
							href="https://oxmarket.gitbook.io/howitworks"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Box as="a" _hover={{ color: 'gray.600' }}>
								{t('how_it_works')}
							</Box>
						</Link>
						<Box as="a" _hover={{ color: 'gray.600' }}>
							{t('privacy_policy')}
						</Box>
						<Box as="a" _hover={{ color: 'gray.600' }}>
							{t('term_of_use')}
						</Box>
					</Stack>

					<Stack align={'flex-start'}>
						<ListHeader>{t('support')}</ListHeader>
						{/* <Icon cursor={'pointer'} as={SocialIcon} w={'36px'} h={'36px'} /> */}
						<Link
							href="https://t.me/+jXOishnrTjBmNWZl"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Image src={SocialIcon} width={36} height={36} alt="socialPng" />
						</Link>
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
					<Text>© 2024 ox.market</Text>
				</Container>
			</Box>
		</Box>
	);
}
