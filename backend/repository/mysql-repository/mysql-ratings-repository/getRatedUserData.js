const connection = require('../mysqlConnection')

const getRatedUserData = async ( bookingData ) => {
    const { ratingUserId, ownerId, tenantId } = bookingData
    let ratedUserRole
    let ratedUserId

    if (ratingUserId == ownerId) {
        ratedUserRole = 'tenant'
        ratedUserId = tenantId
    } else if (ratingUserId == tenantId){
        ratedUserRole = 'owner'
        ratedUserId = ownerId
    } else throw new Error ('User not allowed to rate this booking')

    return { ratedUserRole, ratedUserId }
}

module.exports = getRatedUserData