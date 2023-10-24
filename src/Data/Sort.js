export const adminTransaction = [
    {name: 'id',status: true},
    {name: 'amount',status: true},
    {name: 'createdAt',status: true},
    {name: 'hashedCardNumber',status: true},
    {name: 'maskedCardNumber',status: true},
    {name: 'shaparakRefNumber',status: true},
    {name: 'status',status: true},
    {name: 'updatedAt',status: true},
    {name: 'userName',status: true},
]



export const sortBandels = [
    {name: 'bundleAmount',status: true},
    {name: 'bundleId',status: true},
    {name: 'bundleName',status: true},
    {name: 'bundleSku',status: true},
    {name: 'bundleStatus',status: true},
    {name: 'bundleType',status: true,},
    {name: 'prices',status: true,
        child: [
            {
                name: 'amount',
                status: true,
            },
            {
                name: 'id',
                status: true,
            },
            {
                name: 'priceStatus',
                status: true,
            },
            {
                name: 'priceType',
                status: true,
            },
        ]
    },
]



export const sortItems = [
    { name: 'id', status: true },
    { name: 'gameId', status: true },
    { name: 'status', status: true },
    { name: 'name', status: true },
    { name: 'createdAt', status: true },
    { name: 'expireTime', status: true },
    { name: 'sku', status: false },
    { name: 'sku', status: false },
    {
        name: 'prices',
        status: true,
        child: [
            {
                name: 'amount',
                status: true,
            },
            {
                name: 'id',
                status: true,
            },
            {
                name: 'priceTypes',
                status: true,
            },
        ]

    },
]
