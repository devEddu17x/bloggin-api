import { validate } from '../schemas/schemaValidator.js'
import { userSchema } from '../schemas/entities/userSchema.js'
import { UserController } from './userController.js'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/config.js'
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
    const valid = await bcrypt.compare(password, result.data.data.password)
    if (!valid) return res.send({ message: 'Invalid password' })
    const { password: _, ...publicUser } = result.data.data
    const token = jwt.sign(
      {
        userId: publicUser.userId,
        username: publicUser.username,
        name: publicUser.name,
        lastName: publicUser.lastName
      },
      JWT_KEY,
      {
        expiresIn: '24h'
      }
    )
    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
      })
      .send({ message: 'Login succesfull', user: publicUser })
  }
}
