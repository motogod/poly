import React, { useEffect } from 'react';
import {
	Stack,
	Button,
	Card,
	CardBody,
	Grid,
	Text,
	FormLabel,
	useToast,
	Heading,
	GridItem,
	Tabs,
	TabPanels,
	TabPanel,
	Box,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import OxImg from '@/../public/assets/svg/icon-ox-points-01.png';
import RedeemImg from '@/../public/assets/svg/icon-points-redeem-01.png';
import ExchangeImg from '@/../public/assets/svg/image-exchange-01.png';
import PointsHistoryImg from '@/../public/assets/svg/icon-points-history-01.png';
import OxPointsBannerImg from '@/../public/ox-points-banner-bg.png';
import PointsHistoryTable from './PointsHistoryTable';
import { getPoints } from '@/store/thunks/fetchPoint';
import Footer from '@/layouts/components/common/Footer';

// background: linear-gradient(90deg, #edf2f7 44%, #d53f8c 30%);
function OxPoints() {
	const router = useRouter();

	const { t } = useTranslation();

	const toast = useToast();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { userPointData, meta } = useSelector((state: RootState) => state.pointReducer);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated && isAuthenticated !== null) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

	useEffect(() => {
		dispatch(getPoints({ page: 1, take: 20 }));
	}, [dispatch]);

	const handleTabsChange = (index: number) => {
		if (index === 0) {
		}

		if (index === 1) {
		}

		if (index === 2) {
		}
	};

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
				<Card position={'relative'} borderRadius="2xl">
					<Stack
						flex={1}
						position="absolute"
						align={'center'}
						w={'100%'}
						padding={'72px'}
						h={{ lg: '400px', md: '400px', sm: '400px' }}
						direction="row"
						borderRadius="2xl"
					>
						<Stack flex={2} minWidth="0">
							<FormLabel
								color={'white'}
								fontSize={{ lg: '36', md: '36', sm: '36' }}
								fontWeight={900}
								whiteSpace="normal" // 允許換行
							>
								OX Points
							</FormLabel>
						</Stack>
					</Stack>
					<Image
						width={0}
						height={0}
						style={{ width: '100%', height: '400px', borderRadius: 10, objectFit: 'cover' }}
						src={OxPointsBannerImg}
						alt="funds_background"
					/>
				</Card>
			</Stack>
			<Grid
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				templateColumns={{
					lg: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={6}
				mt={'22px'}
			>
				<GridItem>
					<Card
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
					>
						<CardBody minH={'412px'} display="flex" flexDirection="column">
							<Stack justifyContent={'space-between'} flex={1}>
								<Stack>
									<Stack direction="row" align={'center'} justify={'space-between'}>
										<Stack direction="row" align={'center'}>
											<Image src={OxImg} width={24} height={24} alt="socialPng" />
											<Heading onClick={e => null} size="md" color="gray.800">
												OX Points
											</Heading>
										</Stack>
									</Stack>

									<Stack mt={'36px'}>
										<Text color={'#1A202C'} fontSize={'md'}>
											Available Balance
										</Text>
									</Stack>
									<Stack mt={'16px'} align={'end'} direction={'row'}>
										<Text color={'#1A202C'} fontSize={'4xl'}>
											{userPointData?.balance}
										</Text>
										<Text ml={'12px'} mb={'8px'} color={'#1A202C'} fontSize={'md'}>
											OX Points
										</Text>
									</Stack>
									<Stack>
										<Text color={'pink.500'} fontSize={'sm'}>
											Updated at 8:00 AM daily (GMT+8)
										</Text>
									</Stack>
								</Stack>
								<Stack>
									<Stack mt={'50px'}>
										<Stack>
											<Text color={'gray.500'} fontSize={'md'}>
												How to Earn OX Points?
											</Text>
										</Stack>
										<Stack direction={'row'}>
											<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#1A202C'} />
											<Text color={'gray.500'} fontSize={'md'}>
												The platform will send OX Points to you based on the proportion of daily
												transactions.
											</Text>
										</Stack>
										<Stack direction={'row'}>
											<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#1A202C'} />
											<Text color={'gray.500'} fontSize={'md'}>
												By referring friends, you can earn OX points. Learn more about the{' '}
												<Text
													as="span"
													onClick={() => router.push('./referral')}
													cursor="pointer"
													color="#4299E1"
													size="sm"
												>
													referral programs.
												</Text>
											</Text>
										</Stack>
									</Stack>
								</Stack>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
				<GridItem>
					<Card
						flex={1}
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
					>
						<CardBody minH={'412px'} display="flex" flexDirection="column">
							<Stack justifyContent={'space-between'} flex="1">
								<Stack>
									<Stack direction="row">
										<Stack>
											<Stack direction={'row'}>
												<Image src={RedeemImg} width={24} height={24} alt="socialPng" />
												<Heading onClick={e => null} size="md" color="gray.800">
													Redemption Events
												</Heading>
											</Stack>
										</Stack>
									</Stack>
									<Stack h="112px" mt={'40px'} mb={'40px'} align={'center'}>
										<Image src={ExchangeImg} width={155} alt="socialPng" />
									</Stack>
									<Stack>
										<Text textAlign={'center'} color={'gray.500'} fontSize={'md'}>
											Use OX Points to redeem rewards such as USDT, airdrops, and popular products.
										</Text>
									</Stack>
								</Stack>
								<Stack mt={'36px'}>
									<Button
										onClick={() => router.push('./events')}
										// w={{ lg: '172px', md: '100px', sm: '100px' }}
										h={{ lg: '48px', md: '40px', sm: '40px' }}
										colorScheme="teal"
									>
										View Events
									</Button>
								</Stack>
							</Stack>
						</CardBody>
					</Card>
				</GridItem>
			</Grid>
			<Card
				flex={1}
				mt={8}
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				onClick={() => null}
				opacity={1}
				shadow="md"
				_hover={{ shadow: 'xl' }}
				border="1px solid #EDF2F7;"
				borderRadius="lg"
			>
				<CardBody minH={'312px'}>
					<Stack direction="row">
						<Stack>
							<Stack direction={'row'}>
								<Image src={PointsHistoryImg} width={24} height={24} alt="socialPng" />
								<Heading onClick={e => null} size="md" color="gray.800">
									Points History
								</Heading>
							</Stack>
						</Stack>
					</Stack>
					{meta?.page === 1 && userPointData?.points.length === 0 ? (
						<Stack h={'100%'} justifyContent={'center'} align={'center'}>
							<Text color={'#1A202C'} fontSize={'md'}>
								There is no data availavle
							</Text>
						</Stack>
					) : (
						<>
							<Stack>
								<Text textAlign={'end'}>
									Lifetime Earned:{' '}
									<Text as="span" color="#1A202C" fontSize="sm">
										{`${userPointData?.earned?.toLocaleString()} OX Points`}
									</Text>
								</Text>
								<Text textAlign={'end'}>
									Total Redeemed:{' '}
									<Text as="span" color="#1A202C" fontSize="sm">
										{`${userPointData?.claimed?.toLocaleString()} OX Points`}
									</Text>
								</Text>
							</Stack>
							<Stack>
								<Tabs mt={'28px'} index={0} onChange={handleTabsChange}>
									<TabPanels>
										<TabPanel p={0}>
											<PointsHistoryTable pageCount={meta.pageCount} />
										</TabPanel>
									</TabPanels>
								</Tabs>
							</Stack>
						</>
					)}
				</CardBody>
			</Card>
			<Card />
			<Footer />
		</Stack>
	);
}

export default OxPoints;
