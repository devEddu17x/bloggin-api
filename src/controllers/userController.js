import { randomUUID } from 'node:crypto'
export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create = async (req, res) => {
    const id = randomUUID()
    const result = await this.userModel.create({ id, input: req })
    res.send((!result.success) ? { error: result.error } : { success: result.message })
  }

  getById = async (req, res) => {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.getById({ id })
    res.send((!result.success) ? { error: result.error } : { success: result.message })
  }

  update = async (req, res) => {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.update({ id, input: req.body })
    res.send((!result.success) ? { error: result.error } : { success: result.message })
  }

  delete = async (req, res) => {
    const { id } = req.params
    if (!id) return { invalid_id: 'Valid id as UUUID is required' }
    const result = this.userModel.delete({ id })
    res.send((!result.success) ? { error: result.error } : { success: result.message })
  }
}
