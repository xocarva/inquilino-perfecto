const { bookingsRepository } = require('../../repository')

const getPendingBookingsAmount = async (req, res) => {
    const userId = req.user.id

    try {
        const bookings = await bookingsRepository.getPendingReceivedBookings(userId)
        res.status(200)
        res.send({pendingBookings: bookings.length})

    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }
}

module.exports = getPendingBookingsAmount
