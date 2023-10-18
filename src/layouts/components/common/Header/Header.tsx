import React from 'react';
import { useRouter } from 'next/router';
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
	HStack,
	Tag,
	TagLabel,
	TagRightIcon,
	TagLeftIcon,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BiWalletAlt } from 'react-icons/bi';
import { BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import styles from './header.module.scss';
import { PrimaryPink } from '@/utils/color';
import { headerHeight } from '@/utils/screen';
import { CommunityIcon } from '../../../../../public/assets/svg';

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

function Header() {
	const router = useRouter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

	return (
		<Stack
			px={{ md: '116px', sm: '16px' }}
			py={{ md: 6, sm: 4 }}
			w="100%"
			h={headerHeight}
			position="fixed"
			zIndex={5}
			flexDirection="row"
			justifyContent="space-between"
			bg={'gray.50'}
			shadow={'md'}
		>
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircleIcon cursor="pointer" boxSize={12} color={PrimaryPink} />
				<Heading
					onClick={() => router.push('/')}
					cursor="pointer"
					size="md"
					color="gray.700"
					mr={5}
				>
					Gomarket
				</Heading>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					onClick={() => router.push('./markets')}
					cursor="pointer"
					size="sm"
					color="gray.800"
					mr={5}
				>
					Markets
				</Heading>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					How it works
				</Heading>
			</Stack>
			<Stack direction="row" alignItems="center" spacing={6}>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					Connect
				</Heading>
				<Heading
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					Leaderboard
				</Heading>
				<Stack
					onClick={onOpen}
					cursor={'pointer'}
					w={'74px'}
					h={'38px'}
					direction={'row'}
					align={'center'}
					justify={'center'}
					borderRadius={'19px'}
					border={'1px'}
					borderColor={'gray.500'}
				>
					<Icon as={BiSolidUserCircle} boxSize={6} mr={'-10px'} />
					<Icon as={BiMenuAltLeft} boxSize={6} />
				</Stack>
			</Stack>

			<Modal size="full" isOpen={isModalOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack gap={'12px'} mt={'24px'} alignItems={'center'} position={'relative'}>
							<Text
								onClick={() => {
									onClose();
									router.push('./markets');
								}}
								cursor="pointer"
								fontSize="2xl"
								color="gray.800"
							>
								Markets
							</Text>
							<Text
								onClick={() => alert('Leaderboard')}
								cursor="pointer"
								fontSize="2xl"
								color="gray.800"
							>
								Leaderboard
							</Text>
							<Text
								onClick={() => alert('How it works')}
								cursor="pointer"
								fontSize="2xl"
								color="gray.800"
							>
								How it works
							</Text>
							<Text
								onClick={() => alert('Affilate')}
								cursor="pointer"
								fontSize="2xl"
								color="gray.800"
								fontWeight={'400'}
							>
								Affilate
							</Text>
							<Heading mt={'60px'} size={'md'} color={'gray.800'}>
								Community
							</Heading>
							<Icon cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} mt={'16px'} />
						</Stack>
					</ModalBody>
					<Stack
						w={'100%'}
						flexDirection="row"
						position="fixed"
						bottom={0}
						zIndex={5}
						pl={6}
						pr={6}
						pt={4}
						pb={4}
						bg={'#FFFFFF'}
						borderColor={'black'}
						borderTop="1px solid #E2E8F0;"
					>
						<Button
							leftIcon={<Icon as={BiWalletAlt} />}
							w={'100%'}
							size="lg"
							bg="teal.500"
							color="#fff"
						>
							Connect Wallet
						</Button>
					</Stack>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default Header;
