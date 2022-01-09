const Joi = require('joi')

const bookingValidator = Joi.object().keys({
    startDate: Joi
        .date()
        .required(),
    endDate: Joi
        .date()
        .required()

})

module.exports = bookingValidator
