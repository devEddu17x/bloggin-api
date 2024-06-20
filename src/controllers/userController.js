import { randomUUID } from 'node:crypto'
import { validatePartial } from '../schemas/schemaValidator.js'
import { userSchema } from '../schemas/entities/userSchema.js'
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
    const schemaResult = validatePartial(userSchema, req.body)
    if (!schemaResult.success) return res.send(schemaResult.error)
    const result = await this.userModel.update({ id, input: schemaResult.data })
    res.send((!result.success) ? { error: result.error } : { newUser: result.message })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.delete({ id })
    res.send((!result.success) ? { error: result.error } : { message: result.message })
  }

  getDataToLogin = async (input, key) => {
    return await this.userModel.getDataToLogin({ input, key })
  }
}
