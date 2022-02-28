const connection = require('../mysqlConnection')

const getAcceptedReceivedBookings = async (userId) => {
    const [ result ] = await connection.query(
        'SELECT house_pictures.url AS housePicUrl, bookings.tenant_rating AS tenantRating, bookings.owner_rating AS ownerRating, bookings.id_house AS houseId, bookings.id AS bookingId, bookings.start_date AS startDate, bookings.end_date as endDate, houses.title AS title, users.id AS tenantId, users.first_name AS tenantName, users.last_name AS tenantLastName, users.picture as tenantPicture FROM bookings INNER JOIN houses ON houses.id = bookings.id_house INNER JOIN users ON bookings.id_tenant = users.id INNER JOIN house_pictures ON houses.id = house_pictures.id_house INNER JOIN (SELECT id_house, MIN(id) AS minId FROM house_pictures GROUP BY id_house) AS selection ON house_pictures.id_house = selection.id_house AND house_pictures.id = selection.minId WHERE id_owner = ? AND bookings.accepted IS ? ORDER BY startDate, bookingId ASC',
        [userId, true]
    )

    return result
}

module.exports = getAcceptedReceivedBookings