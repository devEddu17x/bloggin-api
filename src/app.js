import express, { json } from 'express'
import { createAuthRoute } from './routers/authRoutes.js'
import { createUserRouter } from './routers/userRoutes.js'
import cookieParser from 'cookie-parser'

export const createApp = ({ userModel, postModel, commentModel }) => {
  const app = express()
  app.use(json())
  app.use(cookieParser())
  app.disable('x-powered-by')
  app.use('/auth', createAuthRoute({ userModel }))
  app.use('/users', createUserRouter({ userModel }))
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
