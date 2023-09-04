import { useState } from 'react';
import { Text, Stack, Switch, Checkbox, CheckboxGroup } from '@chakra-ui/react';
import { HamburgerIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import { ChangeEvent } from 'react';

import { leftMenuItem } from './data';

function Markets() {
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
		<Stack h="100vh" px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack direction="row" align="center">
				<HamburgerIcon />
				<Text color="teal.500" size="md" fontWeight="600">
					Filter
				</Text>
				<Switch
					onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.checked)}
					ml="150px"
					size="lg"
					colorScheme="teal"
				/>
			</Stack>
			<Stack direction="row">
				<Stack w="260px" h="100vh" overflowY="scroll">
					<Stack>
						{menuData.map((value, index): any => {
							return (
								<>
									<Stack
										onClick={() => handleClickMenu(value.menuId)}
										cursor="pointer"
										alignItems="center"
										key={index}
										direction="row"
										justify="space-between"
									>
										<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
											{value.menu}
										</Text>
										{value.menuSelected ? (
											<ChevronDownIcon boxSize={6} />
										) : (
											<ChevronUpIcon boxSize={6} />
										)}
									</Stack>
									{value.menuSelected &&
										value.subMenu.map((subValue, subIndex) => {
											return (
												<>
													<Stack
														zIndex={1}
														onClick={() => handleClickSubMenu(subValue.subMenuId)}
														cursor="pointer"
														key={subIndex}
														direction="row"
														justify="space-between"
													>
														<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
															{subValue.subMenu}
														</Text>
														<Checkbox
															isChecked={subValue.subMenuSelected}
															onChange={() => handleClickSubMenu(subValue.subMenuId)}
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
																	onClick={() =>
																		handleClickSubMenuItem(itemValue.itemId, itemValue.item)
																	}
																	cursor="pointer"
																	key={itemIndex}
																	direction="row"
																	justify="space-between"
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
																		onChange={() =>
																			handleClickSubMenuItem(itemValue.itemId, itemValue.item)
																		}
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
					</Stack>
				</Stack>
				<Stack w="100vw" backgroundColor="blue"></Stack>
			</Stack>
		</Stack>
	);
}

export default Markets;
