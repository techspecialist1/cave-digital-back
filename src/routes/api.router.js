import { Router } from "express"
import authController from "../controllers/auth.controller.js"
import taskController from "../controllers/task.controller.js"
import authGuard from "../middlewares/auth.guard.js"

const apiRouter = Router()

// Auth routes
apiRouter.route('/auth/signup').post(authController.signup)
apiRouter.route('/auth/login').post(authController.login)
apiRouter.route('/auth/reset').post(authController.resetPassword)
apiRouter.route('/auth/verify-reset').post(authController.verifyResetPasswordToken)


// Tasks routes
apiRouter.route('/tasks')
    .post(authGuard, taskController.create)
    .get(authGuard, taskController.list)
apiRouter.route('/tasks/:id')
    .get(authGuard, taskController.singleTask)
    .put(authGuard, taskController.updateTask)
    .delete(authGuard, taskController.deleteTask)


export default apiRouter