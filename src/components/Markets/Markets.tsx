import { useEffect, useState, useCallback } from 'react';
import { Text, Stack, Switch, Checkbox, CheckboxGroup, Divider, Grid } from '@chakra-ui/react';
import { HamburgerIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { paddingMainHorizontal, paddingMainVertical } from '@/utils/screen';
import { ChangeEvent } from 'react';
import { CategoryCard } from '../../../src/components/common';

import { leftMenuItem, testMenuItem } from './data';

function Markets() {
	const [menuData, setMenuData] = useState(leftMenuItem);

	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {}, [isOpen]);

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

	const LeftMenu = () => {
		return (
			<Stack overflowY="scroll" h="100vh">
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
								mr="5"
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
												onClick={e => {
													e.preventDefault();
													handleClickSubMenu(subValue.subMenuId);
												}}
												cursor="pointer"
												key={subIndex}
												direction="row"
												justify="space-between"
												mt="2"
												mr="5"
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
															mr="5"
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
			</Stack>
		);
	};

	return (
		<Stack px={paddingMainHorizontal} py={paddingMainVertical}>
			<Stack w="290px" mb="3">
				<Filter />
			</Stack>
			<Stack mt="0" direction="row" flex="auto">
				<Stack
					w={'370px'}
					mr="3"
					display={isOpen ? 'block' : 'none'}
					// transition="all 0.5s ease-in-out;"
					// transform="translateX(-10px);"
					// transition="all 0.5s ease-in-out;"
					// transition="all 0.5s ease-in-out;"
					// visibility={isOpen ? 'visible' : 'hidden'}
					// transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
				>
					<LeftMenu />
				</Stack>

				<Grid
					w="100%"
					h="100%"
					// w={isOpen ? '100%' : '100%'}
					// transition="all 0.5s ease-in-out;"
					// transform={isOpen ? 'translate(0, 0);' : 'translate(-290px, 0);'}
					templateColumns={'repeat(auto-fill, minmax(290px, 1fr))'}
					gap={4}
				>
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
					<CategoryCard />
				</Grid>
			</Stack>
		</Stack>
	);
}

export default Markets;
