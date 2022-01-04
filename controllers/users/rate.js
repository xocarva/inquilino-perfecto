const { bookingsRepository, usersRepository, ratingsRepository } = require('../../repository')

const rate = async (req, res) => {
    const { bookingId } = req.params
    const { rating } = req.body
    const ratingUserId = Number(req.body.ratingUserId)
    // const ratingUserId = 'fromAuth'

    try {
        const bookingRatingData = await bookingsRepository.getBookingRatingData(bookingId)
        const { ratedUserRole, ratedUserId } = await ratingsRepository.getRatedUserData({ ...bookingRatingData, ratingUserId })
        const ratingData = { ...bookingRatingData, bookingId, ratedUserRole, ratedUserId, rating }

        // TO-DO
        // Create validation schema for ratings
        // Accurate error status

        if (!ratingData.accepted) throw new Error('Can not rate a pending or canceled booking')
        if (ratingData.bookingEndDate >= new Date()) throw new Error('Can not rate an open booking')
        if (await ratingsRepository.ratingExists(ratingData)) throw new Error('Booking already rated by this user')

        await usersRepository.rateBooking(ratingData)
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send('Rating saved')
}

module.exports = rate



