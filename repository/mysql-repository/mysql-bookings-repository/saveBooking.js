const connection = require('../mysqlConnection')

const saveBooking = async (infoBooking) => {
    const { houseId, tenantId, startDate, endDate } = infoBooking

    const [{ insertId }] = await connection.query("INSERT INTO bookings (id_house, id_tenant, start_date, end_date) VALUES (?, ?, ?, ?)",
        [ houseId, tenantId, startDate, endDate ])
    return { ...infoBooking, id: insertId }
}

module.exports = saveBooking

