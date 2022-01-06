const { usersRepository, bookingsRepository, housesRepository } = require('../../repository')

const getPendingReceivedBookings = async (req, res) => {
    const userId = req.user.id
    try {
        const pendingReceivedBookings = bookingsRepository.getPendingReceivedBookings(userId)





        // return {
        //     id: booking.id,
        //     title: house.title,
        //     startDate: booking.start_date,
        //     endDate: booking.end_date,
        //     accepted: booking.accepted,
        //     picture: house.picture.url
        // }

        // pendingReceivedBookings = receivedBookings.filter(booking => booking.accepted === null)


        // pendingReceivedBookings = receivedBookings.filter(booking => booking.startDate > new Date())




        // bookings = await bookings.map(booking => {
        //     const tenantName = await usersRepository.getUserById(booking.tenantId)
        //     const tenantRating = await usersRepository.getRatingAsTenant(booking.tenantId)
        //     const picture = await housesRepository.getPicture(booking.houseId)
        //     return { ...booking, tenantName, tenantRating, picture}
        // })


    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    //TO-DO
    // 1. get user id OK
    // 2. get pending received bookings with startDate before today:
        // picture -> get picture by houseId
        // tenant name -> get user by id
        // tenant rating -> get user rating as tenant

    // 3. return array with pending received bookings
    res.status(200)
    res.send('ok')

}

module.exports = getPendingReceivedBookings