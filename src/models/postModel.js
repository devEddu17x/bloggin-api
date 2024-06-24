import { db } from '../config/db/mysql.js'
export class PostModel {
  static async create ({ id, input }) {
    const { title, content, userId } = input
    try {
      await db.execute(`
        INSERT INTO posts(post_id, title, content, user_id)
        VALUES
        (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?))
        `, [id, title, content, userId])
      return {
        success: true,
        data: {
          message: 'Post has been created',
          post: {
            postId: id
          }
        }
      }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/posts/'
        }
      }
    }
  }

  static async update ({ id, input, userId }) {
    const { title, content } = input
    const values = []
    const list = []
    const newPost = {}
    if (title !== undefined) {
      list.push('title = ?')
      values.push(title)
      newPost.title = title
    }
    if (content !== undefined) {
      list.push('content = ?')
      values.push(content)
      newPost.content = content
    }
    if (list.length === 0) {
      return { error: 'No data to update' }
    }
    values.push(id)
    values.push(userId)
    try {
      const [result] = await db.execute(`
        UPDATE posts
        SET ${list.join(',')}
        WHERE post_id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)
        `, values)
      return result.affectedRows > 0
        ? {
            success: true,
            data: {
              message: 'Post updated',
              postUpdated: newPost
            }
          }
        : {
            error: {
              message: 'Post not updated',
              try: 'Check sent id',
              url: '/posts/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/posts/'
        }
      }
    }
  }

  static async delete ({ id, userId }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM posts
        WHERE post_id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)
        `, [id, userId])
      return result.affectedRows > 0
        ? {
            success: true,
            data: { message: 'Post has been deleted' }
          }
        : {
            error: {
              message: 'Can not delete post',
              try: 'Check sent id',
              path: '/posts/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/posts/'
        }
      }
    }
  }
}
