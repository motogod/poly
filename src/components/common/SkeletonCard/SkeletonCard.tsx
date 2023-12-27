import {
	Card,
	CardBody,
	Stack,
	Image,
	Text,
	Heading,
	GridItem,
	Icon,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';

function SkeletonCard() {
	return (
		<GridItem w="100%">
			<Card shadow="md" border="1px solid #EDF2F7;" borderRadius="3xl">
				<CardBody>
					<Stack direction="row">
						<SkeletonCircle borderRadius={8} size="88px" />
						<Stack pl={1}>
							<Heading size="xs" color="gray.500">
								<SkeletonText w={'40px'} noOfLines={1} spacing="0" skeletonHeight="4" />
							</Heading>
							<Stack mt={'2px'}>
								<SkeletonText w={'80px'} noOfLines={1} spacing="0" skeletonHeight="4" />
							</Stack>
						</Stack>
					</Stack>
					<Stack mt={5}>
						<Stack position="relative" spacing={1.5} direction="row">
							<SkeletonText w={'100%'} noOfLines={1} spacing="0" skeletonHeight="4" />
						</Stack>
					</Stack>
					<Stack alignItems="center" mt={3} mb={2} spacing={2} direction="row">
						<SkeletonText w={'80px'} mt={4} noOfLines={1} spacing="0" skeletonHeight="2" />
					</Stack>
				</CardBody>
			</Card>
		</GridItem>
	);
}

export default SkeletonCard;
