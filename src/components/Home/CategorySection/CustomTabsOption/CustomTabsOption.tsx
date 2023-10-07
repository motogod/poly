import React from 'react';
import { Tag } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';

function CustomTabsOption({ children }: any) {
	const isDesktop = useMediaQuery({
		query: '(min-width: 768px)',
	});
	// Tag props 參數 p mb 下斷點的話裡面的 md 會抓不到
	if (isDesktop) {
		return (
			<Tag
				p={3}
				mb={12}
				border="1px"
				backgroundColor="gray.50"
				borderColor="gray.50"
				size="lg"
				colorScheme="undefined"
				borderRadius="full"
				shadow="md"
			>
				{children}
			</Tag>
		);
	}

	return (
		<Tag
			p={0}
			mb={2}
			ml={8}
			border="0px"
			backgroundColor="transparent"
			borderColor="transparent"
			size="lg"
			colorScheme="undefined"
			borderRadius="full"
			shadow=""
		>
			{children}
		</Tag>
	);
}

export default CustomTabsOption;
