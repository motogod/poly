import { useState, ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { Text, Stack, Switch } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const useFilter = () => {
	const [isOpen, setIsOpen] = useState(true);

	const { t } = useTranslation();

	const Filter = () => {
		return (
			<>
				<Stack direction="row" align="center" justify="space-between">
					<Stack direction="row" align="center">
						<HamburgerIcon />
						<Text color="teal.500" size="md" fontWeight="600">
							{t('filter')}
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
