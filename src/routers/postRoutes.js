import { Router } from 'express'
import { PostController } from '../controllers/postController.js'
import { validateIdExist } from '../middlewares/validateUUIDExists.js'
export const createPostRoutes = ({ postModel }) => {
  const postRouter = Router()
  const postController = new PostController({ postModel })
  postRouter.post('/', postController.create)
  postRouter.patch('/:id', validateIdExist, postController.update)
  postRouter.delete('/:id', validateIdExist, postController.delete)
  return postRouter
}
