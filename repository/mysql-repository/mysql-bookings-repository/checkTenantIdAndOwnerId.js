const connection = require('../mysqlConnection')

const checkTenantIdAndOwnerId = async (bookingData) => {
    const { houseId, tenantId} = bookingData
    const [ownerId] = await connection.query(
    "SELECT id_owner AS ownerId FROM houses WHERE id = ?",
    [ houseId ]
    )
    if(!ownerId) throw new Error ('This house does not exist')
    if(ownerId[0].id_owner == tenantId) {
        return true
    }
    return false
}

module.exports = checkTenantIdAndOwnerId
