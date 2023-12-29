import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Stack, Image, Text, Heading, GridItem, Icon } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HiChartBar } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { clickCategoryEvent, AppDispatch } from '@/store';
import { MarketsItemType } from '@/api/type';

function CategoryCard({ data, isLoading }: { data: MarketsItemType; isLoading?: boolean }) {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const { title, volume, category, image, outcome, slug } = data;

	return (
		<GridItem>
			<Card
				onClick={() => {
					dispatch(clickCategoryEvent({ slug }));
					router.push(`./marketsDetail/${slug}`);
				}}
				opacity={isLoading ? 0.5 : 1}
				cursor="pointer"
				shadow="md"
				border="1px solid #EDF2F7;"
				borderRadius="3xl"
			>
				<CardBody>
					<Stack direction="row">
						<Image
							height="88px"
							width="88px"
							// src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
							src={image ? image : ''}
							alt="Green double couch with wooden legs"
							borderRadius="lg"
						/>
						<Stack pl={1}>
							<Heading size="xs" color="gray.500">
								{category.name}
							</Heading>
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
					<Stack alignItems="center" mt={3} spacing={2} direction="row">
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
