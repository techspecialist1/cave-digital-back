import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import CustomError from "../utils/customErrorHandler.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const signup = async (validatedData) => {
    const { name, email, password } = validatedData

    let newUser = await User.create({
        name, email,
        password: await bcrypt.hash(password, 10)
    })

    if (!newUser) throw new CustomError("Unable to create a new user", 400)

    return {
        ...newUser.toObject(),
        password: undefined
    }
}

const login = async (validatedData) => {
    const { email, password } = validatedData

    const user = await User.findOne({
        email
    }).select("+password")

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new CustomError("Invalid user credentials", 400)
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })

    return {
        userData: { ...user.toObject(), password: undefined },
        accessToken: token
    }
}

const resetPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) throw new CustomError("Email does not exist", 404);

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await user.save();

    return { resetToken };
};

const verifyResetPasswordToken = async (resetToken, newPassword) => {
    const user = await User.findOne({ resetPasswordToken: resetToken });

    if (!user) throw new CustomError("Invalid password reset token received", 400);

    if (user.resetPasswordExpires < new Date()) {
        throw new CustomError("Password reset token has expired", 400);
    }

    user.password = await bcrypt.hash(newPassword, 10)
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()
};

export default { signup, login, resetPassword, verifyResetPasswordToken }