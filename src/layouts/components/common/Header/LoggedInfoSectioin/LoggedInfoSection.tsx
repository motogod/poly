import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Text, Button, Icon } from '@chakra-ui/react';
import {
	HiOutlineDocumentDuplicate,
	HiCollection,
	HiCreditCard,
	HiChevronRight,
} from 'react-icons/hi';
import { CommunityIcon, ArbIcon } from '../../../../../../public/assets/svg';

function LoggedInfoSection() {
	return (
		<>
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
			<Stack mt={'12px'} gap={'12px'} align={'center'} direction={'row'} justify={'space-between'}>
				<Stack w={'100%'} p={'8px'} bg={'gray.50'}>
					<Stack align={'center'} direction={'row'}>
						<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
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
						<Stack w={'100%'} align={'center'} direction={'row'} justify={'space-between'}>
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
		</>
	);
}

export default LoggedInfoSection;
