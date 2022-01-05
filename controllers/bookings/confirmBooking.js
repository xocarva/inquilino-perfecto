const { bookingsRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')


//   TO DO
// Existe reserva?
// Esta reserva ya está confirmada?






const confirmBooking = async (req, res) => {
    const bookingId = Number(req.params.bookingId)

    if (!bookingId) {
        res.status(400)
        res.end('this booking does not exist')
        return
    }
    try {
        const bookingExist = await bookingsRepository.getBookingById(bookingId)
    } catch (error) {
        res.status(400)
        res.end('this booking does not exist')
        return
    }



    res.status(200)
    res.send('Email confirm')
}
module.exports = confirmBooking
