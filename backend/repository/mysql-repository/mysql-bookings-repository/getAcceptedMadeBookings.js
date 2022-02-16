const connection = require('../mysqlConnection')

const getAcceptedMadeBookings = async (userId) => {
    const [ result ] = await connection.query(
        'SELECT bookings.id_house AS houseId, bookings.tenant_rating AS tenantRating, bookings.owner_rating AS ownerRating, bookings.id AS bookingId, house_pictures.url AS housePicUrl, houses.title AS houseTitle, bookings.start_date AS startDate, bookings.end_date AS endDate FROM bookings INNER JOIN houses ON bookings.id_house = houses.id INNER JOIN house_pictures ON houses.id = house_pictures.id_house INNER JOIN (SELECT id_house, MIN(id) AS minId FROM house_pictures GROUP BY id_house) AS selection ON house_pictures.id_house = selection.id_house AND house_pictures.id = selection.minId WHERE bookings.id_tenant = ? AND bookings.accepted IS TRUE ORDER BY startDate, bookingId ASC',
        [userId]
    )
    return result
}

module.exports = getAcceptedMadeBookings