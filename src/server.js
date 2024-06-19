import { createApp } from './app.js'
import { UserModel } from './models/userModel.js'
import { UserDetailsModel } from './models/userDetailsModel.js'
createApp({ userModel: UserModel, userDetailsModel: UserDetailsModel, postModel: null, commentModel: null })
