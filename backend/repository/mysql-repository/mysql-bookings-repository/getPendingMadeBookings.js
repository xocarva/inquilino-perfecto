const connection = require('../mysqlConnection')

const getPendingMadeBookings = async (userId) => {
    const [ result ] = await connection.query(
        'SELECT bookings.id AS bookingId, bookings.start_date AS startDate, bookings.end_date AS endDate, bookings.owner_rating AS ownerRating, bookings.tenant_rating AS tenantRating, houses.id AS houseId, houses.title AS title, house_pictures.url AS urlPic FROM bookings INNER JOIN houses ON bookings.id_house = houses.id LEFT JOIN house_pictures ON houses.id = house_pictures.id_house INNER JOIN (SELECT id_house, MIN(id) AS minId FROM house_pictures GROUP BY id_house) AS selection ON house_pictures.id_house = selection.id_house AND house_pictures.id = selection.minId WHERE id_tenant = ? AND accepted IS NULL ORDER BY startDate ASC',
        [userId]
    )
    return result
}

module.exports = getPendingMadeBookings