const Joi = require('joi')

const userValidator = Joi.object().keys({
    firstName: Joi
        .string()
        .required()
        .max(80)
        .min(2)
        .messages({
            'string.empty': '[first_name] is required',
            'any.required': '[first_name] is required',
            'string.max': '[first_name] must be between 2 and 50 characters',
            'string.min': '[first_name] must be between 2 and 50 characters'
        }),
        lastName: Joi
        .string()
        .required()
        .max(80)
        .min(2)
        .messages({
            'string.empty': '[last_name] is required',
            'any.required': '[last_name] is required',
            'string.max': '[last_name] must be between 2 and 50 characters',
            'string.min': '[last_name] must be between 2 and 50 characters'
        }),
        email: Joi
        .string()
        .required()
        .email()
        .messages({
            'string.empty': '[email] is required',
            'any.required': '[email] is required',
            'string.email': '[email] must be a valid email'
        }),
        bio: Joi
        .string()
        .required()
        .max(200)
        .min(10)
        .messages({
            'string.empty': '[bio] is required',
            'any.required': '[bio] is required',
            'string.max': '[bio] must be between 10 and 200 characters',
            'string.min': '[bio] must be between 10 and 200 characters'
        }),
        password: Joi
        .string()
        .required()
        .max(50)
        .min(5)
        .messages({
            'string.empty': '[password] is required',
            'any.required': '[password] is required',
            'string.max': '[password] must be between 5 and 50 characters',
            'string.min': '[password] must be between 5 and 50 characters'
        })

})

module.exports = userValidator
