const connection = require('../mysqlConnection')

const isHouseAvailable = async (bookingdData) => {
    const { bookings, startDate, endDate } = bookingdData

    if(!!!bookings) return true

    let isAvailable = true
    bookings.forEach(booking => {
        if(Date.parse(startDate) <= Date.parse(booking.endDate) && Date.parse(endDate) >= Date.parse(booking.startDate)){
            isAvailable = false
        }

    })

    return isAvailable
}

module.exports = isHouseAvailable

