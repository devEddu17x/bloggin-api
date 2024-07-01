import { UUIDSchema } from '../schemas/entities/UUIDSchema.js'
import { validate } from '../schemas/schemaValidator.js'
export const validateIdExist = (req, res, next) => {
  const { id, userId, commentId } = req.params
  let result = {}
  if (id) {
    result = validate(UUIDSchema, { id })
  } else if (userId) {
    result = validate(UUIDSchema, { id: userId })
  } else if (commentId) {
    result = validate(UUIDSchema, { id: commentId })
  } else {
    result = { error: 'An UUID is required' }
  }
  if (!result.success) return res.status(400).send(result.error)
  next()
}
