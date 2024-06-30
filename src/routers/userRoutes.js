import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()
  userRouter.use(authMiddleware)
  const userController = new UserController({ userModel })
  userRouter.get('/', userController.getByQuery)
  userRouter.get('/:id', validateIdExist, userController.getById)
  userRouter.delete('/:id', validateIdExist, userController.delete)
  userRouter.patch('/:id', validateIdExist, userController.update)
  return userRouter
}
