import { validate } from '../schemas/schemaValidator.js'
import { userSchema } from '../schemas/entities/userSchema.js'
import { UserController } from './userController.js'
import bcrypt from 'bcrypt'

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
    const { input, password, key } = req.body
    const result = await this.userController.getDataToLogin(input, key)
    if (!result.succes) return res.send(result)
    const valid = await bcrypt.compare(password, result.data.password)
    const { password: _, ...publicUser } = result.data
    res.send(valid ? { message: 'Login succesfull', user: publicUser } : { message: 'Invalid password' })
  }
}
