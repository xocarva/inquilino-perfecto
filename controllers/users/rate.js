const { bookingsRepository, usersRepository } = require('../../repository')

const rate = async (req, res) => {
    const { bookingId } = req.params
    const { rating, ratingUserId } = req.body
    // const ratingUserId = 'fromAuth'

    let ratingData
    try {
        ratingData  = await bookingsRepository.getRatingData(bookingId)

        if (ratingData.accepted !== true) throw new Error('Can not rate a canceled booking')
        if (ratingData.bookingEndDate <= new Date()) throw new Error('Can not rate an open booking')
        if (ratingData.ratingUserId !== ownerId && ratingUserId !== tenantId ) throw new Error('User not allowed to rate this booking')

        await usersRepository.rateBooking({ ...ratingData, rating, bookingId, ratingUserId })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }


    // try {


    // } catch (error) {
    //     res.status(400)
    //     res.end(error.message)
    //     return
    // }



    res.status(200)
    res.send(ratingData)
}

module.exports = rate



