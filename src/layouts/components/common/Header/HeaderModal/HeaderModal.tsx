import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useAccount, useDisconnect } from 'wagmi';
import {
	Heading,
	Stack,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	Icon,
	Link,
} from '@chakra-ui/react';
import { BiWalletAlt, BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';
import { zIndexHeader } from '@/utils/zIndex';

type HeaderModalType = {
	isLogin: boolean;
};

function HeaderModal({ isLogin }: HeaderModalType) {
	const router = useRouter();
	const { disconnect } = useDisconnect();

	const { t } = useTranslation();

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Modal size="full" isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent _focus={{ boxShadow: 'md' }} maxHeight="100vh" borderRadius={20}>
				<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
				<ModalCloseButton _focus={{ boxShadow: 'none' }} size="lg" mt={1} mr={2} />
				<ModalBody overflowY={'scroll'}>
					<Stack gap={'12px'} mt={'24px'} alignItems={'center'} position={'relative'}>
						<Text
							onClick={() => {
								onClose();
								router.push('/markets');
							}}
							cursor="pointer"
							fontSize="2xl"
							color="gray.800"
						>
							{t('markets')}
						</Text>
						<Link
							href="https://oxmarket.gitbook.io/howitworks"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Text cursor="pointer" fontSize="2xl" color="gray.800">
								{t('how_it_works')}
							</Text>
						</Link>
						<Link
							href="https://t.me/+0U48zkxj9Lw5NTc1"
							isExternal
							_hover={{ textDecoration: 'none' }}
						>
							<Heading mt={'60px'} size={'md'} color={'gray.800'}>
								{t('community')}
							</Heading>
						</Link>
						<Icon cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} mt={'16px'} />
					</Stack>
				</ModalBody>
				<Stack
					w={'100%'}
					flexDirection="row"
					position="fixed"
					bottom={0}
					zIndex={zIndexHeader}
					pl={6}
					pr={6}
					pt={4}
					pb={4}
					bg={'#FFFFFF'}
					borderColor={'black'}
					borderTop="1px solid #E2E8F0;"
				>
					<Button
						onClick={() => {
							onClose();
							isLogin ? disconnect() : open();
						}}
						leftIcon={<Icon as={BiWalletAlt} />}
						w={'100%'}
						size="lg"
						bg="teal.500"
						color="#fff"
					>
						{isLogin ? t('logout') : t('connect_wallet')}
					</Button>
				</Stack>
			</ModalContent>
		</Modal>
	);
}

export default HeaderModal;
