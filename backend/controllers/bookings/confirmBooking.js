const { bookingsRepository, usersRepository, housesRepository } = require('../../repository')
const notifier = require('../../controllers/notifier')

const confirmBooking = async (req, res) => {
    const userId = req.user.id
    const bookingId = Number(req.params.bookingId)

    let booking
    try {
        booking = await bookingsRepository.getBookingById(bookingId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (!booking || booking.accepted) {
        res.status(404)
        res.send({error: 'This booking does not exist or already was confirmed'})
        return
    }

    const { houseId, tenantId, startDate, endDate} = booking

    let house
    try {
        house = await housesRepository.getHouseById(houseId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if(userId !== house.ownerId) {
        res.status(403)
        res.send({error: 'User not allowed to confim this booking'})
        return
    }

    try {
        await bookingsRepository.confirmBooking(bookingId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    try {
        const tenant = await usersRepository.getUserById(tenantId)
        const tenantEmail = tenant.email
        await notifier.sendBookingConfirmation({ tenantEmail, house, startDate, endDate })
    } catch (error) {
        res.status(550)
        res.send({error: error.message})
        return
    }

    res.status(202)
    res.send({
        message: 'Booking confirmed',
        id: bookingId
    })
}
module.exports = confirmBooking

