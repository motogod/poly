import React from 'react';
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
	TabPanels,
	TabPanel,
	Icon,
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
import { SettingsIcon } from '@chakra-ui/icons';
import { HiChartBar, HiClock } from 'react-icons/hi';

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

function LineChartCard() {
	return (
		<Card shadow="lg" border="1px solid #E2E8F0;" borderRadius="3xl">
			<CardBody>
				<Stack direction="row">
					<Image
						height="120px"
						width="120px"
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Green double couch with wooden legs"
						borderRadius="lg"
					/>
					<Stack pl={4} pt={{ base: '0px', sm: '0px', md: '0px', lg: '26px' }} pb={4} w={'100%'}>
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
						<Stack mt={'12px'}>
							<Heading size="md" color="gray.800">
								Bitcoin Forecase: How BTC Reacts to SEC
							</Heading>
						</Stack>
					</Stack>
				</Stack>
				<Stack
					// alignItems="center"
					mt={'25px'}
					spacing={2}
					direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
				>
					<Stack align={'center'} direction={'row'}>
						<Icon as={HiChartBar} w={'16px'} h={'14px'} />
						<Text fontSize="sm" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
							Volume: $2,186,639 USDT
						</Text>
					</Stack>
					<Stack align={'center'} direction={'row'}>
						<Icon as={HiClock} w={'16px'} h={'16px'} />
						<Text fontSize="sm" color="gray.800" fontWeight={'400'} lineHeight={'18px'}>
							Expires: Dec 28, 2023
						</Text>
					</Stack>
				</Stack>
				<Stack mt={'32px'} align={'start'}>
					<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'} lineHeight={'17px'}>
						Yes
					</Heading>
					<Heading fontSize={'24px'} color={'gray.800'} fontWeight={'700'} lineHeight={'14px'}>
						0.6 USDT
					</Heading>
				</Stack>
				<Stack align="start" direction={'row'} mt={'32px'}>
					<Heading fontSize={'14px'} color={'green.600'} fontWeight={'700'}>
						(+73.87%)
					</Heading>
					<Heading fontSize={'14px'} color={'gray.500'} fontWeight={'700'}>
						Since Market Creation
					</Heading>
				</Stack>
				<Tabs mt={'28px'}>
					<TabList borderBottomColor={'gray.200'} borderBottomWidth={'2px'}>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							6H
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1D
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1W
						</Tab>
						<Tab fontSize={'16px'} color={'blue.400'} fontWeight={'500'} lineHeight={'20px'}>
							1M
						</Tab>
					</TabList>
					{/* <TabIndicator mt="-1.5px" height="0px" bg="pink" borderRadius="1px" /> */}
					<TabPanels>
						<TabPanel p={0}>
							<Stack w={'100%'} h={'100%'}>
								<Stack mt={'8px'} w={'100%'} height={'415px'}>
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
											<Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
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
	);
}

export default LineChartCard;