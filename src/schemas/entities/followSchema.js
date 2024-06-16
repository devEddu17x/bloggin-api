import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
export const followsSchema = z.object({
  followerID: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID')),

  followedId: z.string(ERRORS.REQUIRED('User ID'))
    .uuid(ERRORS.INVALID('UUID'))
})
