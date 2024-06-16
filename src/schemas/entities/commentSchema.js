import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
export const commentSchema = z.object({
  content: z.string()
    .min(1, ERRORS.MIN('Content', 1))
    .max(400),

  userId: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID')),

  postId: z.string(ERRORS.REQUIRED('Post ID'))
    .uuid(ERRORS.INVALID('UUID'))
})
