import taskService from "../services/task.service.js";
import apiResHandler from "../utils/apiResponseHandler.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import taskValidation from "../validation/task.validation.js";

const create = asyncErrorHandler(async (req, res) => {
    const validatedData = taskValidation.createTask.validate(req.body)

    const newTask = await taskService.create(validatedData, req.userID)
    res.status(201).json(apiResHandler("New task has been created", newTask))
})

const list = asyncErrorHandler(async (req, res) => {
    const tasksList = await taskService.list(req.userID)
    res.status(200).json(apiResHandler("Task list has been fetched", tasksList))
})

const singleTask = asyncErrorHandler(async (req, res) => {
    const singleTaskData = await taskService.singleTask(req.params.id, req.userID)
    res.status(200).json(apiResHandler("Task has been fetched", singleTaskData))
})

const updateTask = asyncErrorHandler(async (req, res) => {
    const validatedData = taskValidation.updateTask.validate(req.body)

    const updatedTask = await taskService.updateTask(validatedData, req.params.id, req.userID)
    res.status(200).json(apiResHandler("Task has been updated", updatedTask))
})

const deleteTask = asyncErrorHandler(async (req, res) => {
    await taskService.deleteTask(req.params.id, req.userID)
    res.status(204).json()
})

export default {
    create, list, singleTask, updateTask, deleteTask
}