const { bookingsRepository, ratingsRepository, usersRepository } = require('../../repository')
const { ratingValidator } = require('./../../validators')

const rate = async (req, res) => {
    const { bookingId } = req.params
    const ratingUserId = req.user.id
    const rating = Number(req.body.rating)

    // TO-DO
    // separate errors with accurate error status

    try {
        await ratingValidator.validateAsync({ rating })

        const bookingRatingData = await bookingsRepository.getBookingRatingData(bookingId)
        const { ratedUserRole, ratedUserId } = await ratingsRepository.getRatedUserData({ ...bookingRatingData, ratingUserId })
        const ratingData = { ...bookingRatingData, bookingId, ratedUserRole, ratedUserId, rating }

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



