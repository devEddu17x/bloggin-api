import { validate, validatePartial } from '../schemas/schemaValidator.js'
import { postSchema } from '../schemas/entities/postSchema.js'
import { randomUUID } from 'node:crypto'
export class PostController {
  constructor ({ postModel }) {
    this.postModel = postModel
  }

  create = async (req, res) => {
    const validationResult = validate(postSchema, { userId: req.data.userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const id = randomUUID()
    const result = await this.postModel.create({ id, input: validationResult.data })
    res.send(result.success ? result.data : result.error)
  }

  update = async (req, res) => {
    const { id } = req.params
    const validationResult = validatePartial(postSchema, { userId: req.data.userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const result = await this.postModel.update({ id, input: validationResult.data, userId: req.data.userId })
    res.send(result.success ? result.data : result.error)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.postModel.delete({ id, userId: req.data.userId })
    res.send(result.success ? result.data : result.error)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.postModel.getById({ id })
    res.send(result.success ? result.data : result.error)
  }
}
