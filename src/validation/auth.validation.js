import Joi from "joi"
import ValidationHelper from "../utils/dataValidationHelper.js"

const signup = new ValidationHelper({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const login = new ValidationHelper({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const resetPassword = new ValidationHelper({
    email: Joi.string().email().required()
})

const verifyResetPasswordToken = new ValidationHelper({
    newPassword: Joi.string().min(6).required()
})

export default { signup, login, resetPassword, verifyResetPasswordToken }