import Task from "../models/task.model.js"
import CustomError from "../utils/customErrorHandler.js"

const create = async (validatedData, userID) => {

    const newTask = await Task.create({ ...validatedData, user: userID })
    return newTask
}

const list = async (userID) => {
    const list = await Task.find({
        user: userID
    })

    return list
}

const singleTask = async (taskID, userID) => {
    const singleTask = await Task.findOne({
        _id: taskID,
        user: userID
    })

    if (!singleTask) throw new CustomError("No task found", 404)
    return singleTask
}

const updateTask = async (validatedData, taskID, userID) => {
    const task = await Task.findOne({ _id: taskID, user: userID });

    if (!task) throw new CustomError("Task not found", 404);

    const updateFields = {};
    if (validatedData.title) updateFields.title = validatedData.title;
    if (validatedData.description) updateFields.description = validatedData.description;

    const updatedTask = await Task.findOneAndUpdate({ _id: task._id }, { $set: updateFields }, { new: true });
    return updatedTask
};

const deleteTask = async (taskID, userID) => {
    const task = await Task.findOne({ _id: taskID, user: userID });
    if (!task) throw new CustomError("Task not found", 404);
    await Task.deleteOne(task._id)

}

export default {
    create, list, singleTask, updateTask, deleteTask
}