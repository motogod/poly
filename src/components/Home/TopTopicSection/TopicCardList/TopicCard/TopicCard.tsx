import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Stack,
	Heading,
	Text,
	Image,
} from '@chakra-ui/react';
import styles from './topicCard.module.scss';
function TopicCard({ data }: any) {
	const { title } = data;

	return (
		<div className={styles.cardContainer}>
			<Card>
				<CardBody>
					<Image
						src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
						alt="Green double couch with wooden legs"
						borderRadius="lg"
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">{title}</Heading>
						<Text>
							This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
							spaces and for people who love a chic design with a sprinkle of vintage design.
						</Text>
						<Text color="blue.600" fontSize="2xl">
							$450
						</Text>
					</Stack>
				</CardBody>
			</Card>
		</div>

		// <Card maxW="sm">
		// </Card>
	);
}

export default TopicCard;
