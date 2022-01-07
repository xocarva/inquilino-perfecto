const connection = require('../mysqlConnection')

const isHouseAvailable = async (bookingdData) => {

    const { bookings, startDate, endDate } = bookingdData
    if(!bookings) return true

    for(let i = 0; i < bookings.length; i ++) {
        if (Date.parse(startDate) >= Date.parse(bookings[i].startDate) && Date.parse(startDate) < Date.parse(bookings[i].endDate) || Date.parse(endDate) >= Date.parse(bookings[i].startDate) && Date.parse(endDate) <= Date.parse(bookings[i].endDate)) {

            return false
        }
    }
    return true
}



module.exports = isHouseAvailable

