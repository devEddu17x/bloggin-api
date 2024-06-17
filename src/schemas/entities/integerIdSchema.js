import { z } from 'zod'
export const integerIDSchema = z.object({
  id: z.number().min(1)
})
