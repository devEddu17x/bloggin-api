import { userDetailsSchema } from '../schemas/entities/userDetailsSchema.js'
import { validatePartial } from '../schemas/schemaValidator.js'
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
    const result = validatePartial(userDetailsSchema, req.body)
    if (!result.success) return res.send(result.error)
    const { userID, ...updatedData } = result.data
    const updateResult = await this.userDetailsModel.getByUserId({ id: userID, input: updatedData })
    if (!updateResult.success) res.send(updateResult.error)
  }
}
