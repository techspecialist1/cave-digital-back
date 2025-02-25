import authService from "../services/auth.service.js";
import apiResHandler from "../utils/apiResponseHandler.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import authValidation from "../validation/auth.validation.js";

const signup = asyncErrorHandler(async (req, res) => {
    const validatedData = authValidation.signup.validate(req.body)

    const newUser = await authService.signup(validatedData)

    res.status(201).json(apiResHandler("Signup successfull", newUser))
})

const login = asyncErrorHandler(async (req, res) => {
    const validatedData = authValidation.login.validate(req.body)

    const user = await authService.login(validatedData)

    res.status(200).json(apiResHandler("Login Successfull", user))
})

const resetPassword = asyncErrorHandler(async (req, res) => {
    const { email } = authValidation.resetPassword.validate(req.body)

    const resetToken = await authService.resetPassword(email)
    res.status(200).json(apiResHandler("Password reset token sent", resetToken))
})

const verifyResetPasswordToken = asyncErrorHandler(async (req, res) => {
    const { newPassword } = authValidation.verifyResetPasswordToken.validate(req.body)

    await authService.verifyResetPasswordToken(req.query.token, newPassword)
    res.status(200).json(apiResHandler("Password has been reset successfully"))
})

export default {
    signup, login, resetPassword, verifyResetPasswordToken
}