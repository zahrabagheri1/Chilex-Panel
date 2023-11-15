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


export const sortBundles = [
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
    { name: 'name', status: true },
    { name: 'createdAt', status: true },
    { name: 'expireTime', status: true },
    { name: 'sku', status: true },
    { name: 'status', status: true },
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




export const sortHistory =[
    { name: 'id', status: true },
    { name: 'userId', status: true },
    { name: 'type', status: true },
    { name: 'amount', status: true },
    { name: 'referenceType', status: true },
    { name: 'referenceId', status: true },
    { name: 'createdAt', status: true },
    { name: 'username', status: true },
    { name: 'transactionAmount', status: true },
    { name: 'gatewayType', status: true },
]

export const sortGamePlayed = [
    {name: 'id' , status: true},
    {name: 'matchId' , status: true},
    {name: 'matchRank' , status: true},
    {name: 'settingId' , status: true},
    {name: 'game' , status: true},
    {name: 'processId' , status: true},
    {name: 'finished' , status: true},
    {name: 'createdAt' , status: true},
    {name: 'updatedAt' , status: true}
]
