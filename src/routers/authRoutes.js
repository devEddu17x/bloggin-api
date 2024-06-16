import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'
const authRouter = Router()
export const createAuthRoute = ({ userModel }) => {
  const authController = new AuthController({ userMovel: userModel })
  authRouter.post('/register', authController.register)
  authRouter.post('/login', authController.login)
}
