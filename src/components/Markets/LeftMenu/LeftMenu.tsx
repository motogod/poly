import { useEffect, useState } from 'react';
import { Text, Stack, Checkbox } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	AppDispatch,
	RootState,
	handleClickMenu,
	handleClickSubMenu,
	handleClickSubMenuItem,
} from '@/store';
import { leftMenuItem } from '../data';
import { zIndexMinimum } from '@/utils/zIndex';
import { CategoriesType, ChildrenCategoriesType } from '@/api/type';

const LeftMenu = () => {
	const { categoriesData } = useSelector((state: RootState) => state.dataReducer);

	console.log('Markets categoriesData', categoriesData);

	const dispatch = useDispatch<AppDispatch>();

	return (
		<>
			{categoriesData.map((value: CategoriesType, index: number) => {
				return (
					<>
						<Stack
							onClick={e => {
								e.preventDefault();
								dispatch(handleClickMenu(value.menuId));
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
							value.subMenuData.map((subValue, subIndex) => {
								return (
									<>
										<Stack
											zIndex={zIndexMinimum}
											onClick={e => {
												e.preventDefault();
												dispatch(handleClickSubMenu(subValue.id));
											}}
											cursor="pointer"
											key={subIndex}
											direction="row"
											justify="space-between"
											mt="2"
											mr={{ base: '1', sm: '1', md: '5' }}
										>
											<Text color="gray.800" size="md" fontWeight="500" lineHeight="24px">
												{subValue.name}
											</Text>
											<Checkbox
												isChecked={subValue.subMenuSelected}
												onChange={e => {
													e.preventDefault();
													handleClickSubMenu(subValue.id);
												}}
												size="lg"
												borderColor="gray.200"
												defaultChecked
												colorScheme="teal"
											></Checkbox>
										</Stack>
										{subValue.childrenCategories.map((itemValue, itemIndex) => {
											return (
												<>
													<Stack
														onClick={e => {
															e.preventDefault();
															dispatch(
																handleClickSubMenuItem({
																	clickSubMenuItemId: itemValue.id,
																	clickSubMenuItemName: itemValue.name,
																})
															);
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
															{itemValue.name}
														</Text>
														<Checkbox
															isChecked={itemValue.itemSelected}
															onChange={e => {
																e.preventDefault();
																dispatch(
																	handleClickSubMenuItem({
																		clickSubMenuItemId: itemValue.id,
																		clickSubMenuItemName: itemValue.name,
																	})
																);
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
