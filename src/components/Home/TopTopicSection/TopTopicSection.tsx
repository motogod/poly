import React from 'react';
import {
	Heading,
	Center,
	Stack,
	Grid,
	GridItem,
	Flex,
	Text,
	Box,
	Spacer,
	HStack,
	IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import TopicCardList from './TopicCardList';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import styles from './topTopicSection.module.scss';

function TopTopicSection() {
	return (
		<Stack py={paddingMainVertical}>
			{/* <Stack justify="center" direction="row">
				<Stack>
					<Heading size="xl" color="gray.700">
						{'Bet on markets spotlight'}
					</Heading>
				</Stack>
				<Stack
					display={{ lg: 'inline', md: 'none', sm: 'none' }}
					right={132}
					position="absolute"
					align="end"
					justify="end"
					direction="row"
					spacing="6"
				>
					<IconButton
						isRound={true}
						variant="solid"
						colorScheme="blackAlpha"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronLeftIcon />}
					/>
					<IconButton
						ml="2"
						isRound={true}
						variant="solid"
						colorScheme="teal"
						aria-label="Done"
						fontSize="20px"
						icon={<ChevronRightIcon />}
					/>
				</Stack>
			</Stack> */}
			<TopicCardList />
		</Stack>
	);
}

export default TopTopicSection;
