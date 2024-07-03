import { Router } from 'express'
import { FollowController } from '../controllers/followController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

export const createFollowRouters = ({ followModel }) => {
  const followRouter = Router()
  followRouter.use(authMiddleware)
  const followController = new FollowController({ followModel })
  followRouter.post('/', followController.follow)
  followRouter.delete('/', followController.unFollow)
  followRouter.get('/', followController.getFollows)
  return followRouter
}
