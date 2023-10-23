import React from 'react';
import {
	Box,
	Select,
	Image,
	Text,
	Button,
	Tag,
	TagLabel,
	Badge,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Stack,
} from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';

function PositionsTableCard() {
	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	return (
		<>
			<Box
				align={{ base: 'center', md: 'center', sm: 'center', lg: 'end' }}
				mt="10px"
				mb={'-10px'}
				as={Stack}
			>
				<Select
					border={'1px'}
					borderColor={'gray.200'}
					bg={'#fff'}
					w={isDesktop ? '200px' : '100%'}
					placeholder=""
					size="md"
					defaultValue={'all'}
				>
					<option value="all">All</option>
					<option value="active">Active</option>
					<option value="redeem">Redeem</option>
					<option value="resolved">Resolved</option>
				</Select>
			</Box>
			<TableContainer p={'12px'} mt={'20px'} border="1px solid #E2E8F0;" borderRadius={'10px'}>
				<Table variant="unstyled" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
					<Thead>
						<Tr>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Market
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Outcome
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Share Price
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								{`Price(24H)`}
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Shares
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Value
							</Th>
							<Th
								textTransform={'none'}
								fontSize={'xs'}
								color={'gray.700'}
								fontWeight={'700'}
								lineHeight={'16px'}
							>
								Action
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td verticalAlign={'middle'}>
								<Stack align={'center'} direction={'row'}>
									<Image
										height="48px"
										width="48px"
										src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
										alt="Green double couch with wooden legs"
										borderRadius="lg"
									/>
									<Text fontSize={'14px'} color={'gray.700'}>
										Trump arrest full recap: Mugshot, surrender
									</Text>
								</Stack>
							</Td>
							<Td verticalAlign={'middle'}>
								<Badge px={'14px'} py={'4px'} variant="solid" colorScheme="green">
									Yes
								</Badge>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>0.60</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>27.00 USDT</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>2.00</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Stack align={'center'} direction={'row'}>
									<Text color={'gray.700'}>1.60</Text>
									<Text color={'green.500'}>{`(+133.33%)`}</Text>
								</Stack>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Button
									top={'26%'}
									size="sm"
									bg="#fff"
									border={'1px'}
									borderColor={'teal.500'}
									color="teal.500"
								>
									Trade
								</Button>
							</Td>
						</Tr>
						<Tr>
							<Td verticalAlign={'middle'}>
								<Stack align={'center'} direction={'row'}>
									<Image
										height="48px"
										width="48px"
										src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
										alt="Green double couch with wooden legs"
										borderRadius="lg"
									/>
									<Text fontSize={'14px'} color={'gray.700'}>
										Trump arrest full recap: Mugshot, surrender
									</Text>
								</Stack>
							</Td>
							<Td verticalAlign={'middle'}>
								<Badge mb={'0px'} px={'14px'} py={'4px'} variant="solid" colorScheme="red">
									No
								</Badge>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>0.60</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>27.00 USDT</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>2.00</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Stack align={'center'} direction={'row'}>
									<Text color={'gray.700'}>1.60</Text>
									<Text color={'green.500'}>{`(+133.33%)`}</Text>
								</Stack>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Button
									top={'26%'}
									size="sm"
									bg="#fff"
									border={'1px'}
									borderColor={'teal.500'}
									color="teal.500"
								>
									Trade
								</Button>
							</Td>
						</Tr>
						<Tr>
							<Td verticalAlign={'middle'}>
								<Stack align={'center'} direction={'row'}>
									<Image
										height="48px"
										width="48px"
										src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
										alt="Green double couch with wooden legs"
										borderRadius="lg"
									/>
									<Text fontSize={'14px'} color={'gray.700'}>
										Trump arrest full recap: Mugshot, surrender
									</Text>
								</Stack>
							</Td>
							<Td verticalAlign={'middle'}>
								<Badge px={'14px'} py={'4px'} variant="solid" colorScheme="green">
									Yes
								</Badge>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>0.60</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>27.00 USDT</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Text>2.00</Text>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Stack align={'center'} direction={'row'}>
									<Text color={'gray.700'}>1.60</Text>
									<Text color={'green.500'}>{`(+133.33%)`}</Text>
								</Stack>
							</Td>
							<Td
								verticalAlign={'middle'}
								fontSize={'md'}
								color={'gray.700'}
								fontWeight={'500'}
								lineHeight={'20px'}
							>
								<Button
									size="sm"
									bg="#fff"
									border={'1px'}
									borderColor={'pink.500'}
									color="pink.500"
								>
									Redeem
								</Button>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
}

export default PositionsTableCard;
