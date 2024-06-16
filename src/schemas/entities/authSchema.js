import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
export const authSchema = z.object({
  username: z.string(ERRORS.REQUIRED('Username'))
    .min(5, ERRORS.MIN('Username', 5))
    .max(50, ERRORS.MAX('Username', 50)),
  password: z.string(ERRORS.REQUIRED('Password'))
    .min(8, ERRORS.MIN('Password', 8))
    .max(50, ERRORS.MAX('Password', 50))
})
