import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
import { validateUsernameOrEmail } from '../middlewares/loginMiddleware.js'
export const createAuthRoute = ({ userModel }) => {
  const authRouter = Router()
  const authController = new AuthController({ userModel })
  authRouter.post('/register', authController.register)
  authRouter.post('/login', validateUsernameOrEmail, authController.login)
  return authRouter
}
