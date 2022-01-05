const { bookingsRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')


//   TO DO
// Existe reserva? OK
// Esta reserva ya está confirmada? OK
// Confirmar que eres el casero por el token
// Confirmar que eres el casero OK
// Cambia estado accepted a true
//  manda mail tenant
//  manda mail owner






const confirmBooking = async (req, res) => {
    const bookingId = Number(req.params.bookingId)
    const ownerId = req.body.ownerId

    if (!bookingId) {
        res.status(400)
        res.end('this booking does not exist')
        return
    }
    let bookingExist
    try {
        bookingExist = await bookingsRepository.getBookingById(bookingId)
        if(!bookingExist) throw new Error ('this booking does not exist or it is confirmed')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    const { id_house } = bookingExist
    try {
        const areYouOwner = await bookingsRepository.checkAreYouOwner({ id_house })
        if(areYouOwner != ownerId) throw new Error ('You are not the owner of this property')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        await bookingsRepository.changeStatusConfirmBooking(bookingId)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }



    res.status(200)
    res.send('Email confirm')
}
module.exports = confirmBooking
