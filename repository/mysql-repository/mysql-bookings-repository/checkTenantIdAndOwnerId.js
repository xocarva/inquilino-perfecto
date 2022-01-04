const connection = require('../mysqlConnection')

const checkTenantIdAndOwnerId = async (bookingData) => {
    const { houseId, tenantId} = bookingData
    const [ownerId] = await connection.query(
    "SELECT id_owner FROM houses WHERE id = ?",
    [ houseId ]
    )
    if(ownerId[0].id_owner == tenantId) {
        return true
    }
    return ownerId
}

module.exports = checkTenantIdAndOwnerId