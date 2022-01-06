const { usersRepository, bookingsRepository, housesRepository } = require('../../repository')

const getPendingReceivedBookings = async (req, res) => {
    const userId = req.user.id

    let pendingReceivedBookings
    try {
        pendingReceivedBookings = await bookingsRepository.getPendingReceivedBookings(userId)


    } catch (error) {
        res.status(500)
        res.end(error.message)
        return
    }

    res.status(200)
    res.send(pendingReceivedBookings)

    //TO-DO
    // Get tenant rating


}

module.exports = getPendingReceivedBookings