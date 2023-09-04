interface SubMenuItemType {
	itemId: number;
	item: string;
	itemSelected: boolean;
}

interface SubMenuType {
	subMenuId: number;
	subMenu: string;
	subMenuSelected: boolean;
	subMenuItem: SubMenuItemType[];
}

interface MenuType {
	menuId: number;
	menu: string;
	menuSelected: boolean;
	subMenu: SubMenuType[];
}

export const leftMenuItem: MenuType[] = [
	{
		menuId: 0,
		menu: 'Markets',
		menuSelected: false,
		subMenu: [
			{
				subMenuId: 0,
				subMenu: 'AI',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 0, item: 'Chatbot', itemSelected: false },
					{ itemId: 1, item: 'Art', itemSelected: false },
				],
			},
			{
				subMenuId: 1,
				subMenu: 'Business',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 0, item: 'Billionaires', itemSelected: false },
					{ itemId: 1, item: 'Fed interest rate', itemSelected: false },
				],
			},
			{
				subMenuId: 2,
				subMenu: 'Crypto',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 0, item: 'Exchanges', itemSelected: false },
					{ itemId: 1, item: 'Friend Tech', itemSelected: false },
					{ itemId: 2, item: 'Market caps', itemSelected: false },
					{ itemId: 3, item: 'Price', itemSelected: false },
					{ itemId: 4, item: 'Stablecoins', itemSelected: false },
				],
			},
			{
				subMenuId: 3,
				subMenu: 'Politics',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 0, item: 'Biden', itemSelected: false },
					{ itemId: 1, item: 'Elections', itemSelected: false },
					{ itemId: 2, item: 'Global Politics', itemSelected: false },
					{ itemId: 3, item: 'Trump', itemSelected: false },
					{ itemId: 4, item: 'US ploitics', itemSelected: false },
				],
			},
		],
	},
];
