import { randomUUID } from 'node:crypto'
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create = async (req, res) => {
    const id = randomUUID()
    const result = await this.userModel.create({ id, input: req })
    res.send((!result.success) ? { error: result.error } : { user: result.message })
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.getById({ id })
    res.send((!result.success) ? { error: result.error } : { user: result.data })
  }

  getByQuery = async (req, res) => {
    const { name, lastname } = req.query
    if (!name && !lastname) return res.status(400).send({ error: 'Name or lastname are required at this endpoint' })
    const result = await this.userModel.getByQuery({ query: req.query })
    res.send((!result.success) ? { error: result.error } : { user: result.data })
  }

  update = async (req, res) => {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.update({ id, input: req.body })
    res.send((!result.success) ? { error: result.error } : { newUser: result.message })
  }

  delete = async (req, res) => {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.delete({ id })
    res.send((!result.success) ? { error: result.error } : { message: result.message })
  }
}
