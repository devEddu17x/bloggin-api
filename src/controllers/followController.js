import { randomUUID } from 'node:crypto'
import { followsSchema } from '../schemas/entities/followSchema.js'
import { validate } from '../schemas/schemaValidator.js'

export class FollowController {
  constructor ({ followModel }) {
    this.followModel = followModel
  }

  follow = async (req, res) => {
    const result = validate(followsSchema, { followerId: req.data.userId, followedId: req.body.followedId })
    if (!result.success) return res.status(400).send(result.error)
    const id = randomUUID()
    const resultFollow = await this.followModel.follow({ id, ...result.data })
    if (resultFollow.success) return res.status(201).send(resultFollow.data)
    res.status(400).send(resultFollow.error)
  }

  unFollow = async (req, res) => {
    const result = validate(followsSchema, { followerId: req.data.userId, followedId: req.body.followedId })
    if (!result.success) return res.status(400).send(result.error)
    const resultFollow = await this.followModel.unFollow({ ...result.data })
    if (resultFollow.success) return res.status(200).send(resultFollow.data)
    res.status(400).send(resultFollow.error)
  }

  getFollows = async (req, res) => {
    const result = validate(followsSchema, { followerId: req.data.userId, followedId: req.body.followedId })
    if (!result.success) return res.status(400).send(result.error)
    const resultFollow = await this.followModel.getFollowers({ ...result.data })
    if (resultFollow.success) return res.status(200).send(resultFollow.data)
    res.status(400).send(resultFollow.error)
  }
}
