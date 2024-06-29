import { validate, validatePartial } from '../schemas/schemaValidator.js'
import { postSchema } from '../schemas/entities/postSchema.js'
import { randomUUID } from 'node:crypto'
import { format } from 'date-fns'

export class PostController {
  constructor ({ postModel }) {
    this.postModel = postModel
  }

  create = async (req, res) => {
    const validationResult = validate(postSchema, { userId: req.data.userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const id = randomUUID()
    const result = await this.postModel.create({ id, input: validationResult.data })
    if (result.success) return res.status(201).send(result.data)
    res.status(400).send(result.error)
  }

  update = async (req, res) => {
    const { id } = req.params
    const validationResult = validatePartial(postSchema, { userId: req.data.userId, ...req.body })
    if (!validationResult.success) return res.send(validationResult.error)
    const result = await this.postModel.update({ id, input: validationResult.data, userId: req.data.userId })
    if (result.success) return res.status(200).send(result.data)
    res.status(result.invalidData ? 400 : 404).send(result.error)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.postModel.delete({ id, userId: req.data.userId })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.postModel.getById({ id })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }

  get = async (req, res) => {
    const after = req.query.after || format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const result = await this.postModel.get({ after })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }
}
