const joi = require('joi')

const houseSchema = joi.object({

    title: joi
        .string()
        .max(255)
        .min(2)
        .required(),

        price: joi
        .number()
        .min(1)
        .required(),

        rooms: joi
        .number()
        .min(1)
        .required(),

        description: joi
        .string()
        .max(255)
        .min(10)
        .required(),

        city: joi
        .string()
        .max(100)
        .min(2)
        .required(),
})

module.exports = houseSchema