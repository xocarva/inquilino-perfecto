const { bookingsRepository } = require('../../repository')
const { bookingValidator } = require('../../validators')
const notifier = require('../../controllers/notifier')


//   TO DO
//  Cambiar   ---->   El tenantId no viene el body, hay que cogerlo del token de user log, ¿Cambiar funciones de getEmailTenant?




const confirmBooking = async (req, res) => {
    console.log('funciona')
}
module.exports = confirmBooking