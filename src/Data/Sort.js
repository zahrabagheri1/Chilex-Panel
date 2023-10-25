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
    {name: 'amount',status: true},
    {name: 'id',status: true},
    {name: 'type',status: true},
    {name: 'name',status: true},
    {name: 'sku',status: true},
    {name: 'status',status: true},
    {name: 'createdAt',status: true},
    {name: 'updatedAt',status: true,},
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
    { name: 'sku', status: true },
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
