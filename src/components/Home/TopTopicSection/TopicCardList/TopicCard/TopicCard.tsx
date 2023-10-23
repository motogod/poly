import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardBody, Stack, Heading, Text, Image, Tag, TagLabel } from '@chakra-ui/react';
import styles from './topicCard.module.scss';

function TopicCard({ data, index }: any) {
	const { title } = data;

	const router = useRouter();

	return (
		<Card
			onClick={() => router.push('./marketsDetail')}
			cursor="pointer"
			width="xs"
			ml={{ md: index === 0 ? '116px' : '0px', sm: index === 0 ? '16px' : '0px' }}
			shadow="md"
			borderRadius="3xl"
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
				>
					<TagLabel color="white">Crypto</TagLabel>
				</Tag>
				<Image
					height="240px"
					src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
					alt="Green double couch with wooden legs"
					borderRadius="3xl"
				/>
				<Stack p="5" mt="0" spacing="0">
					<Heading size="md" color="gray.800">
						{'Green double couch with wooden legs'}
					</Heading>
				</Stack>
				<Stack pl="5" pb="5" spacing={10} direction="row">
					<Stack>
						<Heading size="sm" color="green.400" fontWeight="bold">
							Yes
						</Heading>
						<Text color="gray.800" fontSize="sm">
							0.6 USDT
						</Text>
					</Stack>
					<Stack>
						<Heading size="sm" color="red.400" fontWeight="bold">
							No
						</Heading>
						<Text color="gray.800" fontSize="sm">
							0.6 USDT
						</Text>
					</Stack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default TopicCard;
