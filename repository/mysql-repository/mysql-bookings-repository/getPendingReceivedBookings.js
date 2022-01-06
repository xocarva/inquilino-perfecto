const connection = require('../mysqlConnection')

const getPendingReceivedBookings = async (userId) => {

    const [ result ] = await connection.query(
        'SELECT bookings.id as bookingId, bookings.start_date as startDate, bookings.end_date as endDate, houses.title as title, users.first_name as firstName, users.last_name as lastName, bookings.id_tenant tenantId FROM bookings JOIN houses ON houses.id = bookings.id_house INNER JOIN users ON bookings.id_tenant = users.id WHERE id_owner = ? AND bookings.start_date > ?',
        [userId, new Date ()]
    )
    console.log(result)


}

module.exports = getPendingReceivedBookings