import { useEffect, useState, useCallback } from 'react';
import { Text, Stack, Switch, Divider, Grid, Center } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import { ChangeEvent } from 'react';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';

const empty_array = [...Array(13)];

function Markets() {
	const [isOpen, setIsOpen] = useState(true);

	const Filter = useCallback(
		() => (
			<>
				<Stack direction="row" align="center" justify="space-between">
					<Stack direction="row" align="center">
						<HamburgerIcon />
						<Text color="teal.500" size="md" fontWeight="600">
							Filter
						</Text>
					</Stack>
					<Switch
						defaultChecked={isOpen}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							setIsOpen(event.target.checked);
						}}
						ml="0px"
						size="lg"
						colorScheme="teal"
					/>
				</Stack>
			</>
		),
		[isOpen]
	);

	return (
		<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack w="290px" mb="3">
				<Filter />
			</Stack>
			<Stack mt="0" direction="row" flex="auto">
				<Stack
					w={'290px'}
					mr="3"
					flex="none"
					display={isOpen ? 'block' : 'none'}
					// transition="all 0.5s ease-in-out;"
					// transform="translateX(-10px);"
					// transition="all 0.5s ease-in-out;"
					// transition="all 0.5s ease-in-out;"
					// visibility={isOpen ? 'visible' : 'hidden'}
					// transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<Stack h="100vh" overflow="auto">
						<LeftMenu />
						<Center>
							<Divider m={6} borderColor="gray" />
						</Center>
					</Stack>
				</Stack>

				<Grid
					w="100%"
					// w={isOpen ? '80%' : 'calc(100% + 290px)'}
					// transition="all 0.5s ease-in-out;"
					// transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
					templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'}
					gap={4}
				>
					{empty_array.map((value, index) => {
						return <CategoryCard key={index} />;
					})}
				</Grid>
			</Stack>
		</Stack>
	);
}

export default Markets;
