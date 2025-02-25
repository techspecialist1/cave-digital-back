import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetAt: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null }

}, { timestamps: true, versionKey: false })

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.passwordResetAt = new Date();
    }
    next();
});

const User = model('User', UserSchema)

export default User