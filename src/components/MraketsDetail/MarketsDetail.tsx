import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { useTranslation } from 'react-i18next';
import {
	Stack,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Center,
	Text,
} from '@chakra-ui/react';
import { AtSignIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketDetail, AppDispatch, RootState } from '@/store';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import LineChartCard from './LineChartCard';
import OrderBookCard from './OrderBookCard';
import About from './About';
import BuyOrSellCard from './BuyOrSellCard';
import BuyOrSellButton from './Buttons/BuyOrSellButton';
import BuyOrSellModal from './BuyOrSellModal';
import { TransactionEnum } from './type';
import { zIndexMarket } from '@/utils/zIndex';

const empty_array = [...Array(13)];

// const paddingMainVertical = { lg: '120px', md: '48px', sm: '48px' };

function MarketsDetail() {
	const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
	const [transactionType, setTransactionType] = useState<TransactionEnum>(TransactionEnum.buy);

	const router = useRouter();

	// const { t } = useTranslation();

	const dispatch = useDispatch<AppDispatch>();
	const { isMarketDetailLoading } = useSelector((state: RootState) => state.homeReducer);

	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});

	useEffect(() => {
		if (router.isReady) {
			const { marketSlug } = router.query;
			if (marketSlug) {
				dispatch(getMarketDetail({ slug: marketSlug as string }));
			}
		}
	}, [router, dispatch]);

	return (
		<Stack mt={headerHeight}>
			<Stack
				// px={{ md: 116, sm: 8 }}
				px={paddingMainHorizontal}
				py={{ md: '60px', sm: '40px' }}
				gap={'28px'}
				direction="row"
			>
				<Stack spacing={'20px'} w={'100%'}>
					<LineChartCard />
					<OrderBookCard />
					<About />
				</Stack>
				<Stack display={{ lg: 'inline', md: 'none', sm: 'none' }} w={'558px'}>
					<BuyOrSellCard />
				</Stack>
			</Stack>
			<Stack
				display={{ lg: 'none', md: 'flex', sm: 'flex' }}
				w={'100%'}
				direction="row"
				position="fixed"
				bottom={0}
				zIndex={zIndexMarket}
				pl={6}
				pr={6}
				pt={4}
				pb={4}
				bg={'#FFFFFF'}
				borderColor={'black'}
				borderTop="1px solid #E2E8F0;"
			>
				<BuyOrSellButton
					onClick={() => {
						setTransactionType(TransactionEnum.buy);
						onOpen();
					}}
					text="Buy"
					selected={true}
				/>
				<BuyOrSellButton
					onClick={() => {
						setTransactionType(TransactionEnum.sell);
						onOpen();
					}}
					text="Sell"
					selected={false}
				/>
			</Stack>
			<Modal preserveScrollBarGap size={'4xl'} isOpen={isModalOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent marginBottom={0} alignSelf={'flex-end'} borderRadius={'20px 20px 0px 0px'}>
					<ModalHeader fontWeight="700" color="gray.800"></ModalHeader>
					<ModalCloseButton size="lg" mt={1} mr={2} />
					<ModalBody overflowY={'scroll'}>
						<Stack alignItems={'center'} position={'relative'}>
							<BuyOrSellModal transactionType={transactionType} />
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Stack>
	);
}

export default MarketsDetail;
