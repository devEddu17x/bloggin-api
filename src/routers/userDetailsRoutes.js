import { Router } from 'express'
import { UserDetailsController } from '../controllers/userDetailsController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const createUserDetailsRoutes = ({ userDetailsModel }) => {
  const userDetailsRouter = Router({ mergeParams: true })
  userDetailsRouter.use(authMiddleware)
  const userDetailsController = new UserDetailsController({ userDetailsModel })
  userDetailsRouter.get('/', validateIdExist, userDetailsController.getByUserId)
  userDetailsRouter.patch('/', validateIdExist, userDetailsController.updateByUserId)
  return userDetailsRouter
}
