import { z } from 'zod'
import { ERRORS } from './errorsMessages/errors.js'
export const postSchema = z.object({
  userId: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID')),

  title: z.string()
    .min(1, ERRORS.MIN('Title', 1))
    .max(50, ERRORS.MAX('Title', 50)),

  content: z.string()
    .min(1, ERRORS.MIN('Title', 1))
    .max(1024, ERRORS.MAX('Title', 1024))
})
