import { createApp } from './app.js'
import { UserModel } from './models/userModel.js'
import { UserDetailsModel } from './models/userDetailsModel.js'
import { PostModel } from './models/postModel.js'
import { CommentsModel } from './models/commentsModel.js'
createApp({ userModel: UserModel, userDetailsModel: UserDetailsModel, postModel: PostModel, commentModel: CommentsModel })
