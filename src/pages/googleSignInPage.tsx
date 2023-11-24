import { useEffect } from 'react';
import {
	Spinner,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	Stack,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useSession, signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

const GoogleSignInPage = () => {
	const { data: session } = useSession();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (session === null) void signIn('google');
		if (session) window.close();
	}, [session, dispatch]);

	return (
		<>
			<Modal size="full" isOpen={true} onClose={() => null}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh">
					<ModalBody>
						<Stack mt={20} align={'center'} justify={'center'}>
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="gray.200"
								color="blue.500"
								size="xl"
							/>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GoogleSignInPage;
