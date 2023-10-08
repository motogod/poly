'use client';

import { ReactNode } from 'react';
import {
	Box,
	Container,
	Stack,
	SimpleGrid,
	Text,
	VisuallyHidden,
	chakra,
	useColorModeValue,
	Heading,
	Select,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { paddingMainHorizontal } from '@/utils/screen';
import { PrimaryPink } from '@/utils/color';

const CircleIcon = (props: any) => (
	<Icon viewBox="0 0 200 200" {...props}>
		<path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
	</Icon>
);

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={'500'} fontSize={'lg'} mb={2}>
			{children}
		</Text>
	);
};

const options = [
	{ label: 'Green', value: 'green' },
	{ label: 'Green-Yellow', value: 'greenyellow' },
	{ label: 'Red', value: 'red' },
	{ label: 'Violet', value: 'violet' },
	{ label: 'Forest', value: 'forest' },
	{ label: 'Tangerine', value: 'tangerine' },
	{ label: 'Blush', value: 'blush' },
	{ label: 'Purple', value: 'purple' },
];

export default function LargeWithAppLinksAndSocial() {
	return (
		<Box
			px={paddingMainHorizontal}
			backgroundColor="gray.50"
			// bg={useColorModeValue('gray.50', 'gray.900')}
			// color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Container as="div" maxW={'100%'} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
					<Stack align={'flex-start'}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<CircleIcon cursor="pointer" boxSize={12} color={PrimaryPink} />
							<Heading cursor="pointer" size="md" color={PrimaryPink} mr={5}>
								Gomarket
							</Heading>
						</Stack>
						<Box mt="2" as={Stack}>
							<Select w="320px" placeholder="" size="md" defaultValue={'english'}>
								<option value="english">English</option>
								<option value="chinese">Chinese</option>
								<option value="japanese">Japanese</option>
							</Select>
						</Box>
					</Stack>

					<Stack align={'flex-start'} />

					<Stack align={'flex-start'}>
						<ListHeader>Markets</ListHeader>
						<Box as="a" href={'#'}>
							How it works
						</Box>
						<Box as="a" href={'#'}>
							FAQ
						</Box>
						<Box as="a" href={'#'}>
							Privacy Policy
						</Box>
					</Stack>

					<Stack align={'flex-start'}>
						<ListHeader>Install App</ListHeader>
						<Box as="a" href={'#'}>
							About Us
						</Box>
						{/* <AppStoreBadge />
		        <PlayStoreBadge /> */}
					</Stack>
				</SimpleGrid>
			</Container>

			<Box
				borderTopWidth={0}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.700')}
			>
				<Container
					as={Stack}
					maxW={'100%'}
					py={14}
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify={{ md: 'space-between' }}
					align={{ md: 'center' }}
				>
					<Text>© 2023 Test. All rights reserved</Text>
				</Container>
			</Box>
		</Box>
	);
}
