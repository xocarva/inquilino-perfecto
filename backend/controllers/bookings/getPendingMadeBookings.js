const { bookingsRepository } = require('../../repository')

const getPendingMadeBookings = async (req, res) => {
    const userId = req.user.id

    let bookings
    try {
        bookings = await bookingsRepository.getPendingMadeBookings(userId)

    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    res.status(200)
    res.send(bookings)
}

module.exports = getPendingMadeBookings
