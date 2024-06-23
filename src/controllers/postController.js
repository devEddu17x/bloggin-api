import { validate, validatePartial } from '../schemas/schemaValidator.js'
import jwt from 'jsonwebtoken'
import { postSchema } from '../schemas/entities/postSchema.js'
import { randomUUID } from 'node:crypto'
export class PostController {
  constructor ({ postModel }) {
    this.postModel = postModel
  }

  create = async (req, res) => {
    const cookies = req.cookies
    const { userId } = jwt.decode(cookies.access_token)
    const validationResult = validate(postSchema, { userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const id = randomUUID()
    const result = await this.postModel.create({ id, input: validationResult.data })
    res.send((!result.success) ? { error: result.error } : result.data)
  }

  update = async (req, res) => {
    const { id } = req.params
    const cookies = req.cookies
    const { userId } = jwt.decode(cookies.access_token)
    const validationResult = validatePartial(postSchema, { userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const result = await this.postModel.update({ id, input: validationResult.data, userId })
    res.send((!result.success) ? { error: result.error } : { message: result.message })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const { userId } = jwt.decode(req.cookies.access_token)
    const result = await this.postModel.delete({ id, userId })
    if (!result.success) return res.send({ error: result.error })
    res.send({ message: result.message })
  }
}
