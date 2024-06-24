import { validatePartialUserDetails } from '../schemas/entities/userDetailsSchema.js'

export class UserDetailsController {
  constructor ({ userDetailsModel }) {
    this.userDetailsModel = userDetailsModel
  }

  getByUserId = async (req, res) => {
    const { userId } = req.params
    const result = await this.userDetailsModel.getByUserId({ id: userId })
    res.send(result.success ? result.data : result.error)
  }

  updateByUserId = async (req, res) => {
    const result = validatePartialUserDetails(req.body)
    if (!result.success) return res.send(result.error)
    const updateResult = await this.userDetailsModel.updateByUserId({ id: req.params.userId, input: result.data })
    res.send(updateResult.success ? result.data : updateResult.error)
  }
}
