import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
import countries from 'i18n-iso-countries'
import { isPhoneNumber } from './customValidations/phone.js'
import { isAfter1924 } from './customValidations/date.js'

export const userDetailsSchema = z.object({
  userId: z.string(ERRORS.REQUIRED('User ID')).uuid(ERRORS.INVALID('UUID')),

  country: z.string(ERRORS.REQUIRED('Country'))
    .refine(countries, ERRORS.INVALID('Country')),

  phoneNumber: z.string(ERRORS.REQUIRED('Phone number'))
    .refine((number, context) => {
      const country = context.parent.country
      return isPhoneNumber(number, country)
    }, ERRORS.INVALID('Phone number')),

  description: z.string(ERRORS.REQUIRED('Description'))
    .min(1, ERRORS.MIN('Description', 1))
    .max(255, ERRORS.MAX('Description', 255)),

  gender: z.boolean(ERRORS.REQUIRED('Gender')),

  birth: z.string(ERRORS.REQUIRED('Birth'))
    .datetime()
    .refine(isAfter1924, ERRORS.AFTER_DATE('1924'))
})
