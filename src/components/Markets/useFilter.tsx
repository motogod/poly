import { useState, ChangeEvent } from 'react';
import { Text, Stack, Switch } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const useFilter = () => {
	const [isOpen, setIsOpen] = useState(true);

	const Filter = () => {
		return (
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
		);
	};

	return {
		Filter,
		isOpen,
	};
};

export default useFilter;
