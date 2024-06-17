import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
export const createAuthRoute = ({ userModel }) => {
  const authRouter = Router()
  const authController = new AuthController({ userModel })
  authRouter.post('/register', authController.register)
  authRouter.post('/login', authController.login)
  return authRouter
}
