import { Router } from 'express'
import { PostController } from '../controllers/postController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
export const createPostRoutes = ({ postModel }) => {
  const postRouter = Router()
  postRouter.use(authMiddleware)
  const postController = new PostController({ postModel })
  postRouter.post('/', postController.create)
  postRouter.get('/', postController.get)
  postRouter.get('/:id', validateIdExist, postController.getById)
  postRouter.patch('/:id', validateIdExist, postController.update)
  postRouter.delete('/:id', validateIdExist, postController.delete)
  return postRouter
}
