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
    if (result.success) return res.status(201).send(result.data)
    res.status(400).send(result.error)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.getById({ id })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }

  getByQuery = async (req, res) => {
    const { name, lastname } = req.query
    if (!name && !lastname) return res.status(400).send({ error: 'Name or lastname are required at this endpoint' })
    const result = await this.userModel.getByQuery({ query: req.query })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }

  update = async (req, res) => {
    const { id } = req.params
    const schemaResult = validatePartial(userSchema, req.body)
    if (!schemaResult.success) return res.send(schemaResult.error)
    const result = await this.userModel.update({ id, input: schemaResult.data })
    if (result.success) return res.status(200).send(result.data)
    res.status(400).send(result.error)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.delete({ id })
    if (result.success) return res.status(200).send(result.data)
    res.status(404).send(result.error)
  }

  getDataToLogin = async (input, key) => {
    return await this.userModel.getDataToLogin({ input, key })
  }
}
