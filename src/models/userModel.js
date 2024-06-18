import { db } from '../config/db/mysql.js'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config/config.js'
export class UserModel {
  static async create ({ id, input }) {
    const { username, email, password, name, lastName } = input
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    try {
      await db.execute(`
        INSERT INTO users(user_id, username, email, password, name, last_name)
        VALUES
        (UUID_TO_BIN(?),?,?,?,?,?);
        `, [id, username, email, hashedPassword, name, lastName]
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
        SELECT username, email, name, last_name
        FROM users
        WHERE user_id = UUID_TO_BIN(?)
        `, [id])
      return users.length > 0 ? { success: true, data: users[0] } : { error: 'User not found' }
    } catch (e) {
      return { error: 'Unexpected error' }
    }
  }

  static async getByQuery ({ query }) {
    const toFind = (query.name && query.lastname) ? 'name = ? OR last_name = ?' : (query.name) ? 'name = ?' : 'last_name = ?'
    const values = []
    if (query.name) values.push(query.name)
    if (query.lastname) values.push(query.lastname)
    try {
      const [users] = await db.execute(`
        SELECT BIN_TO_UUID(user_id) user_id, username, name, last_name
        FROM users
        WHERE ${toFind}
        `, values)
      return users.length > 0 ? { success: true, data: users } : { error: 'No users found' }
    } catch (e) {
      return { error: 'Unexpected error' }
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

  static async getDataToLogin ({ input, key }) {
    try {
      const [rows] = await db.execute(`
        SELECT BIN_TO_UUID(user_id) user_id, username, name, last_name, password 
        FROM users
        WHERE ${key} = ?
        `, [input])
      return rows.length > 0 ? { succes: true, data: rows[0] } : { error: `User with this ${key} does not exists` }
    } catch (e) {
      return { error: 'Unexpected error' }
    }
  }
}
