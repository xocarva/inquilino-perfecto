const { bookingsRepository, usersRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')

const confirmBooking = async (req, res) => {
    const bookingId = Number(req.params.bookingId)

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
    const { houseId, tenantId, startDate, endDate} = bookingExist
    console.log(bookingExist)
    try {
        await bookingsRepository.changeStatusConfirmBooking(bookingId)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const user = await usersRepository.getUserById(tenantId)
        console.log(tenantId)
        const email = user.email
        console.log(email)
        await notifier.sendBookingOfferPendingTenant({ email, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const emailOwner = await bookingsRepository.getEmailOwner(houseId)
        console.log(emailOwner)
        await notifier.sendConfirmBookingOwner({ emailOwner, houseId, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }


    res.status(200)
    res.send('Email confirm')
}
module.exports = confirmBooking
