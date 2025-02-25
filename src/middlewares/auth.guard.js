import jwt from "jsonwebtoken"

import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customErrorHandler.js";
import User from "../models/user.model.js";

const authGuard = asyncErrorHandler(async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw new CustomError("Authentication required", 401)

    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw new CustomError(err.message, 401)
        return decoded
    })


    const user = await User.findById(decoded.sub)

    if (!user) throw new CustomError("User account not found", 401);
    if (user.passwordResetAt > new Date(decoded.iat * 1000)) throw new CustomError("Your password was reset recently, Please login again", 401)

    req.userID = user._id
    next()

})

export default authGuard