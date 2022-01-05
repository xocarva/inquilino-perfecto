const { bookingsRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')


//   TO DO
// Existe reserva? OK
// Esta reserva ya está confirmada? OK
// Confirmar que eres el casero por el token
// Confirmar que eres el casero






const confirmBooking = async (req, res) => {
    const bookingId = Number(req.params.bookingId)
    const ownerId = req.body.ownerId
    console.log(ownerId)

    if (!bookingId) {
        res.status(400)
        res.end('this booking does not exist')
        return
    }
    try {
        const bookingExist = await bookingsRepository.getBookingById(bookingId)
        if(!bookingExist) throw new Error ('this booking does not exist or it is confirmed')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    



    res.status(200)
    res.send('Email confirm')
}
module.exports = confirmBooking
