import { z } from 'zod'
export const UUIDSchema = z.object({
  id: z.string({
    invalid_type_error: 'Must be string',
    required_error: 'Id is required'
  }).uuid({ error: 'Id as an UUID required at this endpoint' })
})
