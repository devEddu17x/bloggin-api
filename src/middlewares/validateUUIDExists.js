import { UUIDSchema } from '../schemas/entities/UUIDSchema.js'
import { validate } from '../schemas/schemaValidator.js'
export const validateIdExist = (req, res, next) => {
  const { id } = req.params
  const result = validate(UUIDSchema, { id })
  if (!result.success) return res.send(result.error)
  next()
}
