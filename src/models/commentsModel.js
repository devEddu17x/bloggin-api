import { db } from '../config/db/mysql.js'
export class CommentsModel {
  static async create ({ id, userId, postId, content }) {
    try {
      const [result] = await db.execute(`
        INSERT INTO comments(comment_id, user_id, post_id, content)
        VALUES
        (UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
        `, [id, userId, postId, content])

      return result.affectedRows > 0
        ? {
            success: true,
            data: {
              message: 'Comment has been created',
              comment: {
                commentId: id,
                userId,
                postId,
                content
              }
            }
          }
        : {
            error: {
              message: 'Can not create comment',
              try: 'Check postId references to a valid post',
              url: '/posts/comments'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error',
          url: '/posts/comments'
        }
      }
    }
  }

  static async get ({ postId }) {
    try {
      const [comments] = await db.execute(`
        SELECT c.commentId, c.postId, BIN_TO_UUID(c.user_id) userId, users.name, users.last_name AS lastName, c.content, c.createdAt
        FROM 
        (
          SELECT BIN_TO_UUID(comment_id) commentId, BIN_TO_UUID(post_id) postId, user_id, content, created_at AS createdAt
          FROM comments
          WHERE post_id = UUID_TO_BIN(?)
        ) c
        INNER JOIN users
        ON c.user_id = users.user_id
        `, [postId])
      return comments.length > 0
        ? {
            success: true,
            data: { comments }
          }
        : {
            error: {
              message: 'No comments yet',
              url: '/posts/comments'
            },
            noComments: true
          }
    } catch (e) {
      console.log(e)
      return {
        error: {
          message: 'Unexpected error',
          url: '/posts/comments'
        }
      }
    }
  }

  static async delete ({ id, userId }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM comments
        WHERE comment_id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)
        `, [id, userId])
      return result.affectedRows > 0
        ? {
            success: true,
            data: { message: 'Comment has been deleted' }
          }
        : {
            error: {
              message: 'Comments does not exists or is not yours',
              try: 'Check sent id',
              url: '/posts/comments'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error',
          url: '/posts/comments'
        }
      }
    }
  }

  static async update ({ id, userId, content }) {
    if (!content) {
      return {
        error: {
          message: 'No data to update',
          url: '/posts/comments'
        }
      }
    }
    try {
      const [result] = await db.execute(`
        UPDATE comments
        SET content = ?
        WHERE comment_id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)
        `, [content, id, userId])
      return result.affectedRows > 0
        ? {
            success: true,
            data: {
              message: 'Comment has been updated'
            }
          }
        : {
            error: {
              message: 'Comments does not exists or is not yours',
              try: 'Check sent id',
              url: '/posts/comments'
            }
          }
    } catch (e) {
      console.log(e)
      return {
        error: {
          message: 'Unexpected error',
          url: '/posts/comments'
        }
      }
    }
  }
}
