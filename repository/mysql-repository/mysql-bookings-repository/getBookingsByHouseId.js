const connection = require('../mysqlConnection')

const getBookingsByHouseId = async (houseId) => {
  const [ bookings ] = await connection.query(
        "SELECT id, start_date AS startDate, end_date AS endDate, id_house AS houseId, id_tenant AS tenantId FROM bookings WHERE id_house = ? AND accepted IS NOT false",
        [ houseId ]
  )

  return bookings
}

module.exports = getBookingsByHouseId

