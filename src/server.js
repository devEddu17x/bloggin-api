import { createApp } from './app.js'
import { UserModel } from './models/userModel.js'

createApp({ userModel: UserModel, postModel: null, commentModel: null })
