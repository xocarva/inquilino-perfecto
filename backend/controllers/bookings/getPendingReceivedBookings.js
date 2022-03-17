const { ratingsRepository, bookingsRepository } = require('../../repository')

const getPendingReceivedBookings = async (req, res) => {
    const userId = req.user.id
    const role = 'tenant'

    let bookingsWithRatings
    try {
        const bookings = await bookingsRepository.getPendingReceivedBookings(userId)

        bookingsWithRatings = await Promise.all(bookings.map(async booking => {
            const ratings = await ratingsRepository.getRatings({ ...booking, id: booking.tenantId, role })
            const ratingAvg = Math.round(ratings.reduce((acc, val) => acc + (val.rating / ratings.length), 0))
            return { ...booking, ratingAvg }
        }))

    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    res.status(200)
    res.send(bookingsWithRatings)
}

module.exports = getPendingReceivedBookings
