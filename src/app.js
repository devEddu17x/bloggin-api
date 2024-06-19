import express, { json } from 'express'
import { createAuthRoute } from './routers/authRoutes.js'
import { createUserRouter } from './routers/userRoutes.js'
import cookieParser from 'cookie-parser'
import { createUserDetailsRoutes } from './routers/userDetailsRoutes.js'

export const createApp = ({ userModel, userDetailsModel, postModel, commentModel }) => {
  const app = express()
  app.use(json())
  app.use(cookieParser())
  app.disable('x-powered-by')
  app.use('/auth', createAuthRoute({ userModel }))
  app.use('/users/:userId/details', createUserDetailsRoutes({ userDetailsModel }))
  app.use('/users', createUserRouter({ userModel }))
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
  })
}
