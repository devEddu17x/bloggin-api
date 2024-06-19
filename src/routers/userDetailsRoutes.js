import { Router } from 'express'
import { UserDetailsController } from '../controllers/userDetailsController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'

export const createUserDetailsRoutes = ({ userDetailsModel }) => {
  const userDetailsRouter = Router({ mergeParams: true })
  const userDetailsController = new UserDetailsController({ userDetailsModel })
  userDetailsRouter.get('/', validateIdExist, userDetailsController.getByUserId)
  return userDetailsRouter
}
