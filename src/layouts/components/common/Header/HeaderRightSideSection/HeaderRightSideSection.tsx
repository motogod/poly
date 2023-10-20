import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
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
} from '@chakra-ui/react';
import { BiWalletAlt, BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';
import SocialPng from './social.png';
import LoggedInfoSectioin from '../LoggedInfoSectioin';

const isLogin = true;

function HeaderRightSideSection() {
	const router = useRouter();
	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	// full Modal when not login yet
	const {
		isOpen: isModalOpen,
		onOpen: onNotLoggedOpen,
		onClose: onNotLoggedClose,
	} = useDisclosure();
	// full Modal when Logged in
	const {
		isOpen: isLoggedModalOpen,
		onOpen: onLoggedOpen,
		onClose: onLoggedClose,
	} = useDisclosure();
	// for Pop
	const { isOpen: isPopOpen, onToggle, onClose: onPopClose } = useDisclosure();

	const loggedMenuInfoSection = (close: () => void, type: string) => {
		const textAlign = type === 'pop' ? 'left' : 'center';
		const spacing = type === 'pop' ? '4px' : '12px';

		return (
			<Stack
				py={'32px'}
				mt={'32px'}
				mb={'44px'}
				mx={'16px'}
				spacing={spacing}
				textAlign={textAlign}
				borderTop={type === 'pop' ? '1px' : '0px'}
				borderBottom={type === 'pop' ? '1px' : '0px'}
				borderColor={'gray.100'}
			>
				<Text
					onClick={() => {
						router.push('./portfolio');
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					Profile
				</Text>
				<Text
					onClick={() => {
						router.push('./markets');
						close();
					}}
					cursor={'pointer'}
					size={'md'}
					color={'gray.800'}
				>
					Markets
				</Text>
				<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
					Leaderboard
				</Text>
				<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
					How it works
				</Text>
				<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
					Affiliate
				</Text>
			</Stack>
		);
	};

	return (
		<Stack direction="row" alignItems="center" spacing={6}>
			{isLogin ? (
				<Stack direction={'row'} align={'center'} spacing={'32px'}>
					<Stack
						display={{ base: 'none', sm: 'none', md: 'none', lg: 'inline-flex' }}
						direction={'row'}
						align={'center'}
						spacing={'32px'}
					>
						<Stack onClick={() => router.push('./portfolio')} cursor={'pointer'}>
							<Text fontSize={'16px'} color={'gray.800'} lineHeight={'12px'}>
								$24000.73
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								Portfolio
							</Heading>
						</Stack>
						<Stack>
							<Text fontSize={'16px'} color={'gray.800'} lineHeight={'12px'}>
								$32000.16
							</Text>
							<Heading size={'xs'} color={'gray.800'}>
								Funds
							</Heading>
						</Stack>
						<Button w={'108px'} h={'40px'} size="md" bg="teal.500" color="#fff">
							Deposit
						</Button>
					</Stack>
					<Popover
						placement="bottom-start"
						isOpen={isPopOpen}
						onClose={() => {
							onPopClose();
							onLoggedClose();
						}}
					>
						<PopoverTrigger>
							<Stack
								onClick={() => {
									isDesktop ? onToggle() : onLoggedOpen();
								}}
								cursor={'pointer'}
								w={'74px'}
								h={'38px'}
								direction={'row'}
								align={'center'}
								justify={'center'}
								borderRadius={'19px'}
								border={'1px'}
								borderColor={'gray.400'}
							>
								<Icon as={ArbIcon} boxSize={6} borderRadius={'12px'} mr={'-8px'} />
								<Icon as={BiMenuAltLeft} boxSize={6} />
							</Stack>
						</PopoverTrigger>

						<PopoverContent
							_focus={{ boxShadow: 'md' }}
							zIndex={6}
							px={'6px'}
							py={'22px'}
							mt={'34px'}
							border={'1px'}
							borderColor={'transparent'}
							borderRadius={'12px'}
							bg={'#fff'}
							shadow={'md'}
						>
							<PopoverHeader>
								<LoggedInfoSectioin />
							</PopoverHeader>

							{loggedMenuInfoSection(onPopClose, 'pop')}
							<PopoverFooter>
								<Heading size={'sx'} color={'gray.800'} fontWeight={'800'}>
									Community
								</Heading>
								<Icon mt={'16px'} cursor={'pointer'} as={CommunityIcon} w={'36px'} h={'36px'} />
							</PopoverFooter>
						</PopoverContent>
					</Popover>
				</Stack>
			) : (
				<>
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
						onClick={onNotLoggedOpen}
						cursor={'pointer'}
						w={'74px'}
						h={'38px'}
						direction={'row'}
						align={'center'}
						justify={'center'}
						borderRadius={'19px'}
						border={'1px'}
						borderColor={'gray.400'}
					>
						<Icon as={BiSolidUserCircle} boxSize={6} mr={'-10px'} />
						<Icon as={BiMenuAltLeft} boxSize={6} />
					</Stack>
				</>
			)}
			{/* Not Logged Modal */}
			<Modal size="full" isOpen={isModalOpen} onClose={onNotLoggedClose}>
				<ModalOverlay />
				<ModalContent _focus={{ boxShadow: 'md' }} maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack gap={'12px'} mt={'24px'} alignItems={'center'} position={'relative'}>
							<Text
								onClick={() => {
									onNotLoggedClose();
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
			{/* Logged Modal */}
			<Modal size="full" isOpen={isLoggedModalOpen} onClose={onLoggedClose}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton _focus={{ boxShadow: 'none' }} size="lg" mt={1} mr={2} />
					<ModalBody>
						<Stack mt={'24px'}>
							<LoggedInfoSectioin />
							<Stack w={'100%'} h={'1px'} bg={'gray.100'} mt={'8px'} />
						</Stack>
						<Stack align={'center'}>
							{loggedMenuInfoSection(onLoggedClose, 'modal')}
							<Heading mt={'60px'} mb={'16px'} size={'xs'} color={'gray.800'}>
								Community
							</Heading>
							<Image src={SocialPng} width={36} height={36} alt="socialPng" />
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
						<Button w={'100%'} size="lg" bg="teal.500" color="#fff">
							Deposit
						</Button>
					</Stack>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default HeaderRightSideSection;
