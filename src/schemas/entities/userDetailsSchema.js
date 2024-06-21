import { z } from 'zod'
import { ERRORS } from '../messages/error.js'
import countries from 'i18n-iso-countries'
import { isPhoneNumber } from '../customValidations/phone.js'
import { isAfter1924 } from '../customValidations/date.js'

const userDetailsSchema = z.object({
  country: z.string(ERRORS.REQUIRED('Country'))
    .refine(countries.isValid, ERRORS.INVALID('Country')),

  phoneNumber: z.string(ERRORS.REQUIRED('Phone number'))
    .refine(number => number.trim().length > 0, ERRORS.INVALID('Phone number')),

  description: z.string(ERRORS.REQUIRED('Description'))
    .min(1, ERRORS.MIN('Description', 1))
    .max(255, ERRORS.MAX('Description', 255)),

  gender: z.boolean(ERRORS.REQUIRED('Gender')),

  birth: z.string(ERRORS.REQUIRED('Birth'))
    .date()
    .refine(isAfter1924, ERRORS.AFTER_DATE('1924'))
})

export function validatePartialUserDetails (object) {
  if (object.phoneNumber && !object.country) return { error: 'Country is required to add phone number' }
  const result = userDetailsSchema.partial().safeParse(object)
  if (!object.phoneNumber && !object.country) return result
  if (!result.success) return result
  if (!isPhoneNumber(object.phoneNumber, object.country)) return { succes: false, error: { errorInput: 'Invalid phone number for country sended' } }
  return result
}
