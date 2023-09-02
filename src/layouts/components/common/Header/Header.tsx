import React from 'react';
import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import styles from './header.module.scss';
import { PrimaryPink } from '@/utils/color';

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

function Header() {
	return (
		<Stack
			px={{ md: 132, sm: 6 }}
			py={{ md: 6, sm: 4 }}
			w="100%"
			position="fixed"
			zIndex={5}
			flexDirection="row"
			justifyContent="space-between"
			backgroundColor="gray.50"
		>
			<Stack direction="row" alignItems="center" spacing={1}>
				<CircleIcon cursor="pointer" boxSize={12} color={PrimaryPink} />
				<Heading cursor="pointer" size="md" color="gray.700" mr={5}>
					Gomarket
				</Heading>
				<Heading cursor="pointer" size="sm" color="gray.800" mr={5}>
					Markets
				</Heading>
				<Heading cursor="pointer" size="sm" color="gray.800">
					How it works
				</Heading>
			</Stack>
			<Stack direction="row" alignItems="center" spacing={6}>
				<Heading cursor="pointer" size="sm" color="gray.800">
					Connect
				</Heading>
				<Heading cursor="pointer" size="sm" color="gray.800">
					Leaderboard
				</Heading>
			</Stack>
		</Stack>

		// <div className={styles.headerWrapper}>
		// 	<p>Header</p>
		// 	<WarningIcon w={8} h={8} color="red.500" />
		// </div>
	);
}

export default Header;
