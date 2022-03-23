const { response } = require('express')
const { bookingsRepository, usersRepository, housesRepository } = require('../../repository')
const notifier = require('../notifier')

const cancelBooking = async (req, res) => {
    const userId = req.user.id
    const bookingId = Number(req.params.bookingId)

    let booking
    try {
        booking = await bookingsRepository.getBookingById(bookingId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (!booking || booking.accepted) {
        res.status(404)
        res.send({error:'This booking does not exist or already was confirmed'})
        return
    }

    const { houseId, tenantId, startDate, endDate } = booking

    let house
    try {
        house = await housesRepository.getHouseById(houseId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if(userId !== house.ownerId && userId !== tenantId) {
        res.status(403)
        res.send({error: 'User not allowed to cancel this booking'})
        return
    }

    try {
        await bookingsRepository.cancelBooking(bookingId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if (userId === tenantId) {
        let tenant
        try {
            tenant = await usersRepository.getUserById(tenantId)
        } catch (error) {
            res.status(500)
            res.send({error: error.message})
            return
        }
        try {
            const tenantEmail = tenant.email
            await notifier.sendTenantBookingCancelInfo({ tenantEmail, house, startDate, endDate })
        } catch (error) {
            res.status(400)
            res.send({error: error.message})
            return
        }
    }

    if (userId === house.ownerId) {
        let owner
        try {
            owner = await usersRepository.getUserById(house.ownerId)
        } catch (error) {
            res.status(500)
            res.send({error: error.message})
            return
        }

        try {
            const ownerEmail = owner.email
            await notifier.sendOwnerBookingCancelInfo({ ownerEmail, house, startDate, endDate })
        } catch (error) {
            res.status(550)
            res.send({error: error.message})
            return
        }
    }

    res.status(202)
    res.send({
        message: 'Booking canceled',
        id: bookingId
    })
}
module.exports = cancelBooking

