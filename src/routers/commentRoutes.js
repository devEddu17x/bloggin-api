import { Router } from 'express'
import { CommentController } from '../controllers/commentController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
export const createCommentRoutes = ({ commentModel }) => {
  const commentRouter = Router({ mergeParams: true })
  commentRouter.use(authMiddleware)
  const commentController = new CommentController({ commentModel })
  commentRouter.post('/', commentController.create)
  commentRouter.get('/', commentController.get)
  commentRouter.patch('/:commentId', validateIdExist, commentController.update)
  commentRouter.delete('/:commentId', validateIdExist, commentController.delete)
  return commentRouter
}
