const joi = require('joi')

const querySchema = joi.object({
        price: joi
        .number()
        .min(1),
        rooms: joi
        .number()
        .min(1),
        city: joi
        .string()
        .min(2),
        startDate: joi
        .date()
        .required(),
        endDate: joi
        .date()
        .required()
})

module.exports = querySchema
