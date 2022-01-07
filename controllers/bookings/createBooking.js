const { bookingsRepository, usersRepository } = require('../../repository')
const { bookingValidator } = require('../../validators')
const notifier = require('../../controllers/notifier')

const createBooking = async (req, res) => {
    const { startDate, endDate } = req.body
    const tenantId = Number(req.user.id)
    const { houseId } =  req.params

    const actualDate = new Date()
    if (startDate >= endDate) {
        res.status(400)
        res.end('Invalid date')
        return
    }
    if (Date.parse(startDate) < actualDate) {
        res.status(400)
        res.end('Invalid date')
        return
    }

    try {
        const test = []
        const bookings = await bookingsRepository.getBookingsByHouseId(houseId)
        const available = await bookingsRepository.isHouseAvailable(test)
        if(!available) throw new Error ('House not available for booking in this dates')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const isTenantAndOwner = await bookingsRepository.checkTenantIdAndOwnerId({ tenantId, houseId })
        if(isTenantAndOwner) throw new Error ('You can not rent your own house')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        await bookingValidator.validateAsync({  houseId, tenantId, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        await bookingsRepository.saveBooking({  houseId, tenantId, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const user = await usersRepository.getUserById(tenantId)
        const email = user.email
        await notifier.sendBookingOfferPenddingTenant({ email, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    try {
        const emailOwner = await bookingsRepository.getEmailOwner(houseId)
        await notifier.sendBookingOfferPenddingOwner({ emailOwner, startDate, endDate, tenantId })
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    res.status(200)
    res.send('Your booking is pending of confirm')
}
module.exports = createBooking
