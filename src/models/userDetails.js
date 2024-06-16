import { db } from '../config/db/mysql.js'
export class UserModel {
  async update ({ id, input }) {
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
      return result.affectedRows > 0 ? { succes: true, message: 'User updated' } : { error: 'User not updated' }
    } catch (e) {
      return ({ error: 'Error updating user' })
    }
  }

  async getByUserId ({ id }) {
    try {
      const [users] = await db.execute(`
        SELECT username, email, name, lastname
        FROM users
        WHERE user_id = UUID_TO_BIN(?)
        `, [id])
      return users.length !== 0 ? { succes: true, data: users[0] } : { error: 'User not found' }
    } catch (e) {
      return { error: 'Can not find user' }
    }
  }
}
