import { validatePartialUserDetails } from '../schemas/entities/userDetailsSchema.js'

export class UserDetailsController {
  constructor ({ userDetailsModel }) {
    this.userDetailsModel = userDetailsModel
  }

  getByUserId = async (req, res) => {
    const { userId } = req.params
    const result = await this.userDetailsModel.getByUserId({ id: userId })
    if (result.success) return res.status(200).send(result.data)
    return res.status(404).send(result.error)
  }

  updateByUserId = async (req, res) => {
    const result = validatePartialUserDetails(req.body)
    if (!result.success) return res.send(result.error)
    const updateResult = await this.userDetailsModel.updateByUserId({ id: req.params.userId, input: result.data })
    if (updateResult.success) return res.status(200).send(updateResult.data)
    if (updateResult.validData !== undefined) return res.status(400).send(updateResult.error)
    res.status(404).send(updateResult.error)
  }
}
