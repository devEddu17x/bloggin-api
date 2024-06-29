import { db } from '../config/db/mysql.js'
import { format } from 'date-fns'
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
      return {
        error: {
          message: 'No data to update',
          try: 'Check sent title and content',
          url: '/posts/'
        },
        invalidData: true
      }
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
              try: 'Check sent id or post owner',
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

  static async getById ({ id }) {
    try {
      const [post] = await db.execute(`
        SELECT title, content
        FROM posts
        WHERE post_id = UUID_TO_BIN(?)
        `, [id])
      return post.length > 0
        ? {
            success: true,
            data: { post }
          }
        : {
            error: {
              message: 'Post not found',
              try: 'Verify sent id',
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

  static async get ({ after }) {
    try {
      const [posts] = await db.execute(`
        SELECT BIN_TO_UUID(post_id) postId, title, content, created_at AS createdAt
        FROM posts
        WHERE created_at <= ?
        ORDER BY created_at DESC
        LIMIT 10
        `, [after])
      const nextAfter = posts.length > 0 ? format(posts[posts.length - 1].createdAt, 'yyyy-MM-dd HH:mm:ss') : null
      return posts.length > 0
        ? {
            success: true,
            data: {
              posts,
              after: nextAfter
            }
          }
        : {
            error: {
              message: 'Posts not found',
              try: 'Verify after param',
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
}
