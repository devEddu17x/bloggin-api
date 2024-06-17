import { validate } from '../schemas/schemaValidator.js'
import { authSchema } from '../schemas/entities/authSchema.js'
import { userSchema } from '../schemas/entities/userSchema.js'
import { UserController } from './userController.js'

export class AuthController {
  constructor ({ userModel }) {
    this.userController = new UserController({ userModel })
  }

  // data base has a trigger that create by itself userDetails record, so i just need to create an user
  register = async (req, res) => {
    const essentialData = validate(userSchema, req.body)
    if (!essentialData.success) return res.send(essentialData.error)
    res.send(await this.userController.create(essentialData.data, res))
  }

  // login in building
  login = async (req, res) => {
    // bulding login...
    const result = validate(authSchema, req.body)
    if (!result.success) return res.send(result.error)
    // log user
  }
}
