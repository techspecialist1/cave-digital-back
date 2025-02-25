import Joi from "joi";
import ValidationHelper from "../utils/dataValidationHelper.js";

const createTask = new ValidationHelper({
    title: Joi.string().min(3).trim().required(),
    description: Joi.string().min(3).trim().required()
})

const updateTask = new ValidationHelper({
    title: Joi.string().min(3).trim().optional(),
    description: Joi.string().min(3).trim().optional()
})

export default { createTask, updateTask }