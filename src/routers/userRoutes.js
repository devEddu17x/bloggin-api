import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()
  const userController = new UserController({ userModel })
  userRouter.get('/', userController.getByQuery) // get an user by name or lastname or both
  userRouter.get('/:id', validateIdExist, userController.getById) // get an user by id
  userRouter.delete('/:id', validateIdExist, userController.delete) // delete an user by id
  return userRouter
}

// userRouter.put('/details/:id') // update userDetails by id
