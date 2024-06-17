import { z } from 'zod'
import { ERRORS } from '../messages/error.js'

export const userSchema = z.object({
  username: z.string(ERRORS.REQUIRED('Username'))
    .min(3, ERRORS.MIN('Username', 3))
    .max(50, ERRORS.MAX('Username', 50)),

  email: z.string(ERRORS.REQUIRED('Email adress'))
    .email(ERRORS.INVALID('Email adress'))
    .max(50, ERRORS.MAX('Email adress', 50)),

  password: z.string(ERRORS.REQUIRED('Password'))
    .min(8, ERRORS.MIN('Password', 8))
    .max(60, ERRORS.MAX('Password', 60)),

  name: z.string(ERRORS.REQUIRED('Name'))
    .min(3, ERRORS.MIN('Name', 3))
    .max(20, ERRORS.MAX('Name', 20)),

  lastName: z.string(ERRORS.REQUIRED('Lastname'))
    .min(3, ERRORS.MIN('Lastname', 3))
    .max(20, ERRORS.MAX('Lastname', 20))
})
