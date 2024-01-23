export const adminTransaction = [
    { name: 'id', status: true },
    { name: 'status', status: true },
    { name: 'amount', status: true },
    { name: 'maskedCardNumber', status: true },
    { name: 'hashedCardNumber', status: true },
    { name: 'shaparakRefNumber', status: true },
    { name: 'createdAt', status: true },
    { name: 'updatedAt', status: true },
    { name: 'userName', status: true }
]

export const sortBundles = [
    { name: 'amount', status: true },
    { name: 'id', status: true },
    { name: 'type', status: true },
    { name: 'name', status: true },
    { name: 'sku', status: true },
    { name: 'status', status: true },
    { name: 'createdAt', status: true },
    { name: 'updatedAt', status: true, },
    {
        name: 'prices', status: true,
        child: [
            { name: 'id', status: false },
            { name: 'amount', status: true },
            { name: 'priceTypes', status: true },
            { name: 'priceStatus', status: true }
        ]
    },
    {
        name: 'activityIntervalTime', status: true,
        child: [
            { name: 'day', status: true },
            { name: 'hour', status: true },
            { name: 'minute', status: true },
        ]
    },
]

export const sortItems = [
    { name: 'id', status: true },
    { name: 'name', status: true },
    { name: 'createdAt', status: true },
    { name: 'expireTime', status: true },
    { name: 'sku', status: true },
    { name: 'status', status: true },
    { name: 'tier', status: true },
    {
        name: 'prices',
        status: true,
        child: [
            { name: 'id', status: true },
            { name: 'amount', status: true },
            { name: 'priceTypes', status: true },
            { name: 'priceStatus', status: true }
        ]

    },
]

export const sortHistory = [
    { name: 'id', status: true },
    { name: 'type', status: true },
    { name: 'amount', status: true },
    { name: 'referenceType', status: true },
    { name: 'referenceId', status: true },
    { name: 'userId', status: true },
    { name: 'createdAt', status: true },
    { name: 'username', status: true },
    { name: 'transactionAmount', status: true },
    { name: 'gatewayType', status: true },
]

export const sortGamePlayed = [
    { name: 'id', status: true },
    { name: 'matchId', status: true },
    { name: 'matchRank', status: true },
    { name: 'settingId', status: true },
    { name: 'game', status: true },
    { name: 'processId', status: true },
    { name: 'creatorId', status: true },
    { name: 'finished', status: true },
    { name: 'createdAt', status: true },
    { name: 'updatedAt', status: true }
]

export const sortGameSettings = [
    { name: 'id', status: true },
    { name: 'name', status: true },
    { name: 'active', status: true },
    { name: 'game', status: true },
    { name: 'playersLength', status: true },
    { name: 'type', status: true },
    { name: 'description', status: true },
    { name: 'level', status: true },
    { name: 'botLevel', status: true },
    { name: 'createdAt', status: true },
    { name: 'updatedAt', status: true }
]
export const sortBanUsers = [
    { name: 'id', status: true },
    { name: 'userId', status: true },
    { name: 'type', status: true },
    { name: 'description', status: true },
    { name: 'createdAt', status: true },
]

export const sortUserList = [
    { name: 'id', status: true },
    { name: 'name', status: true },
    { name: 'email', status: true },
    { name: 'phone', status: true },
    { name: 'register', status: true },
    { name: 'online', status: true },
    { name: 'bot', status: true },
    { name: 'inviteCode', status: true },
    { name: 'invitedBy', status: true },
    { name: 'createdAt', status: true },
    { name: 'level', status: true },
    { name: 'cup', status: true },
    { name: 'gem', status: true },
    { name: 'coin', status: true },
    { name: 'unfinishedGames', status: true },
    { name: 'ban', status: true },
]



export const sortOfOrderList = {
}


// stuffType*	number
//     stuffType =>  gemBundle : 0 , coinBundle : 1 , Item : 2
// name*	string
// sku*	string
// amount	number
// image	string
// prices*	[
//     prices: { type: enumPriceType, amount: number }[] , 
//     type => GEM : 0 , COIN : 1 , RIAL : 2
// string]
// expireTime	string
// nullable: true
// status*	number
// minimum: 0
// maximum: 1
//     status => ACTIVE : 0 , DEACTIVE : 1
// category*	number
// minimum: 0
// maximum: 2
//     ELSE : 0 , GAME : 1 , CHARACTER : 2
// gameId	number
// gameItemType	number
//     DICE_SKIN: 0,
//     CARD_SKIN: 1,
//     FLAG_SKIN: 2,
//     FORMATION: 3
// characterItemType	number
//     CLOTHES : 0,
//     FACE: 1,
//     HAIR: 2,
//     BEARD: 3,
//     EYE: 4,
//     EYEBROWS: 5,
//     GLASESS: 6,
//     MASK: 7,
//     HAT: 8
// tier	number
//     DEFAULT : 0,
//     COMMON : 1 ,
//     RARE :2 ,
//     EPIC : 3,
//     LEGENDARY : 4,
// activityIntervalTime	{
// description:	
//     {day : number , hour : number , minute : number}
// }
// }