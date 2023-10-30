export const sideBarMenu = [
    {
        name: 'Dashboard',
        icon: 'HiComputerDesktop',
        link: '/dashboard',
    },
    {
        name: 'Transaction',
        icon: 'HiCurrencyDollar',
        link: 'transaction',
    },
    {
        name: 'Products',
        icon: 'HiMiniSwatch',
        link: null,
        dropdown: '',
        children: [
            {
                name: 'Bundles',
                icon: 'IoAnalyticsOutline',
                link: 'bundles',
            }, 
            {
                name: 'Items',
                icon: 'IoAnalytics',
                link: 'items',
            }
        ]
    },
    {
        name: 'Chat',
        icon: 'HiMiniChatBubbleLeftRight',
        link: 'chats',
    },
    {
        name: 'Shopping History',
        icon: 'HiMiniShoppingCart',
        link: 'shopping-history',
    },
    {
        name: 'Games',
        icon: 'HiRocketLaunch',
        link: 'games',
    },
    {
        name: 'Support',
        icon: 'HiMiniCreditCard',
        link: 'support',
    },
    {
        name: 'LogOut',
        icon: 'HiOutlineArrowLeftOnRectangle',
        link: '../login',
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
