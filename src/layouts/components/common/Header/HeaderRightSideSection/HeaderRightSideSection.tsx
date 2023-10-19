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
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiWalletAlt, BiSolidUserCircle, BiMenuAltLeft } from 'react-icons/bi';
import {
	HiOutlineDocumentDuplicate,
	HiCollection,
	HiCreditCard,
	HiChevronRight,
} from 'react-icons/hi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';

const isLogin = true;

function HeaderRightSideSection() {
	const router = useRouter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
	const { isOpen, onToggle, onClose: onPopClose } = useDisclosure();

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
					<Popover placement="bottom-start" isOpen={isOpen} onClose={onPopClose}>
						<PopoverTrigger>
							<Stack
								onClick={onToggle}
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
								<Stack align={'center'} direction={'row'}>
									<Icon as={ArbIcon} boxSize={6} borderRadius={'12px'} w={'26px'} h={'26px'} />
									<Button
										w={'100%'}
										ml={'4px'}
										style={{ justifyContent: 'space-between' }}
										rightIcon={<Icon as={HiOutlineDocumentDuplicate} color={'gray.500'} />}
										bg={'gray.50'}
										color={'gray.800'}
										border={'0px'}
										borderRadius={'4px'}
										onClick={() => alert('copy')}
									>
										0x93eA...a00F
									</Button>
								</Stack>
								<Stack
									mt={'12px'}
									gap={'12px'}
									align={'center'}
									direction={'row'}
									justify={'space-between'}
								>
									<Stack w={'100%'} p={'8px'} bg={'gray.50'}>
										<Stack align={'center'} direction={'row'}>
											<Stack
												w={'100%'}
												align={'center'}
												direction={'row'}
												justify={'space-between'}
											>
												<Stack align={'center'} direction={'row'}>
													<Icon as={HiCollection} w={'20px'} h={'20px'} />
													<Text size={'sm'} color={'gray.800'}>
														Portfolio
													</Text>
												</Stack>
												<Stack>
													<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
												</Stack>
											</Stack>
										</Stack>
										<Stack>
											<Text size={'md'} color={'gray.800'} fontWeight={'800'}>
												$24000.73
											</Text>
										</Stack>
									</Stack>
									<Stack w={'100%'} p={'8px'} bg={'gray.50'}>
										<Stack align={'center'} direction={'row'}>
											<Stack
												w={'100%'}
												align={'center'}
												direction={'row'}
												justify={'space-between'}
											>
												<Stack align={'center'} direction={'row'}>
													<Icon as={HiCreditCard} w={'20px'} h={'20px'} />
													<Text size={'sm'} color={'gray.800'}>
														Funds
													</Text>
												</Stack>
												<Stack>
													<Icon as={HiChevronRight} w={'20px'} h={'20px'} />
												</Stack>
											</Stack>
										</Stack>
										<Stack>
											<Text size={'md'} color={'gray.800'} fontWeight={'800'}>
												$32000.16
											</Text>
										</Stack>
									</Stack>
								</Stack>
							</PopoverHeader>

							<Stack
								py={'32px'}
								mt={'32px'}
								mb={'44px'}
								mx={'16px'}
								spacing={'4px'}
								borderTop={'1px'}
								borderBottom={'1px'}
								borderColor={'gray.100'}
							>
								<Text onClick={onPopClose} cursor={'pointer'} size={'md'} color={'gray.800'}>
									Profile
								</Text>
								<Text cursor={'pointer'} size={'md'} color={'gray.800'}>
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
						onClick={onOpen}
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

export default HeaderRightSideSection;
