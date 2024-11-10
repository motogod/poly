import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Heading, Stack, Link } from '@chakra-ui/react';
import { useLink } from '@/hooks';
import SocialIcon from '../../../../../../public/assets/svg/socialIcons.png';
import XIcon from '../../../../../../public/assets/svg/xicon.png';
import IgIcon from '../../../../../../public/assets/svg/igicon.png';
import { LocalesType } from '@/../public/locales/type';

function SocialMenuSection() {
	const router = useRouter();

	const { t } = useTranslation();

	const { link } = useLink();

	const locale = router.locale as LocalesType;

	return (
		<Stack>
			<Stack>
				<Heading mt={'0px'} mb={'16px'} fontSize={'14px'} color={'gray.800'}>
					{t('community')}
				</Heading>
			</Stack>
			<Stack direction={'row'}>
				<Link
					href="https://t.me/OXmarket_announcement"
					isExternal
					_hover={{ textDecoration: 'none' }}
				>
					<Image src={SocialIcon} width={36} height={36} alt="socialPng" />
				</Link>
				<Link href={link().twitterChannel} isExternal _hover={{ textDecoration: 'none' }}>
					<Image src={XIcon} width={36} height={36} alt="socialPng" />
				</Link>
				<Link
					href="https://www.instagram.com/ox_market_/"
					isExternal
					_hover={{ textDecoration: 'none' }}
				>
					<Image src={IgIcon} width={36} height={36} alt="socialPng" />
				</Link>
			</Stack>
		</Stack>
	);
}

export default SocialMenuSection;
