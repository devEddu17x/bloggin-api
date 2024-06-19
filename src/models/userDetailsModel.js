import { db } from '../config/db/mysql.js'
export class UserDetailsModel {
  static async updateByUserId ({ id, input }) {
    const list = []
    const values = []
    for (const [key, value] of Object.entries(input)) {
      list.push(`${key} = ?`)
      values.push(value)
    }
    list.join(',')
    values.push(id)
    const query = `
    UPDATE user_details
    SET ${list}
    WHERE user_id = UUID_TO_BIN(?)
    `
    try {
      const [result] = await db.execute(query, values)
      return result.affectedRows > 0 ? { success: true, message: 'User updated' } : { error: 'User not updated' }
    } catch (e) {
      return ({ error: 'Error updating user' })
    }
  }

  static async getByUserId ({ id }) {
    try {
      const [users] = await db.execute(`
        SELECT created_at, followers_count , following_count, phone_number, description, gender, birth, country
        FROM user_details
        WHERE user_id = UUID_TO_BIN(?)
        `, [id])
      return users.length > 0 ? { success: true, data: users[0] } : { error: 'User not found' }
    } catch (e) {
      console.log(e)
      return { error: 'Can not find user' }
    }
  }
}
