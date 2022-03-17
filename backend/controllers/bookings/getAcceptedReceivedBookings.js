const { ratingsRepository, bookingsRepository, usersRepository } = require('../../repository')

const getAcceptedReceivedBookings = async (req, res) => {
    const userId = req.user.id
    const role = 'tenant'
    let bookingsWithRatings

    try {
        const bookings = await bookingsRepository.getAcceptedReceivedBookings(userId)
        bookingsWithRatings = await Promise.all(bookings.map(async booking => {
            const ratings = await ratingsRepository.getRatings({ ...booking, id: booking.tenantId, role })
            const tenant = await usersRepository.getUserById(booking.tenantId)
            const ratingAvg = Math.round(ratings.reduce((acc, val) => acc + (val.rating/ratings.length), 0))
            return { ...booking, tenantName: tenant.firstName, tenantPicture: tenant.picture, ratingAvg }
        }))

    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    res.status(202)
    res.send(bookingsWithRatings)
}

module.exports = getAcceptedReceivedBookings

