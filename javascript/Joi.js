const Joi = require('joi');

const registerValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().min(6).max(30),
        password: Joi.string().min(6).max(40),
        date: Joi.date()
    })

    return  userSchema.validate(data);
}

const loginValidation = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().min(6).max(30),
        password: Joi.string().min(6).max(40),
    })
    return userSchema.validate(data);
}

const nameValidation = (data) => {
    const userSchema = Joi.object({
        name: Joi.string().required()
    })
    return userSchema.validate(data);
}

const emailValidation = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().min(6).max(30)
    })
    return userSchema.validate(data);
}

const passwordValidation = (data) => {
    const userSchema = Joi.object({
        currentpassword: Joi.string().min(6).max(40),
        password: Joi.string().min(6).max(40)
    })
    return userSchema.validate(data);
}

const descriptionValidation = (data) => {
    const userSchema = Joi.object({
        description: Joi.string().min(3).max(70)
    })
    return userSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.nameValidation = nameValidation;
module.exports.emailValidation = emailValidation;
module.exports.passwordValidation = passwordValidation;
module.exports.descriptionValidation = descriptionValidation;