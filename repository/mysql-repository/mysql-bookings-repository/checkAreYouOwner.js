const connection = require('../mysqlConnection')

const checkAreYouOwner = async (houseId) => {
    const { id_house } = houseId
    const [[houseData]] = await connection.query(
        "SELECT * FROM houses WHERE id = ?",
        [id_house]
    )

    return houseData.id_owner

}

module.exports = checkAreYouOwner
