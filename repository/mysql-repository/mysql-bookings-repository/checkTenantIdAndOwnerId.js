const connection = require('../mysqlConnection')

const checkTenantIdAndOwnerId = async (bookingData) => {
    const { houseId, tenantId} = bookingData
    const [result] = await connection.query(
    "SELECT id_owner FROM houses WHERE id = ?",
    [ houseId ]
    )
    if(result[0].id_owner == tenantId) {
        return true
    }
    return false
}

module.exports = checkTenantIdAndOwnerId