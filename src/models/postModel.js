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
      return { success: true, data: { message: 'Post has been created', postId: id } }
    } catch {
      return { error: 'Unexpected error ocurred' }
    }
  }

  static async update ({ id, input, userId }) {
    const { title, content } = input
    const values = []
    const list = []
    if (title !== undefined) {
      list.push('title = ?')
      values.push(title)
    }
    if (content !== undefined) {
      list.push('content = ?')
      values.push(content)
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
      return result.affectedRows > 0 ? { success: true, message: 'Post has been updated' } : { error: 'Post not updated' }
    } catch (e) {
      return { error: 'Unexpected error ocurred' }
    }
  }

  static async delete ({ id, userId }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM posts
        WHERE post_id = UUID_TO_BIN(?) AND user_id = UUID_TO_BIN(?)
        `, [id, userId])
      return result.affectedRows > 0 ? { success: true, message: 'Post has been deleted' } : { error: 'Post not deleted' }
    } catch (e) {
      return { error: 'Unexpected error ocurred' }
    }
  }
}
