const { bookingsRepository, ratingsRepository } = require('../../repository')
const { ratingValidator } = require('./../../validators')

const rate = async (req, res) => {
    const { bookingId } = req.params
    const ratingUserId = req.user.id
    const rating = Number(req.body.rating)

    try {
        await ratingValidator.validateAsync({ rating })
    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    let bookingRatingData
    try {
        bookingRatingData = await bookingsRepository.getBookingRatingData(bookingId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (!bookingRatingData) {
        res.status(500)
        res.send({error: 'Booking data could not be retrieved'})
        return
    }

    let ratingData
    try {
        const { ratedUserRole, ratedUserId } = await ratingsRepository.getRatedUserData({ ...bookingRatingData, ratingUserId })
        ratingData = { ...bookingRatingData, bookingId, ratedUserRole, ratedUserId, rating }
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (!ratingData.accepted) {
        res.status(409)
        res.send({error: 'Can not rate a pending or canceled booking'})
        return
    }

    if (ratingData.bookingEndDate >= new Date()) {
        res.status(409)
        res.send({error: 'Can not rate an open booking'})
        return
    }

    if ((ratingData.ratedUserRole === 'tenant' && ratingData.ownerRating) || (ratingData.ratedUserRole === 'owner' && ratingData.tenantRating)) {
        res.status(403)
        res.send({error: 'Booking already rated by this user'})
        return
    }

    let ratingId
    try {
        ratingId = await ratingsRepository.rateBooking(ratingData)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    res.status(202)
    res.send({
        message: 'Rating saved',
        id: ratingId
    })
}

module.exports = rate
