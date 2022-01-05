const connection = require('../mysqlConnection')

const isHouseAvailable = async (bookingdData) => {

    const { bookings, startDate, endDate } = bookingdData

    for(let i = 0; i < bookings.length; i ++) {
        if (Date.parse(startDate) >= Date.parse(bookings[i].start_date) && Date.parse(startDate) < Date.parse(bookings[i].end_date) || Date.parse(endDate) >= Date.parse(bookings[i].start_date) && Date.parse(endDate) <= Date.parse(bookings[i].end_date)) {

            return false
        }
    }
    return true
}



module.exports = isHouseAvailable

