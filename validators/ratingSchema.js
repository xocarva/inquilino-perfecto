const Joi = require('joi')

const ratingValidator = Joi.object().keys({
    rating: Joi
        .number()
        .integer()
        .required()
        .max(5)
        .min(1)
        .messages({
            'number.max': '[rating] must be between 1 and 5',
            'number.min': '[rating] must be between 1 and 5'
        })
})

module.exports = ratingValidator