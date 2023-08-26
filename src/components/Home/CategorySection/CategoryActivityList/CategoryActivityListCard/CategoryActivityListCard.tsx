import React from 'react';
import { Card, CardBody, Stack, Image, Text, Heading, Code } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

function CategoryActivityListCard() {
	return (
		<Stack>
			<Card cursor="pointer" shadow="md" borderRadius="3xl">
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
								Crypto
							</Heading>
							<Heading size="md" color="gray.800">
								Bitcoin Forecase: How BTC Reacts to SEC
							</Heading>
						</Stack>
					</Stack>
					<Stack mt={5}>
						<Stack spacing={1.5} direction="row">
							<Stack
								px={3}
								py={1}
								backgroundColor="green.100"
								justifyContent="center"
								width="60%"
								shadow="md"
								borderWidth="1px"
							>
								<Text fontSize="xs" color="gray.800">
									Yes 0.6 USDT
								</Text>
							</Stack>
							<Stack
								px={3}
								py={1}
								backgroundColor="red.100"
								justifyContent="center"
								width="40%"
								shadow="md"
								borderWidth="1px"
							>
								<Text fontSize="xs" color="gray.800">
									No 0.4 USDT
								</Text>
							</Stack>
						</Stack>
					</Stack>
					<Stack alignItems="center" mt={3} spacing={2} direction="row">
						<SettingsIcon color="gray.500" />
						<Text fontSize="xs" color="gray.800">
							$2,186,639 USDT
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</Stack>
	);
}

export default CategoryActivityListCard;
