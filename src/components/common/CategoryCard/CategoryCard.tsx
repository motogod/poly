import React from 'react';
import { useRouter } from 'next/router';
import {
	Card,
	CardBody,
	Stack,
	Image,
	Text,
	Heading,
	GridItem,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useDisclosure,
	Button,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	TagLabel,
	Tag,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HiChartBar } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { clickCategoryEvent, AppDispatch, queryUrlToChangeMenuStatus } from '@/store';
import { MarketsItemType } from '@/api/type';
import { zIndexMinimum } from '@/utils/zIndex';

function CategoryCard({ data, isLoading }: { data: MarketsItemType; isLoading?: boolean }) {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const { isOpen: isPopOpen, onToggle, onClose: onPopClose, onOpen: onPopOpen } = useDisclosure();

	const { title, volume, category, image, outcome, slug, categories } = data;
	console.log('data =>', data);
	return (
		<GridItem>
			<Card
				onClick={() => {
					dispatch(clickCategoryEvent({ slug }));
					// router.push(`/marketsDetail/${slug}`, undefined, { shallow: true });
					slug ? router.push(`/marketsDetail?marketSlug=${slug}`) : null;
				}}
				opacity={isLoading ? 0.5 : 1}
				cursor="pointer"
				shadow="md"
				_hover={{ shadow: 'xl' }}
				border="1px solid #EDF2F7;"
				borderRadius="3xl"
			>
				<CardBody>
					<Stack direction="row">
						<Image
							height="88px"
							width="88px"
							src={image ? image : ''}
							alt={title}
							borderRadius="lg"
							objectFit={'cover'}
						/>
						<Stack pl={1}>
							<Stack direction="row" wrap={'wrap'}>
								{categories.map(value => {
									return (
										<>
											<Tag
												px={4}
												py={1}
												border="1px"
												bg="pink.500"
												borderColor="pink.500"
												size={'sm'}
												colorScheme="undefined"
												borderRadius={'md'}
											>
												<TagLabel
													cursor={'pointer'}
													onClick={e => {
														// 接著將頁面導回 markets 並附上 qeury 參數 讓 Markets 底下的 useEffect 去 call API
														e.stopPropagation();
														router.push(`/markets?categories=${value.slug},`);
														dispatch(queryUrlToChangeMenuStatus({ queryString: `${value.slug},` }));
													}}
													color="#fff"
												>
													{value.name}
												</TagLabel>
											</Tag>
										</>
									);
								})}
							</Stack>
							<Stack mt={'2px'}>
								<Heading noOfLines={3} size="sm" color="gray.800" lineHeight={'5'}>
									{title}
								</Heading>
							</Stack>
						</Stack>
					</Stack>
					<Stack mt={5}>
						<Stack position="relative" spacing={1.5} direction="row">
							<Stack width={`${outcome.yes * 100}%`}>
								<Stack
									borderBottom="2px solid #48BB78;"
									h="30px"
									backgroundColor="green.100"
									opacity={0.4}
									shadow="md"
								></Stack>
								<Stack
									position="absolute"
									justify="space-between"
									direction="row"
									top="20%"
									left={3}
									// transform="translate(-50%, -50%)"
								>
									<Text fontSize="xs" color="gray.800" lineHeight="18px">
										{`Yes ${outcome.yes} USDT`}
									</Text>
								</Stack>
							</Stack>
							<Stack width={`${outcome.no * 100}%`}>
								<Stack
									borderBottom="2px solid #FC8181;"
									h="30px"
									backgroundColor="red.100"
									opacity={0.4}
									shadow="md"
								></Stack>
								<Stack
									position="absolute"
									justify="space-between"
									direction="row"
									top="20%"
									right={3}
									// transform="translate(-50%, -50%)"
								>
									<Text fontSize="xs" color="gray.800">
										{`No ${outcome.no} USDT`}
									</Text>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Stack align="center" mt={3} spacing={2} direction="row">
						<Icon as={HiChartBar} w={'16px'} h={'14px'} />
						<Text fontSize="xs" color="gray.800">
							{`$${Number(volume).toLocaleString()} USDT`}
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</GridItem>
	);
}

export default CategoryCard;
