import { UUIDSchema } from '../schemas/entities/UUIDSchema.js'
import { validate } from '../schemas/schemaValidator.js'
export const validateIdExist = (req, res, next) => {
  const { id, userId } = req.params
  const result = (id) ? validate(UUIDSchema, { id }) : (userId) ? validate(UUIDSchema, { id: userId }) : { error: 'An UUID is required' }
  if (!result.success) return res.send(result.error)
  next()
}
