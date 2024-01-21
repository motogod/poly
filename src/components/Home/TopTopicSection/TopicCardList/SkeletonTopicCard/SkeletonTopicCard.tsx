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

function SkeletonTopicCard({ index }: { index: number }) {
	return (
		<GridItem w="100%" ml={{ md: index === 0 ? '116px' : '0px', sm: index === 0 ? '16px' : '0px' }}>
			<Card minH={'396px'} width="xs" shadow="md" border="1px solid #EDF2F7;" borderRadius="3xl">
				<CardBody p={0}>
					<Stack direction="row">
						<SkeletonCircle height="240px" w="100%" borderRadius="3xl" size="88px" />
					</Stack>
					<Stack p={4} mt={4}>
						<Stack position="relative" spacing={1.5} direction="row">
							<SkeletonText w={'100%'} noOfLines={1} spacing="0" skeletonHeight="4" />
						</Stack>
						<SkeletonText w={'60%'} noOfLines={1} spacing="0" skeletonHeight="4" />
					</Stack>
					<Stack p={4} alignItems="center" mt={0} mb={2} direction="row">
						<SkeletonText w={'160px'} mt={4} noOfLines={1} spacing="0" skeletonHeight="2" />
					</Stack>
				</CardBody>
			</Card>
		</GridItem>
	);
}

export default SkeletonTopicCard;
