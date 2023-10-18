import React from 'react';
import {
	Card,
	CardBody,
	Heading,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

function OrderBookCard() {
	return (
		<Card minH={'434px'} shadow="lg" border="1px solid #E2E8F0;" borderRadius="3xl">
			<CardBody>
				<Heading size={'md'} color={'gray.800'}>
					Order Book
				</Heading>
				<Tabs mt={'28px'}>
					<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'24px'}>
							Trade Yes
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'24px'}>
							Trade No
						</Tab>
					</TabList>
					{/* <TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" /> */}
					<TabPanels>
						<TabPanel p={0}>
							<TableContainer
								p={'12px'}
								mt={'20px'}
								border="1px solid #E2E8F0;"
								borderRadius={'10px'}
							>
								<Table
									variant="unstyled"
									style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}
								>
									<Thead>
										<Tr>
											<Th fontSize={'xs'} color={'gray.700'} fontWeight={'700'} lineHeight={'16px'}>
												Trade Type
											</Th>
											<Th fontSize={'xs'} color={'gray.700'} fontWeight={'700'} lineHeight={'16px'}>
												Price
											</Th>
											<Th fontSize={'xs'} color={'gray.700'} fontWeight={'700'} lineHeight={'16px'}>
												Shares
											</Th>
											<Th
												fontSize={'xs'}
												color={'gray.700'}
												fontWeight={'700'}
												lineHeight={'16px'}
												isNumeric
											>
												Total
											</Th>
										</Tr>
									</Thead>
									<Tbody>
										<Tr>
											<Td
												bg={'red.100'}
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
											>
												Ask
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												0.90 USDT
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												30.00
											</Td>
											<Td
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
												isNumeric
											>
												27.00 USDT
											</Td>
										</Tr>
										<Tr>
											<Td
												bg={'red.100'}
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
											>
												Ask
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												0.90 USDT
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												30.00
											</Td>
											<Td
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
												isNumeric
											>
												27.00 USDT
											</Td>
										</Tr>
										<Tr>
											<Td
												bg={'green.100'}
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
											>
												Ask
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												0.90 USDT
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												30.00
											</Td>
											<Td
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
												isNumeric
											>
												27.00 USDT
											</Td>
										</Tr>
										<Tr>
											<Td
												bg={'green.100'}
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
											>
												Ask
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												0.90 USDT
											</Td>
											<Td fontSize={'md'} color={'gray.700'} fontWeight={'500'} lineHeight={'20px'}>
												30.00
											</Td>
											<Td
												fontSize={'md'}
												color={'gray.700'}
												fontWeight={'500'}
												lineHeight={'20px'}
												isNumeric
											>
												27.00 USDT
											</Td>
										</Tr>
									</Tbody>
								</Table>
							</TableContainer>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</CardBody>
		</Card>
	);
}

export default OrderBookCard;
