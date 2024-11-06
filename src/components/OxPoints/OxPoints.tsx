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
	Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useLink } from '@/hooks';
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

	const { link } = useLink();

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
						h={{ lg: '400px', md: '352px', sm: '352px' }}
						direction="row"
						borderRadius="2xl"
					>
						<Stack alignItems={isDesktop ? '' : 'center'} flex={2} minWidth="0">
							<FormLabel
								color={'white'}
								fontSize={{ lg: '36', md: '30', sm: '30' }}
								fontWeight={900}
								whiteSpace="normal" // 允許換行
							>
								{t('ox_points')}
							</FormLabel>
						</Stack>
					</Stack>
					<Image
						width={0}
						height={0}
						style={{ width: '100%', height: '352px', borderRadius: 10, objectFit: 'cover' }}
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
												{t('ox_points')}
											</Heading>
										</Stack>
									</Stack>

									<Stack mt={'36px'}>
										<Text color={'#1A202C'} fontSize={'md'}>
											{t('available_balance')}
										</Text>
									</Stack>
									<Stack mt={'16px'} align={'end'} direction={'row'}>
										<Text color={'#1A202C'} fontSize={'4xl'}>
											{userPointData?.balance}
										</Text>
										<Text ml={'12px'} mb={'8px'} color={'#1A202C'} fontSize={'md'}>
											{t('ox_points')}
										</Text>
									</Stack>
									<Stack>
										<Text color={'pink.500'} fontSize={'sm'}>
											{t('updated_at_gmt')}
										</Text>
									</Stack>
								</Stack>
								<Stack>
									<Stack mt={'50px'}>
										<Stack direction={'row'}>
											<Text color={'gray.500'} fontSize={'md'}>
												{t('how_to_earn_ox_points')}
												<Link
													ml={2}
													color={'#3182ce'}
													textDecoration={'none'}
													href={link().oxPointsLearnMoreLine}
													isExternal
												>
													{t('learn_more')}
												</Link>
											</Text>
										</Stack>
										<Stack direction={'row'}>
											<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#1A202C'} />
											<Text color={'gray.500'} fontSize={'md'}>
												{t('trade_markets_to_earn_daily_points')}
											</Text>
										</Stack>
										<Stack direction={'row'}>
											<Stack w={'6px'} h={'6px'} mt={2} borderRadius={'3px'} bg={'#1A202C'} />
											<Text color={'gray.500'} fontSize={'md'}>
												{t('successfully_refer_friends_and_earn')}
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
													{t('redemption_events')}
												</Heading>
											</Stack>
										</Stack>
									</Stack>
									<Stack h="112px" mt={'40px'} mb={'40px'} align={'center'}>
										<Image src={ExchangeImg} width={155} alt="socialPng" />
									</Stack>
									<Stack>
										<Text textAlign={'center'} color={'gray.500'} fontSize={'md'}>
											{t('use_ox_points_to_redeem')}
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
										{t('view_events')}
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
									{t('points_history')}
								</Heading>
							</Stack>
						</Stack>
					</Stack>
					{meta?.page === 1 && userPointData?.points.length === 0 ? (
						<Stack h={'100%'} justifyContent={'center'} align={'center'}>
							<Text color={'#1A202C'} fontSize={'md'}>
								{t('there_is_no_data_available')}
							</Text>
						</Stack>
					) : (
						<>
							<Stack mt={'24px'} mb={'24px'}>
								<Text textAlign={'end'} color="#1A202C" fontSize="16px">
									{t('lifetime_earned')}{' '}
									<Text as="span" color="#1A202C" fontSize="16px">
										{`${userPointData?.earned?.toLocaleString()} `}
									</Text>
									<Text as="span" color="#1A202C" fontSize="16px">
										{t('ox_points')}
									</Text>
								</Text>
								<Text textAlign={'end'} color="#1A202C" fontSize="16px">
									{t('total_redeemed')}{' '}
									<Text as="span" color="#1A202C" fontSize="16px">
										{`${userPointData?.claimed?.toLocaleString()} `}
									</Text>
									<Text as="span" color="#1A202C" fontSize="16px">
										{t('ox_points')}
									</Text>
								</Text>
							</Stack>
							<Stack>
								<Tabs mt={'0px'} index={0} onChange={handleTabsChange}>
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
			<Stack mt={'120px'} />
			<Footer />
		</Stack>
	);
}

export default OxPoints;
