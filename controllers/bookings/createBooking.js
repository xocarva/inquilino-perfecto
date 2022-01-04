const { bookingsRepository } = require('../../repository')
const { bookingValidator } = require('../../validators')
const notifier = require('../../controllers/notifier')

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

    // TO-DO
    // validaciones (al final si quieres)  Validar que no intentas alquilar tu propia casa ----- me da error aunque funciona
    // enviar email Me da error



    try {
        const bookings = await bookingsRepository.getBookingsByHouseId(houseId)
        const available = await bookingsRepository.isHouseAvailable({ bookings, startDate, endDate })
        if(!available) throw new Error ('House not available for booking in this dates')
    } catch (error) {
        res.status(400)
        res.end(error.message)
        return
    }
    // try {
    //     const isTenantAndOwner = await bookingsRepository.checkTenantIdAndOwnerId({ tenantId, houseId })
    //     if(isTenantAndOwner) throw new Error ('You can not rent your house')
    // } catch (error) {
    //     res.status(400)
    //     res.end(error.message)
    // }
    try {
        await bookingValidator.validateAsync({  houseId, tenantId, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
    }
    try {
        await bookingsRepository.saveBooking({  houseId, tenantId, startDate, endDate })
    } catch (error) {
        res.status(400)
        res.end(error.message)
    }
    // try {
    //     const emailTenant = await bookingsRepository.getEmailTenant(tenantId)
    //     console.log(emailTenant)
    //     await notifier.sendBookingOfferPenddingTenant({ emailTenant, startDate, endDate })
    // } catch (error) {
    //     res.status(400)
    //     res.end(error.message)
    // }
    // try {
    //     const emailOwner = await bookingsRepository.getEmailOwner(houseId)
    //     console.log(emailOwner)
    //     await notifier.sendBookingOfferPenddingOwner({ emailOwner, startDate, endDate, tenantId })
    // } catch (error) {
    //     res.status(400)
    //     res.end(error.message)
    // }
    

    res.status(200)
    res.send('Send mail Ok')
}
module.exports = createBooking