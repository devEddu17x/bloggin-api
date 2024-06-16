import { z } from 'zod'
import { ERRORS } from './errorsMessages/errors.js'

export const userSchema = z.object({
  username: z.string(ERRORS.REQUIRED('Username'))
    .min(5, ERRORS.MIN('Username', 5))
    .max(50, ERRORS.MAX('Username', 50)),

  email: z.string(ERRORS.REQUIRED('Email adress'))
    .email(ERRORS.INVALID('Email adress'))
    .max(50, ERRORS.MAX('Email adress', 50)),

  password: z.string(ERRORS.REQUIRED('Password'))
    .min(8, ERRORS.MIN('Password', 8))
    .max(50, ERRORS.MAX('Password', 50)),

  name: z.string(ERRORS.REQUIRED('Name'))
    .min(5, ERRORS.MIN('Name', 5))
    .max(20, ERRORS.MAX('Name', 20)),

  lastName: z.string(ERRORS.REQUIRED('Lastname'))
    .min(5, ERRORS.MIN('Lastname', 5))
    .max(20, ERRORS.MAX('Lastname', 20))
})
