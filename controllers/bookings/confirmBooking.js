const { bookingsRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')










const confirmBooking = async (req, res) => {
    const bookingId = Number(req.params.bookingId)
    const ownerId = req.body.id

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
    const { id_house, id_tenant, start_date, end_date} = bookingExist
    try {
        await bookingsRepository.changeStatusConfirmBooking(bookingId)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const emailTenant = await bookingsRepository.getEmailTenant(id_tenant)
        await notifier.sendConfirmBookingTenant({ emailTenant, id_house, start_date, end_date })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const emailOwner = await bookingsRepository.getEmailOwner(id_house)
        await notifier.sendConfirmBookingOwner({ emailOwner, id_house, start_date, end_date })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }


    res.status(200)
    res.send('Email confirm')
}
module.exports = confirmBooking
