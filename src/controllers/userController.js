import { randomUUID } from 'node:crypto'
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  async create (req, res) {
    const id = randomUUID()
    const result = this.userModel.create({ id, input: req })
    res.send((!result.succes) ? { error: result.error } : { succes: result.message })
  }

  async getById (req, res) {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.getById({ id })
    res.send((!result.succes) ? { error: result.error } : { succes: result.message })
  }

  async update (req, res) {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.update({ id, input: req.body })
    res.send((!result.succes) ? { error: result.error } : { succes: result.message })
  }

  async delete (req, res) {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.delete({ id })
    res.send((!result.succes) ? { error: result.error } : { succes: result.message })
  }
}
