import { Stack, Divider, Grid, Center, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import useFilter from './useFilter';
import LeftMenu from './LeftMenu';
import { CategoryCard } from '@/components/common';

const empty_array = [...Array(13)];

function Markets() {
	const { Filter, isOpen } = useFilter();

	return (
		<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack display={{ sm: 'none', md: 'inline' }} w="290px" mb="3">
				<Filter />
			</Stack>
			<Stack
				display={{ sm: 'inline', md: 'none' }}
				pl={{ sm: 4, md: 0 }}
				pr={{ sm: 4, md: 0 }}
				mb={4}
			>
				<Button
					w={'100%'}
					onClick={() => alert('View More')}
					leftIcon={<HamburgerIcon />}
					colorScheme="teal"
					variant="solid"
				>
					Filter
				</Button>
			</Stack>
			<Stack pl={{ sm: 4, md: 0 }} pr={{ sm: 4, md: 0 }} mt="0" direction="row" flex="auto">
				<Stack
					w={isOpen ? '290px' : '0px'}
					mr={isOpen ? '3' : '-2'}
					flex="none"
					transition="all 0.5s ease-in-out;"
					transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<Stack h="100vh" overflow="auto">
						<LeftMenu />
						<Center>
							<Divider m={6} borderColor="gray" />
						</Center>
					</Stack>
				</Stack>
				<Grid w="100%" h="100%" templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'} gap={4}>
					{empty_array.map((value, index) => {
						return <CategoryCard key={index} />;
					})}
				</Grid>
			</Stack>
		</Stack>
	);
}

export default Markets;
