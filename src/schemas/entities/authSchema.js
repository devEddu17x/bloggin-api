import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
export const authSchema = z.object({
  email: z.string(ERRORS.REQUIRED('Email adress'))
    .email(ERRORS.INVALID('Email adress'))
    .max(50, ERRORS.MAX('Email adress', 50)),
  username: z.string(ERRORS.REQUIRED('Username'))
    .min(3, ERRORS.MIN('Username', 3))
    .max(50, ERRORS.MAX('Username', 50)),
  password: z.string(ERRORS.REQUIRED('Password'))
    .min(8, ERRORS.MIN('Password', 8))
    .max(50, ERRORS.MAX('Password', 50))
})
