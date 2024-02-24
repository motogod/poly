import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Stack, Heading, Text, Image, Tag, TagLabel } from '@chakra-ui/react';
import { MarketsItemType } from '@/api';
import styles from './topicCard.module.scss';

function TopicCard({ data, index }: { data: MarketsItemType; index: number }) {
	const { slug, category, image, title, outcome } = data;

	const router = useRouter();

	return (
		<Card
			minH={'396px'}
			onClick={() => router.push(`/marketsDetail?marketSlug=${slug}`)}
			cursor="pointer"
			width="xs"
			ml={{ md: index === 0 ? '54px' : '0px', sm: index === 0 ? '16px' : '0px' }}
			shadow="md"
			borderRadius="3xl"
			_hover={{ shadow: 'xl' }}
		>
			<CardBody p={0}>
				<Tag
					px={4}
					border="1px"
					borderColor="white"
					size="md"
					colorScheme="undefined"
					borderRadius="full"
					position="absolute"
					top="5"
					left="5"
					bg={'gray.900'}
					opacity={0.3}
					_hover={{ opacity: 0.6 }}
				>
					<TagLabel
						onClick={e => {
							e.stopPropagation();
							router.push(`/markets?categories=${category.slug},`);
						}}
						color="white"
					>
						{category.name}
					</TagLabel>
				</Tag>
				<Image
					height="240px"
					w={'100%'}
					src={image}
					alt="Green double couch with wooden legs"
					borderRadius="3xl"
					objectFit={'cover'}
				/>
				<Stack p="5" mt="0" spacing="0">
					<Heading minH={'48px'} noOfLines={2} size="md" color="gray.800">
						{title}
					</Heading>
				</Stack>
				<Stack pl="5" pb="5" spacing={10} direction="row">
					<Stack>
						<Heading size="sm" color="green.400" fontWeight="bold">
							Yes
						</Heading>
						<Text color="gray.800" fontSize="sm">
							{`${outcome.yes} USDT`}
						</Text>
					</Stack>
					<Stack>
						<Heading size="sm" color="red.400" fontWeight="bold">
							No
						</Heading>
						<Text color="gray.800" fontSize="sm">
							{`${outcome.no} USDT`}
						</Text>
					</Stack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default TopicCard;
