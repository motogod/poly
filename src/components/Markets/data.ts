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
		menuSelected: true,
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
					{ itemId: 2, item: 'Billionaires', itemSelected: false },
					{ itemId: 3, item: 'Fed interest rate', itemSelected: false },
				],
			},
			{
				subMenuId: 2,
				subMenu: 'Crypto',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 4, item: 'Exchanges', itemSelected: false },
					{ itemId: 5, item: 'Friend Tech', itemSelected: false },
					{ itemId: 6, item: 'Market caps', itemSelected: false },
					{ itemId: 7, item: 'Price', itemSelected: false },
					{ itemId: 8, item: 'Stablecoins', itemSelected: false },
				],
			},
			{
				subMenuId: 3,
				subMenu: 'Politics',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 9, item: 'Biden', itemSelected: false },
					{ itemId: 10, item: 'Elections', itemSelected: false },
					{ itemId: 11, item: 'Global Politics', itemSelected: false },
					{ itemId: 12, item: 'Trump', itemSelected: false },
					{ itemId: 13, item: 'US ploitics', itemSelected: false },
				],
			},
			{
				subMenuId: 4,
				subMenu: 'Test 1',
				subMenuSelected: false,
				subMenuItem: [
					{ itemId: 14, item: 'Biden', itemSelected: false },
					{ itemId: 15, item: 'Elections', itemSelected: false },
					{ itemId: 16, item: 'Global Politics', itemSelected: false },
					{ itemId: 17, item: 'Trump', itemSelected: false },
					{ itemId: 18, item: 'US ploitics', itemSelected: false },
				],
			},
			// {
			// 	subMenuId: 5,
			// 	subMenu: 'Test 1',
			// 	subMenuSelected: false,
			// 	subMenuItem: [
			// 		{ itemId: 19, item: 'Biden', itemSelected: false },
			// 		{ itemId: 20, item: 'Elections', itemSelected: false },
			// 		{ itemId: 21, item: 'Global Politics', itemSelected: false },
			// 		{ itemId: 22, item: 'Trump', itemSelected: false },
			// 		{ itemId: 23, item: 'US ploitics', itemSelected: false },
			// 	],
			// },
			// {
			// 	subMenuId: 6,
			// 	subMenu: 'Test 2',
			// 	subMenuSelected: false,
			// 	subMenuItem: [
			// 		{ itemId: 24, item: 'Biden', itemSelected: false },
			// 		{ itemId: 25, item: 'Elections', itemSelected: false },
			// 		{ itemId: 26, item: 'Global Politics', itemSelected: false },
			// 		{ itemId: 27, item: 'Trump', itemSelected: false },
			// 		{ itemId: 28, item: 'US ploitics', itemSelected: false },
			// 	],
			// },
		],
	},
];

export const testMenuItem = [
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
	{ title: 'Test 1' },
];
