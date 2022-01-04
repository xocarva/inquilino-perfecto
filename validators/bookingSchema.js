const Joi = require('joi')

const bookingValidator = Joi.object().keys({
    houseId: Joi
        .number()
        .required(),
        tenantId: Joi
        .number()
        .required(),
        startDate: Joi
        .date()
        .required(),
        endDate: Joi
        .date()
        .required()

})

module.exports = bookingValidator