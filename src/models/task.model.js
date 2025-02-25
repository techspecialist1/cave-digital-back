import { Schema, Types, model } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, versionKey: false })



const Task = model('Task', TaskSchema)

export default Task