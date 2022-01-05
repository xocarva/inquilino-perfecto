const connection = require('../mysqlConnection')

const getBookingsByHouseId = async (houseId) => {
  const [bookings] = await connection.query(
        "SELECT * FROM bookings WHERE id_house = ? AND accepted IS NOT false",
        [ houseId ]
  )

  return bookings
}

module.exports = getBookingsByHouseId

