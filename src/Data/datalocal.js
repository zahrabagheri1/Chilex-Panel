export const sideBarMenu = [
    {
        name: 'Dashboard',
        icon: 'HiComputerDesktop',
        link: '/dashboard',
    },
    {
        name: 'Transaction',
        icon: 'HiPuzzlePiece',
        link: 'transaction',
    },
    {
        name: 'Products',
        icon: 'HiMiniSwatch',
        link: null,
        children: [
            {
                name: 'Add Bandel',
                icon: 'IoAnalyticsOutline',
                link: 'bandels',
            }, 
            {
                name: 'Add Item',
                icon: 'IoAnalytics',
                link: 'items',
            }
        ]
    },
    {
        name: 'Users',
        icon: 'HiMiniUsers',
        link: 'users',
    },
    {
        name: 'Games',
        icon: 'HiPuzzlePiece',
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


