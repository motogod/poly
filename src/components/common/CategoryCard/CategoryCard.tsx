import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Stack, Image, Text, Heading, GridItem, Icon } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { HiChartBar } from 'react-icons/hi';
import { MarketsItemType } from '@/api/type';

function CategoryCard({ data }: { data: MarketsItemType }) {
	const router = useRouter();

	const { title, volume, category, image, outcome } = data;

	return (
		<GridItem w="100%">
			<Card
				onClick={() => router.push('./marketsDetail')}
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
							src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
							alt="Green double couch with wooden legs"
							borderRadius="lg"
						/>
						<Stack p={1} justifyContent="space-between">
							<Heading size="xs" color="gray.500">
								{category.name}
							</Heading>
							<Heading size="md" color="gray.800">
								{title}
							</Heading>
						</Stack>
					</Stack>
					<Stack mt={5}>
						<Stack position="relative" spacing={1.5} direction="row">
							<Stack width={`${outcome.yes * 100}%`}>
								<Stack
									borderBottom="2px solid #68D391;"
									h="30px"
									backgroundColor="green.100"
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
									borderBottom="2px solid #FEB2B2;"
									h="30px"
									backgroundColor="red.100"
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
