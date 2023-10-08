import {
	Stack,
	Divider,
	Grid,
	Center,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import useFilter from './useFilter';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';
import styles from './markets.module.scss';

const empty_array = [...Array(13)];

function Markets() {
	const { Filter, isOpen } = useFilter();
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();

	return (
		<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack display={{ base: 'none', sm: 'none', md: 'inline' }} w="290px" mb="3">
				<Filter />
			</Stack>
			<Stack
				display={{ base: 'inline', sm: 'inline', md: 'none' }}
				pl={{ sm: 4, md: 0 }}
				pr={{ sm: 4, md: 0 }}
				mb={4}
			>
				<Button
					w={'100%'}
					onClick={onOpen}
					leftIcon={<HamburgerIcon />}
					colorScheme="teal"
					variant="solid"
				>
					Filter
				</Button>
			</Stack>
			<Stack pl={{ sm: 4, md: 0 }} pr={{ sm: 4, md: 0 }} mt="0" direction="row" flex="auto">
				<Stack
					display={{ base: 'none', sm: 'none', md: 'inline' }}
					w={isOpen ? '290px' : '0px'}
					mr={isOpen ? '3' : '-2'}
					flex="none"
					transition="all 0.5s ease-in-out;"
					transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<Stack h="100vh" overflow="auto">
						<LeftMenu />
						<Center>
							<Divider m={6} borderColor="gray" />
						</Center>
					</Stack>
				</Stack>
				<Grid w="100%" h="100%" templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'} gap={4}>
					{empty_array.map((value, index) => {
						return <CategoryCard key={index} />;
					})}
				</Grid>
			</Stack>

			<Modal size="full" isOpen={isModalOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxHeight="100vh" borderRadius={20}>
					<ModalHeader fontWeight="700" color="gray.800">
						Filter
					</ModalHeader>
					<ModalCloseButton size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack position={'relative'}>
							<LeftMenu />
							<Center>
								<Divider m={8} borderColor="gray" />
							</Center>
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
							w={'100%'}
							onClick={() => alert('clear')}
							bg="#fff"
							borderColor="#ccd0d5"
							color="teal.500"
							border="1px"
						>
							Clear All
						</Button>
						<Button w={'100%'} onClick={onClose} colorScheme="teal" variant="solid">
							Done
						</Button>
					</Stack>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default Markets;
