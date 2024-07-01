import { randomUUID } from 'node:crypto'
import { validate, validatePartial } from '../schemas/schemaValidator.js'
import { commentSchema } from '../schemas/entities/commentSchema.js'
export class CommentController {
  constructor ({ commentModel }) {
    this.commentModel = commentModel
  }

  create = async (req, res) => {
    const result = validate(commentSchema, { userId: req.data.userId, content: req.body.content, postId: req.params.postId })
    if (!result.success) return res.status(400).send(result.error)
    const id = randomUUID()
    const createResult = await this.commentModel.create({ id, ...result.data })
    if (!createResult.success) return res.status(400).send(createResult.error)
    res.status(201).send(createResult.data)
  }

  get = async (req, res) => {
    const result = await this.commentModel.get({ postId: req.params.postId })
    if (!result.success) return res.status(404).send(result.error)
    if (result.noComments) return res.status(204).send(result.error)
    res.status(200).send(result.data)
  }

  delete = async (req, res) => {
    const result = await this.commentModel.delete({ id: req.params.commentId, userId: req.data.userId })
    if (!result.success) return res.status(404).send(result.error)
    res.status(200).send(result.data)
  }

  update = async (req, res) => {
    const result = validatePartial(commentSchema, { userId: req.data.userId, content: req.body.content })
    if (!result.success) return res.status(400).send(result.error)
    const updateResult = await this.commentModel.update({ id: req.params.commentId, ...result.data })
    if (!updateResult.success) return res.status(400).send(updateResult.error)
    res.status(200).send(updateResult.data)
  }
}
