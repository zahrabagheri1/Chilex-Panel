export const adminTransaction = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'status', status: true, list: ['Active', 'Inactive'], date: false },
    { name: 'amount', status: true, list: false, date: false },
    { name: 'maskedCardNumber', status: true, list: false, date: false },
    { name: 'hashedCardNumber', status: true, list: false, date: false },
    { name: 'shaparakRefNumber', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'updatedAt', status: true, list: false, date: true },
    { name: 'userId', status: true, list: false, date: true },
    { name: 'userName', status: true, list: false, date: false }
]


export const sortBundles = [
    { name: 'amount', status: true, list: false, date: false },
    { name: 'id', status: true, list: false, date: false },
    { name: 'type', status: true, list: ['Gem bundle', 'Coin bundle', 'Item', 'Free'], date: false },
    { name: 'name', status: true, list: false, date: false },
    { name: 'sku', status: true, list: false, date: false },
    { name: 'status', status: true, list: ['Active', 'Inactive'], date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'updatedAt', status: true, list: false, date: true, },
    {
        name: 'prices', status: true, list: false, date: false,
        child: [
            { name: 'id', status: false },
            { name: 'amount', status: true, list: false, date: false },
            { name: 'priceTypes', status: true, list: false, date: false },
            { name: 'priceStatus', status: true, list: ['Active', 'Inactive'], date: false }
        ]
    },
    {
        name: 'activityIntervalTime', status: true, list: false, date: false,
        child: [
            { name: 'day', status: true, list: false, date: false },
            { name: 'hour', status: true, list: false, date: false },
            { name: 'minute', status: true, list: false, date: false },
        ]
    },
]

export const sortItems = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'name', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'expireTime', status: true, list: false, date: false },
    { name: 'sku', status: true, list: false, date: false },
    { name: 'status', status: true, list: ['Active', 'Inactive'], date: false },
    { name: 'tier', status: true, list: false, date: false },
    {
        name: 'prices',
        status: true, list: ['Active', 'Inactive'], date: false,
        child: [
            { name: 'id', status: true, list: false, date: false },
            { name: 'amount', status: true, list: false, date: false },
            { name: 'priceTypes', status: true, list: false, date: false },
            { name: 'priceStatus', status: true, list: ['Active', 'Inactive'], date: false }
        ]

    },
]

export const sortHistory = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'type', status: true, list: ['Gem bundle', 'Coin bundle', 'Item', 'Free'], date: false },
    { name: 'amount', status: true, list: false, date: false },
    { name: 'referenceType', status: true, list: ['BUNDLE', 'ITEM', 'TRANSACTION', 'GAME_SETTING', 'INVITING_REWARD', 'DailyCollect', 'DailyQuest', 'Chapter', 'Leaderboard'], date: false },
    { name: 'referenceId', status: true, list: false, date: false },
    { name: 'userId', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'username', status: true, list: false, date: false },
    { name: 'transactionAmount', status: true, list: false, date: false },
    { name: 'gatewayType', status: true, list: ['PASARGAD', 'CAFE_BAZAAR', 'EXCHANGE'], date: false },
]

export const sortGamePlayed = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'matchId', status: true, list: false, date: false },
    { name: 'matchRank', status: true, list: false, date: false },
    { name: 'settingId', status: true, list: false, date: false },
    { name: 'game', status: true, list: false, date: false },
    { name: 'creatorId', status: true, list: false, date: false },
    { name: 'processId', status: true, list: false, date: false },
    { name: 'finished', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'updatedAt', status: true, list: false, date: true }
]

export const sortGameSettings = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'name', status: true, list: false, date: false },
    { name: 'active', status: true, list: false, date: false },
    { name: 'game', status: true, list: false, date: false },
    { name: 'playersLength', status: true, list: false, date: false },
    { name: 'type', status: true, list: ['Gem bundle', 'Coin bundle', 'Item', 'Free'], date: false },
    { name: 'description', status: true, list: false, date: false },
    { name: 'level', status: true, list: false, date: false },
    { name: 'botLevel', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: false },
    { name: 'updatedAt', status: true, list: false, date: false }
]
export const sortBanUsers = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'userId', status: true, list: false, date: false },
    { name: 'type', status: true, list: ['Gem bundle', 'Coin bundle', 'Item', 'Free'], date: false },
    { name: 'description', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: false },
]
export const sortReportUsers = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'userId', status: true, list: false, date: false },
    { name: 'type', status: true, list: ['Gem bundle', 'Coin bundle', 'Item', 'Free'], date: false },
    { name: 'description', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: false },
]

export const sortUserList = [
    { name: 'id', status: true, list: false, date: false },
    { name: 'name', status: true, list: false, date: false },
    { name: 'email', status: true, list: false, date: false },
    { name: 'phone', status: true, list: false, date: false },
    { name: 'register', status: true, list: ['all', 'guest', 'google', 'phone'], date: false },
    { name: 'online', status: true, list: ['Online', 'Offline'], date: false },
    { name: 'bot', status: true, list: ['user', 'bot', 'bot', 'bot', 'bot'], date: false },
    { name: 'inviteCode', status: true, list: false, date: false },
    { name: 'invitedBy', status: true, list: false, date: false },
    { name: 'createdAt', status: true, list: false, date: true },
    { name: 'level', status: true, list: false, date: false },
    { name: 'cup', status: true, list: false, date: false },
    { name: 'gem', status: true, list: false, date: false },
    { name: 'coin', status: true, list: false, date: false },
    { name: 'unfinishedGame', status: true, list: false, date: false },
    { name: 'ban', status: true, list: ['everything' , 'chating'], date: false },
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
//  	number
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