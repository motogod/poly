import React, { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Text,
	Button,
	Stack,
	Input,
	FormControl,
	FormLabel,
	Checkbox,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getUserProfile, AppDispatch } from '@/store';

function useDisplayNameModal() {
	const [name, setName] = useState('');
	const [checked, setChecked] = useState<boolean>(false);

	const disaptch = useDispatch<AppDispatch>();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	const ModalDom = useMemo(
		() => (
			<Modal size={isDesktop ? 'lg' : 'full'} isOpen={isOpen} onClose={onOpen}>
				<ModalOverlay />
				<ModalContent
					_focus={{ boxShadow: 'md' }}
					borderRadius={20}
					borderBottomRadius={isDesktop ? 20 : 0}
				>
					<ModalHeader alignSelf={'center'}>Create Account</ModalHeader>
					<ModalBody>
						<FormControl isRequired>
							<FormLabel fontWeight={'800'}>Username</FormLabel>
							<Input
								defaultValue={name}
								onChange={e => setName(e.target.value)}
								placeholder={'Please enter your preferred username'}
								border="2px solid #E2E8F0;"
							/>
						</FormControl>

						<Text fontWeight={'500'} fontSize={'sm'} mt={'4px'} color={'#7C7C7C'}>
							This is publicly visible
						</Text>
						<Checkbox
							isChecked={checked}
							onChange={e => setChecked(e.target.checked)}
							w={'100%'}
							mt={'30px'}
							borderColor={'gray.300'}
						>
							<Stack
								fontSize={{ base: '10px', sm: '12px', md: '16px' }}
								direction={'row'}
								align={'center'}
							>
								<Text>I agree to the </Text>
								<Text onClick={() => alert('Terms of Use')} cursor={'pointer'} color={'blue.500'}>
									Terms of Use
								</Text>
								<Text>and </Text>
								<Text onClick={() => alert('Privacy Policy')} cursor={'pointer'} color={'blue.500'}>
									Privacy Policy
								</Text>
								<Text fontWeight={'500'} fontSize={'md'} color={'red'}>
									*
								</Text>
							</Stack>
						</Checkbox>
					</ModalBody>

					<ModalFooter>
						<Button
							isDisabled={!checked || !name ? true : false}
							w={'100%'}
							bg={'teal.500'}
							color="#fff"
							onClick={onClose}
						>
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		),
		[checked, name, isOpen, onOpen, isDesktop, onClose]
	);

	return { ModalDom, isOpen, onOpen, onClose };
}

export default useDisplayNameModal;
