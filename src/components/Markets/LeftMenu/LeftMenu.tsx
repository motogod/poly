import { useState } from 'react';
import { Text, Stack, Checkbox } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { leftMenuItem } from '../data';
import { zIndexMinimum } from '@/utils/zIndex';

const LeftMenu = () => {
	const [menuData, setMenuData] = useState(leftMenuItem);

	const handleClickMenu = (clickMenuId: number) => {
		const newMenuData = menuData.map(value => {
			if (value.menuId === clickMenuId) {
				value.menuSelected = !value.menuSelected;
			}

			return value;
		});

		setMenuData(newMenuData);
	};

	const handleClickSubMenu = (clickSubMenuId: number) => {
		const newMenuData = menuData.map(value => {
			value.subMenu.map(subMenuValue => {
				if (subMenuValue.subMenuId === clickSubMenuId) {
					subMenuValue.subMenuSelected = !subMenuValue.subMenuSelected;

					subMenuValue.subMenuItem.map(itemValue => {
						if (subMenuValue.subMenuSelected) {
							itemValue.itemSelected = true;
						} else {
							itemValue.itemSelected = false;
						}

						return itemValue;
					});
				}

				return subMenuValue;
			});

			return value;
		});

		setMenuData(newMenuData);
	};

	const handleClickSubMenuItem = (clickSubMenuItemId: number, clickSubMenuItem: string) => {
		const newMenuData = menuData.map(value => {
			value.subMenu.map(subMenuValue => {
				subMenuValue.subMenuItem.map(subMenuItemValue => {
					const { itemId, item } = subMenuItemValue;
					if (itemId === clickSubMenuItemId && item === clickSubMenuItem) {
						subMenuItemValue.itemSelected = !subMenuItemValue.itemSelected;
					}

					return subMenuItemValue;
				});
			});

			return value;
		});

		setMenuData(newMenuData);
	};

	return (
		<>
			{menuData.map((value, index): any => {
				return (
					<>
						<Stack
							onClick={e => {
								e.preventDefault();
								handleClickMenu(value.menuId);
							}}
							cursor="pointer"
							alignItems="center"
							key={index}
							direction="row"
							justify="space-between"
							mr={{ base: '1', sm: '1', md: '5' }}
						>
							<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
								{value.menu}
							</Text>
							{value.menuSelected ? <ChevronDownIcon boxSize={6} /> : <ChevronUpIcon boxSize={6} />}
						</Stack>
						{value.menuSelected &&
							value.subMenu.map((subValue, subIndex) => {
								return (
									<>
										<Stack
											zIndex={zIndexMinimum}
											onClick={e => {
												e.preventDefault();
												handleClickSubMenu(subValue.subMenuId);
											}}
											cursor="pointer"
											key={subIndex}
											direction="row"
											justify="space-between"
											mt="2"
											mr={{ base: '1', sm: '1', md: '5' }}
										>
											<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
												{subValue.subMenu}
											</Text>
											<Checkbox
												isChecked={subValue.subMenuSelected}
												onChange={e => {
													e.preventDefault();
													handleClickSubMenu(subValue.subMenuId);
												}}
												size="lg"
												borderColor="gray.200"
												defaultChecked
												colorScheme="teal"
											></Checkbox>
										</Stack>
										{subValue.subMenuItem.map((itemValue, itemIndex) => {
											return (
												<>
													<Stack
														onClick={e => {
															e.preventDefault();
															handleClickSubMenuItem(itemValue.itemId, itemValue.item);
														}}
														cursor="pointer"
														key={itemIndex}
														direction="row"
														justify="space-between"
														mr={{ base: '1', sm: '1', md: '5' }}
													>
														<Text
															ml="16px"
															color="gray.600"
															size="md"
															fontWeight="400"
															lineHeight="24px"
														>
															{itemValue.item}
														</Text>
														<Checkbox
															isChecked={itemValue.itemSelected}
															onChange={e => {
																e.preventDefault();
																handleClickSubMenuItem(itemValue.itemId, itemValue.item);
															}}
															size="lg"
															borderColor="gray.200"
															defaultChecked
															colorScheme="teal"
														></Checkbox>
													</Stack>
												</>
											);
										})}
									</>
								);
							})}
					</>
				);
			})}
		</>
	);
};

export default LeftMenu;
