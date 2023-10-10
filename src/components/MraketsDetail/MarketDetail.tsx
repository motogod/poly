import {
	Stack,
	Card,
	CardBody,
	Heading,
	Text,
	Image,
	Tag,
	TagLabel,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Input,
	Button,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';
import { useMediaQuery } from 'react-responsive';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import { SettingsIcon } from '@chakra-ui/icons';

const empty_array = [...Array(13)];

const data = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

function MarketsDetail() {
	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	return (
		<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack gap={'28px'} direction="row">
				<Stack spacing={'20px'} width={'100%'}>
					<Card
						display={{ lg: 'none', md: 'inline', sm: 'inline' }}
						w={'100%'}
						cursor="pointer"
						shadow="lg"
						borderRadius="3xl"
					>
						<Tabs p={'16px'} position="relative" variant="unstyled">
							<TabList>
								<Tab color={'gray.700'} fontWeight={'700'}>
									Buy
								</Tab>
								<Tab color={'gray.700'} fontWeight={'700'}>
									Sell
								</Tab>
							</TabList>
							<TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" />
							<TabPanels>
								<TabPanel p={0}>
									<Stack mt={'20px'} position="relative" spacing={1.5} direction="row">
										<Stack width="10%">
											<Stack
												borderBottom="2px solid #68D391;"
												h="50px"
												backgroundColor="green.100"
												shadow="md"
											></Stack>
											<Stack
												position="absolute"
												justify="space-between"
												direction="row"
												top="30%"
												left={3}
												// transform="translate(-50%, -50%)"
											>
												<Heading fontSize="xs" color="gray.800" lineHeight="17px">
													Yes 0.1 USDT
												</Heading>
											</Stack>
										</Stack>
										<Stack width="90%">
											<Stack
												borderBottom="2px solid #FEB2B2;"
												h="50px"
												backgroundColor="red.100"
												shadow="md"
											></Stack>
											<Stack
												position="absolute"
												justify="space-between"
												direction="row"
												top="30%"
												right={3}
												// transform="translate(-50%, -50%)"
											>
												<Heading fontSize="xs" color="gray.800" lineHeight="17px">
													No 0.9 USDT
												</Heading>
											</Stack>
										</Stack>
									</Stack>
									<Heading
										mt={'29px'}
										mb={'29px'}
										fontSize={'sm'}
										color={'gray.800'}
										fontWeight={'700'}
										lineHeight={'19px'}
									>
										Amout
									</Heading>
									<Input
										placeholder="$0"
										size="lg"
										border="1px solid #E2E8F0;"
										_placeholder={{ opacity: 1, color: 'gray.400' }}
									/>
									<Button
										mt={'24px'}
										mb={'4px'}
										w={'100%'}
										size="lg"
										// colorScheme="teal"
										// variant="solid"
										bg="#D53F8C"
										borderColor="#D53F8C"
										color="#fff"
									>
										Login
									</Button>
								</TabPanel>
								<TabPanel>
									<p>two!</p>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Card>

					<Card shadow="lg" borderRadius="3xl">
						<CardBody>
							<Stack direction="row">
								<Image
									height="88px"
									width="88px"
									src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Stack pl={4} pt={4} pb={4} w={'100%'} justify="space-between">
									<Stack direction="row" justify="space-between">
										<Tag
											px={4}
											border="1px"
											bg="pink.500"
											borderColor="pink.500"
											size={'sm'}
											colorScheme="undefined"
											borderRadius={'base'}
										>
											<TagLabel color="#fff">Crypto</TagLabel>
										</Tag>
										<AttachmentIcon cursor="pointer" />
									</Stack>
									<Stack>
										<Heading size="md" color="gray.800">
											Bitcoin Forecase: How BTC Reacts to SEC
										</Heading>
									</Stack>
								</Stack>
							</Stack>
							<Stack alignItems="center" mt={'25px'} spacing={2} direction="row">
								<SettingsIcon color="gray.500" />
								<Text fontSize="xs" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
									$2,186,639 USDT
								</Text>
								<SettingsIcon ml={'16px'} color="gray.500" />
								<Text fontSize="xs" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
									Expires: Dec 28, 2023
								</Text>
							</Stack>
							<Tabs mt={'28px'} align="end" position="relative" variant="unstyled">
								<TabList>
									{isDesktop && (
										<Stack position={'absolute'} top={0} left={0} align="start">
											<Heading
												fontSize={'xs'}
												color={'gray.500'}
												fontWeight={'700'}
												lineHeight={'17px'}
											>
												Yes
											</Heading>
											<Heading fontSize={'lg'} color={'gray.800'} fontWeight={'700'}>
												0.6 USDT
											</Heading>
										</Stack>
									)}
									<Tab fontSize={'14px'} color={'blue.600'} fontWeight={'500'} lineHeight={'20px'}>
										6 Hour
									</Tab>
									<Tab fontSize={'14px'} color={'blue.600'} fontWeight={'500'} lineHeight={'20px'}>
										1 Day
									</Tab>
									<Tab fontSize={'14px'} color={'blue.600'} fontWeight={'500'} lineHeight={'20px'}>
										1 Week
									</Tab>
									<Tab fontSize={'14px'} color={'blue.600'} fontWeight={'500'} lineHeight={'20px'}>
										1 Month
									</Tab>
								</TabList>
								<TabIndicator mt="-1.5px" height="2px" bg="blue.600" borderRadius="1px" />
								<TabPanels>
									<TabPanel p={0}>
										<Stack w={'100%'} h={'100%'}>
											{!isDesktop && (
												<Stack mt={'24px'} direction={'row'} align="center">
													<Heading
														fontSize={'xs'}
														color={'gray.500'}
														fontWeight={'700'}
														lineHeight={'17px'}
													>
														Yes
													</Heading>
													<Heading fontSize={'lg'} color={'gray.800'} fontWeight={'700'}>
														0.6 USDT
													</Heading>
												</Stack>
											)}
											<Stack align="start" direction={'row'} mt={isDesktop ? '24px' : '2px'}>
												<Heading fontSize={'xs'} color={'green.600'} fontWeight={'700'}>
													(+73.87%)
												</Heading>
												<Heading fontSize={'xs'} color={'gray.500'} fontWeight={'700'}>
													Since Market Creation
												</Heading>
											</Stack>
											<Stack mt={'12px'} w={'100%'} height={'415px'}>
												<ResponsiveContainer width="100%" height="100%">
													<LineChart
														// width={750}
														// height={490}
														data={data}
														margin={{
															top: 0,
															right: 0,
															left: 0,
															bottom: 5,
														}}
													>
														<CartesianGrid strokeDasharray="3 3" />
														<XAxis tick={{ fontSize: 14 }} dataKey="name" />
														<YAxis tick={{ fontSize: 14 }} />
														<Tooltip />
														<Legend />
														<Line
															type="monotone"
															dataKey="pv"
															stroke="#8884d8"
															activeDot={{ r: 8 }}
														/>
														<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
													</LineChart>
												</ResponsiveContainer>
											</Stack>
										</Stack>
									</TabPanel>
									<TabPanel>
										<p>1 Day</p>
									</TabPanel>
									<TabPanel>
										<p>1 Week</p>
									</TabPanel>
									<TabPanel>
										<p>1 Month</p>
									</TabPanel>
								</TabPanels>
							</Tabs>
						</CardBody>
					</Card>
					<Card minH={'434px'} shadow="lg" borderRadius="3xl">
						<CardBody>
							<Heading size={'md'} color={'gray.800'}>
								Order Book
							</Heading>
							<Tabs mt={'28px'} position="relative" variant="unstyled">
								<TabList>
									<Tab color={'gray.700'} fontWeight={'700'}>
										Trade Yes
									</Tab>
									<Tab color={'gray.700'} fontWeight={'700'}>
										Trade No
									</Tab>
								</TabList>
								<TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" />
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
														<Th
															fontSize={'xs'}
															color={'gray.700'}
															fontWeight={'700'}
															lineHeight={'16px'}
														>
															Trade Type
														</Th>
														<Th
															fontSize={'xs'}
															color={'gray.700'}
															fontWeight={'700'}
															lineHeight={'16px'}
														>
															Price
														</Th>
														<Th
															fontSize={'xs'}
															color={'gray.700'}
															fontWeight={'700'}
															lineHeight={'16px'}
														>
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
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
															0.90 USDT
														</Td>
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
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
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
															0.90 USDT
														</Td>
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
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
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
															0.90 USDT
														</Td>
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
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
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
															0.90 USDT
														</Td>
														<Td
															fontSize={'md'}
															color={'gray.700'}
															fontWeight={'500'}
															lineHeight={'20px'}
														>
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
					<Card shadow="lg" borderRadius="3xl">
						<CardBody>
							<Heading size={'md'} color={'gray.800'}>
								About
							</Heading>
							<Text mt={'20px'} fontSize={'md'}>
								{`In this distant spot, the furthest from any solid ground on Earth, there is little
								chance of rescue if you get into trouble. The only signs of life are triangular
								shark fin-like sails just above the water line in the distance – if you happen to
								visit at the same time as The Ocean Race, an annual round-the-world yachting
								competition. If not, you're out of luck`}
							</Text>
							<Heading mt={'19px'} size={'sm'} color={'gray.600'}>
								Show
							</Heading>
						</CardBody>
					</Card>
				</Stack>
				<Stack display={{ lg: 'inline', md: 'none', sm: 'none' }} w={'452px'}>
					<Card w={'100%'} cursor="pointer" shadow="lg" borderRadius="3xl">
						<Tabs p={'16px'} position="relative" variant="unstyled">
							<TabList>
								<Tab color={'gray.700'} fontWeight={'700'}>
									Buy
								</Tab>
								<Tab color={'gray.700'} fontWeight={'700'}>
									Sell
								</Tab>
							</TabList>
							<TabIndicator mt="-1.5px" height="2px" bg="gray.700" borderRadius="1px" />
							<TabPanels>
								<TabPanel p={0}>
									<Stack mt={'20px'} position="relative" spacing={1.5} direction="row">
										<Stack width="10%">
											<Stack
												borderBottom="2px solid #68D391;"
												h="50px"
												backgroundColor="green.100"
												shadow="md"
											></Stack>
											<Stack
												position="absolute"
												justify="space-between"
												direction="row"
												top="30%"
												left={3}
												// transform="translate(-50%, -50%)"
											>
												<Heading fontSize="xs" color="gray.800" lineHeight="17px">
													Yes 0.1 USDT
												</Heading>
											</Stack>
										</Stack>
										<Stack width="90%">
											<Stack
												borderBottom="2px solid #FEB2B2;"
												h="50px"
												backgroundColor="red.100"
												shadow="md"
											></Stack>
											<Stack
												position="absolute"
												justify="space-between"
												direction="row"
												top="30%"
												right={3}
												// transform="translate(-50%, -50%)"
											>
												<Heading fontSize="xs" color="gray.800" lineHeight="17px">
													No 0.9 USDT
												</Heading>
											</Stack>
										</Stack>
									</Stack>
									<Heading
										mt={'29px'}
										mb={'29px'}
										fontSize={'sm'}
										color={'gray.800'}
										fontWeight={'700'}
										lineHeight={'19px'}
									>
										Amout
									</Heading>
									<Input
										placeholder="$0"
										size="lg"
										border="1px solid #E2E8F0;"
										_placeholder={{ opacity: 1, color: 'gray.400' }}
									/>
									<Button
										mt={'24px'}
										mb={'4px'}
										w={'100%'}
										size="lg"
										// colorScheme="teal"
										// variant="solid"
										bg="#D53F8C"
										borderColor="#D53F8C"
										color="#fff"
									>
										Login
									</Button>
								</TabPanel>
								<TabPanel>
									<p>two!</p>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Card>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default MarketsDetail;
