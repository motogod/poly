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
	Tag,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, putUserEmail } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import { useEventsModal, useUtility } from '@/hooks';
import RedemptionImg from '@/../public/assets/svg/image-0.png';
import TradingImg from '@/../public//assets/svg/image-1.png';
import RewardsImg from '@/../public//assets/svg/image-2.png';
import RedemptionBannerImg from '@/../public/redemption-banner-bg-01.png';
import { getPoints, getPromotions } from '@/store/thunks/fetchPoint';
import { Promotions } from '@/api';

const dummyData = [
	{ type: 'redemption', title: '50 USDT Redemption Event' },
	{ type: 'trading', title: '30 USDT Trading Fee Rebate' },
	{ type: 'rewards', title: 'Double OX Points Rewards' },
];

function Events() {
	const router = useRouter();

	const { t } = useTranslation();

	const { formatAllDate } = useUtility();

	const {
		ModalDom: msgModalDom,
		isOpen: msgModalIsOpen,
		onOpen: msgModalOnOpen,
		onClose: msgModalOnClose,
		setModalData,
	} = useEventsModal();

	const isDesktop = useMediaQuery({
		query: '(min-width: 960px)',
	});

	const { isAuthenticated } = useSelector((state: RootState) => state.authReducer);
	const { userPointData, userPromotionsData } = useSelector(
		(state: RootState) => state.pointReducer
	);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!isAuthenticated && isAuthenticated !== null) {
			router.replace('./');
		}
	}, [router, isAuthenticated]);

	useEffect(() => {
		dispatch(getPoints({ page: 1, take: 20 }));

		dispatch(getPromotions());
	}, [dispatch]);

	const renderEventButton = (value: Promotions) => {
		const { status } = value;

		if (status === 'OPEN') {
			return (
				<Button
					onClick={() => {
						setModalData(value);
						msgModalOnOpen();
					}}
					size="lg"
					bg="#fff"
					border={'1px'}
					borderColor={'#319795'}
					color={'#319795'}
					minW={'200px'}
				>
					View Redemption
				</Button>
			);
		} else {
			return (
				<Button
					size="lg"
					bg="#D53F8C"
					border={'1px'}
					borderColor={'#D53F8C'}
					color={'#fff'}
					minW={'200px'}
					sx={{
						_hover: {
							bg: '#D53F8C', // 設置 hover 狀態的背景顏色與默認狀態相同
							borderColor: '#D53F8C', // 設置 hover 狀態的邊框顏色與默認狀態相同
							cursor: 'default', // 將游標設置為默認（非手勢指標）
						},
					}}
				>
					Ended
				</Button>
			);
		}
	};

	const renderCardList = (value: Promotions) => {
		const { title, startAt, endAt, description, image, status } = value;

		return (
			<>
				<GridItem>
					<Card
						onClick={() => null}
						opacity={1}
						shadow="md"
						_hover={{ shadow: 'xl' }}
						border="1px solid #EDF2F7;"
						borderRadius="lg"
					>
						{isDesktop ? (
							<>
								<CardBody>
									<Stack direction={'row'}>
										<Stack
											rounded={'xl'}
											w={'320px'}
											alignItems={'center'}
											justify={'center'}
											bg={'gray.50'}
										>
											<Image
												width={80}
												height={80}
												style={{ borderRadius: 10, objectFit: 'cover' }}
												src={image}
												alt="funds_background"
											/>
										</Stack>
										<Stack justify={'space-between'} ml={'16px'}>
											<Stack>
												<Heading onClick={e => null} size="md" color="gray.800">
													{title}
												</Heading>
												<Text color={'#1A202C'} fontSize={'md'}>
													{`${formatAllDate(startAt)} - ${formatAllDate(endAt)} (GMT+8)`}
												</Text>
											</Stack>
											<Stack mt={4}>
												<Stack>
													<Heading onClick={e => null} size="sm" color="gray.800">
														Instructions
													</Heading>
												</Stack>
												<Stack ml={4}>
													<div dangerouslySetInnerHTML={{ __html: `${description}` }} />
												</Stack>
											</Stack>
										</Stack>
										<Stack flex={1} justify={'center'} alignItems={'end'}>
											<Stack>{renderEventButton(value)}</Stack>
										</Stack>
									</Stack>
								</CardBody>
							</>
						) : (
							<>
								<CardBody>
									<Stack>
										<Stack
											alignItems={'center'}
											h={{ lg: '320px', md: '280px', sm: '180px' }}
											mt={2}
											mb={2}
											rounded={'xl'}
											justify={'center'}
											bg={'gray.50'}
										>
											<Image
												width={80}
												height={80}
												style={{
													width: 120,
													borderRadius: 10,
													objectFit: 'cover',
												}}
												src={image}
												alt="funds_background"
											/>
										</Stack>
										<Stack justify={'space-between'} mt={'6px'}>
											<Stack>
												<Heading onClick={e => null} size="md" color="gray.800">
													{title}
												</Heading>
												<Text color={'#1A202C'} fontSize={'md'}>
													{`${formatAllDate(startAt)} - ${formatAllDate(endAt)} (GMT+8)`}
												</Text>
											</Stack>
											<Stack mt={'6px'}>
												<Stack>
													<Heading onClick={e => null} size="sm" color="gray.800">
														Instructions
													</Heading>
												</Stack>
												<Stack ml={4}>
													<div dangerouslySetInnerHTML={{ __html: `${description}` }} />
												</Stack>
											</Stack>
										</Stack>
										<Stack mt={6} justify={'center'}>
											{renderEventButton(value)}
										</Stack>
									</Stack>
								</CardBody>
							</>
						)}
					</Card>
				</GridItem>
			</>
		);
	};

	return (
		<Stack mt={headerHeight} h={'100vh'}>
			<Stack ml={paddingMainHorizontal} mr={paddingMainHorizontal} mt={paddingMainVertical}>
				<Card position={'relative'} borderRadius="2xl">
					{isDesktop ? (
						<Stack
							flex={1}
							position="absolute"
							align={'center'}
							w={'100%'}
							padding={34}
							h={{ lg: '400px', md: '400px', sm: '400px' }}
							direction="row"
							borderRadius="2xl"
						>
							<Stack flex={1} minWidth="0">
								<FormLabel
									color={'white'}
									fontSize={{ lg: '36', md: '36', sm: '36' }}
									fontWeight={900}
									whiteSpace="normal" // 允許換行
								>
									OX Points
								</FormLabel>
							</Stack>
							<Stack rounded={'lg'} flex={1} bg={'#fff'} p={'24px'} minWidth="0">
								<Stack mt={'4px'}>
									<Stack>
										<Text color="gray.800" size="md">
											Your Balance
										</Text>
									</Stack>
									<Stack direction={'row'} align={'end'}>
										<Text color={'#1A202C'} fontSize={'4xl'}>
											{userPointData?.balance}
										</Text>
										<Text
											textAlign={'end'}
											ml={'12px'}
											mb={'8px'}
											color={'#1A202C'}
											fontSize={'md'}
										>
											OX Points
										</Text>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					) : (
						<Stack
							flex={1}
							position="absolute"
							align={'center'}
							w={'100%'}
							padding={34}
							h={{ lg: '400px', md: '400px', sm: '400px' }}
							direction="row"
							borderRadius="2xl"
						>
							<Stack flex={1} minWidth="0">
								<FormLabel
									color={'white'}
									fontSize={{ lg: '36', md: '36', sm: '36' }}
									fontWeight={900}
									whiteSpace="normal" // 允許換行
								>
									OX Points
								</FormLabel>
								<Stack rounded={'lg'} flex={1} bg={'#fff'} p={'24px'} minWidth="0">
									<Stack mt={'4px'}>
										<Stack>
											<Text color="gray.800" size="md">
												Your Balance
											</Text>
										</Stack>
										<Stack direction={'row'} align={'end'}>
											<Text color={'#1A202C'} fontSize={'4xl'}>
												{userPointData?.balance}
											</Text>
											<Text
												textAlign={'end'}
												ml={'12px'}
												mb={'8px'}
												color={'#1A202C'}
												fontSize={'md'}
											>
												OX Points
											</Text>
										</Stack>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					)}
					<Image
						width={0}
						height={0}
						style={{ width: '100%', height: '400px', borderRadius: 10, objectFit: 'cover' }}
						src={RedemptionBannerImg}
						alt="funds_background"
					/>
				</Card>
			</Stack>
			<Stack
				mt={{ lg: '40px', md: '10px', sm: '10px' }}
				mb={{ lg: '40px', md: '10px', sm: '10px' }}
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
			>
				<Tag
					alignItems={'center'}
					justifyContent={'center'}
					w={'100%'}
					h={'56px'}
					flexWrap={'nowrap'}
					border="1px"
					backgroundColor="gray.50"
					borderColor="gray.50"
					size="lg"
					colorScheme="undefined"
					borderRadius={'md'}
				>
					<Text fontWeight={'400'} color={'gray.800'}>
						Use your OX Points to redeem rewards.
					</Text>
				</Tag>
			</Stack>
			<Grid
				ml={paddingMainHorizontal}
				mr={paddingMainHorizontal}
				templateColumns={{
					lg: 'repeat(1, 1fr)',
					md: 'repeat(1, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={6}
			>
				{userPromotionsData.map(value => renderCardList(value))}
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
			></Card>
			{msgModalIsOpen && msgModalDom}
		</Stack>
	);
}

export default Events;
