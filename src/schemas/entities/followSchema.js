import { z } from 'zod'
import { ERRORS } from './errorsMessages/errors.js'
export const followsSchema = z.object({
  followerID: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID')),

  followedId: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID'))
})
