import { validate, validatePartial } from '../schemas/schemaValidator.js'
import { authSchema } from '../schemas/entities/authSchema.js'
import { userSchema } from '../schemas/entities/userSchema.js'
import { userDetailsSchema } from '../schemas/entities/userDetailsSchema.js'

export class AuthController {
  constructor ({ userMovel }) {
    this.userModel = userMovel
  }

  async register (req, res) {
    const essentialData = validate(userSchema, req.body)
    if (!essentialData.succes) return res.send(essentialData.error)
    // create user using user controller
    const detailsData = validatePartial(userDetailsSchema, req.body)
    if (!detailsData.succes) {
      // create userDetails even detailsData was wrong, send only userId -> createdAt,followersCount, followerdCount,and others will be default in db
    }
    // create userDetails with data
  }

  async login (req, res) {
    const result = validate(authSchema, req.body)
    if (!result.succes) return res.send(result.error)
    // log user
  }
}
