import React, { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';
import { headerHeight, paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';

type ContainerType = {
	children: ReactNode;
	paddingX?: string;
	paddingY?: string;
};

function Container({ children, paddingX, paddingY }: ContainerType) {
	const x = paddingX ? paddingX : paddingMainHorizontal;
	const y = paddingY ? paddingY : paddingMainVertical;

	return (
		<Stack mt={headerHeight} px={x} py={y}>
			{children}
		</Stack>
	);
}

export default Container;
