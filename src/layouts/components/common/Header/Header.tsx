import React from 'react';
import { useRouter } from 'next/router';
import {
	Grid,
	GridItem,
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
	Center,
} from '@chakra-ui/react';
import { AtSignIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import styles from './header.module.scss';
import { PrimaryPink } from '@/utils/color';

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
			px={{ md: 105, sm: 6 }}
			py={{ md: 6, sm: 4 }}
			w="100%"
			position="fixed"
			zIndex={5}
			flexDirection="row"
			justifyContent="space-between"
			backgroundColor="gray.50"
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
					// display={{ base: 'none', sm: 'none', md: 'inline' }}
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
					// display={{ base: 'none', sm: 'none', md: 'inline' }}
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
					// display={{ base: 'none', sm: 'none', md: 'inline' }}
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					Connect
				</Heading>
				<Heading
					// display={{ base: 'none', sm: 'none', md: 'inline' }}
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					cursor="pointer"
					size="sm"
					color="gray.800"
				>
					Leaderboard
				</Heading>
				<Button
					// display={{ base: 'inline', sm: 'inline', md: 'none' }}
					display={{ lg: 'none', md: 'inline', sm: 'inline' }}
					w="74px"
					leftIcon={<AtSignIcon boxSize={5} />}
					rightIcon={<HamburgerIcon boxSize={5} />}
					onClick={onOpen}
					bg="#fff"
					color="gray.700"
					border="1px"
					borderRadius="20px"
				></Button>
			</Stack>

			<Modal size="full" isOpen={isModalOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack gap={'12px'} mt={12} alignItems={'center'} position={'relative'}>
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
							leftIcon={<HamburgerIcon />}
							w={'100%'}
							size="lg"
							onClick={onClose}
							// colorScheme="teal"
							// variant="solid"
							bg="#D53F8C"
							borderColor="#D53F8C"
							color="#fff"
						>
							Connect Wallet
						</Button>
					</Stack>
				</ModalContent>
			</Modal>
		</Stack>

		// <div className={styles.headerWrapper}>
		// 	<p>Header</p>
		// 	<WarningIcon w={8} h={8} color="red.500" />
		// </div>
	);
}

export default Header;
