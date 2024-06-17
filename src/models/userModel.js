import { db } from '../config/db/mysql.js'
export class UserModel {
  static async create ({ id, input }) {
    const { username, email, password, name, lastName } = input
    try {
      await db.execute(`
        INSERT INTO users(user_id, username, email, password, name, last_name)
        VALUES
        (UUID_TO_BIN(?),?,?,?,?,?);
        `, [id, username, email, password, name, lastName]
      )
      return { success: true, message: 'User has been created' }
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return { error: 'Email or username already exists' }
      return { error: 'Unexpected error ocurred' }
    }
  }

  static async update ({ id, input }) {
    const list = []
    const values = []
    for (const [key, value] of Object.entries(input)) {
      list.push(`${key} = ?`)
      values.push(value)
    }
    list.join(',')
    values.push(id)
    const query = `
    UPDATE users
    SET ${list}
    WHERE id = UUID_TO_BIN(?)
    `
    try {
      const [result] = await db.execute(query, values)
      return result.affectedRows > 0 ? { success: true, message: 'User updated' } : { error: 'User not updated' }
    } catch (e) {
      return ({ error: 'Error updating user' })
    }
  }

  static async getById ({ id }) {
    try {
      const [users] = await db.execute(`
        SELECT username, email, name, lastname
        FROM users
        WHERE id = UUID_TO_BIN(?)
        `, [id])
      return users.length !== 0 ? { success: true, data: users[0] } : { error: 'User not found' }
    } catch (e) {
      return { error: 'Can not find user' }
    }
  }

  static async delete ({ id }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM users
        WHERE id = UUID_TO_BIN(?)  
        `
      , [id])
      return result.affectedRows > 0 ? { success: true, message: 'User has been deleted' } : { error: 'Can not delete user' }
    } catch (e) {
      return { error: 'Error deleting user' }
    }
  }
}
