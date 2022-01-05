const { bookingsRepository } = require('../../repository')
const { bookingValidator } = require('../../validators')
const notifier = require('../../controllers/notifier')


//   TO DO
//  Cambiar   ---->   El tenantId no viene el body, hay que cogerlo del token de user log, ¿Cambiar funciones de getEmailTenant?




const createBooking = async (req, res) => {
    const { tenantId, startDate, endDate } = req.body
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
        const bookings = await bookingsRepository.getBookingsByHouseId(houseId)
        const available = await bookingsRepository.isHouseAvailable({ bookings, startDate, endDate })
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
        const emailTenant = await bookingsRepository.getEmailTenant(tenantId)
        await notifier.sendBookingOfferPenddingTenant({ emailTenant, startDate, endDate })
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
    res.send('Email sent successfully')
}
module.exports = createBooking