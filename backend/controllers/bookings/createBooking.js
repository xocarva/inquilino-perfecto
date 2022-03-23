const { bookingsRepository, usersRepository, housesRepository } = require('../../repository')
const { bookingValidator } = require('../../validators')
const notifier = require('../../controllers/notifier')

const createBooking = async (req, res) => {
    const { startDate, endDate } = req.body
    const tenantId = Number(req.user.id)
    const { houseId } =  req.params

    try {
        await bookingValidator.validateAsync({  startDate, endDate })
    } catch (error) {
        res.status(400)
        res.send({error: error.message})
        return
    }

    const actualDate = new Date()
    if (startDate >= endDate || Date.parse(startDate) < actualDate) {
        res.status(400)
        res.send({error: 'Invalid date'})
        return
    }

    let available
    try {
        const bookings = await bookingsRepository.getBookingsByHouseId(houseId)
        available = await bookingsRepository.isHouseAvailable({ bookings, startDate, endDate })
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if(!available){
        res.status(409)
        res.send({error: 'House not available for booking in this dates'})
        return
    }

    let house
    try {
        house = await housesRepository.getHouseById(houseId)
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    if(tenantId === house.ownerId) {
        res.status(460)
        res.send({error: 'You can not rent your own house'})
        return
    }

    let booking
    try {
        booking = await bookingsRepository.saveBooking({  houseId, tenantId, startDate, endDate })
    } catch (error) {
        res.status(500)
        res.send({error: error.message})
        return
    }

    try {
        const user = await usersRepository.getUserById(tenantId)
        const tenantEmail = user.email
        await notifier.sendMadeBookingInfo({ tenantEmail, house, startDate, endDate })
    } catch (error) {
        res.status(550)
        res.send({error: error.message})
        return
    }

    try {
        const owner = await usersRepository.getUserById(house.ownerId)
        const ownerEmail = owner.email
        await notifier.sendReceivedBookingInfo({ ownerEmail, house, startDate, endDate })
    } catch (error) {
        res.status(550)
        res.send({error: error.message})
        return
    }
    res.status(201)
    res.send({
        message: 'Booking saved, waiting for owner confirmation',
        booking
    })
}
module.exports = createBooking

