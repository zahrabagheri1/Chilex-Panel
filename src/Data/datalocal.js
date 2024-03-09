export const sideBarMenu = [
    {
        id: 0,
        name: 'Dashboard',
        icon: 'HiComputerDesktop',
        path: '/dashboard',
        children: null,
        logout: false
    },
    {
        id: 1,
        name: 'Transaction',
        icon: 'HiCurrencyDollar',
        path: 'transaction',
        children: null,
        logout: false
    },
    {
        id: 2,
        name: 'Users',
        icon: 'HiMiniUser',
        path: null,
        logout: false,
        children: [
            {
                id: 0,
                name: 'Alluser',
                path: 'alluser',
            }, 
            {
                id: 1,
                name: 'Banuser',
                path: 'banuser',
            }, 
            {
                id: 2,
                name: 'Reports',
                path: 'reports',
            }
        ]
    },
    {
        id: 3,
        name: 'Products',
        icon: 'HiMiniSwatch',
        path: null,
        dropdown: '',
        logout: false,
        children: [
            {
                id: 0,
                name: 'Bundles',
                path: 'bundles',
            }, 
            {
                id: 1,
                name: 'Items',
                path: 'items',
            }
        ]
    },
    {
        id: 4,
        name: 'Shop History',
        icon: 'HiMiniShoppingCart',
        path: 'shopping-history',
        children: null,
        logout: false
    },
    {
        id: 5,
        name: 'Games',
        icon: 'HiRocketLaunch',
        path: 'games',
        children: null,
        logout: false
    },
    {
        id: 6,
        name: 'Notifications',
        icon: 'HiBell',
        path: null,
        dropdown: '',
        logout: false,
        children: [
            {
                id: 0,
                name: 'Notification',
                path: 'Notification',
            }, 
            {
                id: 1,
                name: 'Dialog',
                path: 'Dialog',
            }
        ]
    },
    {
        id: 7,
        name: 'Support',
        icon: 'HiMiniCreditCard',
        path: 'support',
        children: null,
        logout: false
    },
    {
        id: 8,
        name: 'LogOut',
        icon: 'HiOutlineArrowLeftOnRectangle',
        path: '/',
        children: null,
        logout: true
    },

]

