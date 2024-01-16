export const sideBarMenu = [
    {
        id: 0,
        name: 'Dashboard',
        icon: 'HiComputerDesktop',
        link: '/dashboard',
        children: null,
        logout: false
    },
    {
        id: 1,
        name: 'Transaction',
        icon: 'HiCurrencyDollar',
        link: 'transaction',
        children: null,
        logout: false
    },
    {
        id: 2,
        name: 'Users',
        icon: 'HiMiniUser',
        link: null,
        logout: false,
        children: [
            {
                id: 0,
                name: 'Alluser',
                link: 'alluser',
            }, 
            {
                id: 1,
                name: 'Banuser',
                link: 'banuser',
            }, 
            {
                id: 2,
                name: 'Reports',
                link: 'reports',
            }
        ]
    },
    {
        id: 3,
        name: 'Products',
        icon: 'HiMiniSwatch',
        link: null,
        dropdown: '',
        logout: false,
        children: [
            {
                id: 0,
                name: 'Bundles',
                link: 'bundles',
            }, 
            {
                id: 1,
                name: 'Items',
                link: 'items',
            }
        ]
    },
    {
        id: 4,
        name: 'Shop History',
        icon: 'HiMiniShoppingCart',
        link: 'shopping-history',
        children: null,
        logout: false
    },
    {
        id: 5,
        name: 'Games',
        icon: 'HiRocketLaunch',
        link: 'games',
        children: null,
        logout: false
    },
    {
        id: 6,
        name: 'Support',
        icon: 'HiMiniCreditCard',
        link: 'support',
        children: null,
        logout: false
    },
    {
        id: 7,
        name: 'LogOut',
        icon: 'HiOutlineArrowLeftOnRectangle',
        link: '/',
        children: null,
        logout: true
    },

]

export const admin = [
    {
        fullname: 'Leanne Graham',
        fristname: 'Leanne',
        lastname: 'Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        address: {
            country: 'Canada',
            city: 'Gwenborough',
            street: 'Kulas Light',
            suite: 'Apt. 556',
            zipcode: '92998-3874',
        },
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
    }
]
