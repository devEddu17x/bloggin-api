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
      return {
        success: true,
        data: {
          message: 'User has been created',
          user: {
            userId: id,
            username
          }
        }
      }
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return {
          error: {
            message: 'Email or username already exists',
            input: [email, username],
            url: '/users/'
          }
        }
      }
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/'
        }
      }
    }
  }

  static async update ({ id, input }) {
    const list = []
    const values = []
    const newUser = {}
    if (input.username) {
      list.push('username = ?')
      values.push(input.username)
      newUser.username = input.username
    }
    if (input.email) {
      list.push('email = ?')
      values.push(input.email)
      newUser.email = input.email
    }
    if (input.password) {
      list.push('password = ?')
      const newPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
      values.push(newPassword)
      newUser.passwordChanged = true
    }
    if (input.name) {
      list.push('name = ?')
      values.push(input.name)
      newUser.name = input.name
    }
    if (input.lastName) {
      list.push('last_name = ?')
      values.push(input.lastName)
      newUser.lastName = input.lastName
    }
    if (list.length === 0) {
      return {
        error: {
          message: 'No data to update',
          url: '/users/'
        }
      }
    }
    list.join(',')
    values.push(id)
    try {
      const [result] = await db.execute(`
        UPDATE users
        SET ${list}
        WHERE user_id = UUID_TO_BIN(?)
        `, values)
      return result.affectedRows > 0
        ? {
            success: true,
            data: {
              message: 'User updated',
              userUpdated: newUser
            }
          }
        : {
            error: {
              message: 'User not updated',
              try: 'Check sent id',
              url: '/users/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/'
        }
      }
    }
  }

  static async getById ({ id }) {
    try {
      const [users] = await db.execute(`
        SELECT username, email, name, last_name AS lastName
        FROM users
        WHERE user_id = UUID_TO_BIN(?)
        `, [id])
      return users.length > 0
        ? {
            success: true,
            data: { user: users[0] }
          }
        : {
            error: {
              message: 'User not found',
              try: 'Check sent id',
              url: '/users/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/'
        }
      }
    }
  }

  static async getByQuery ({ query }) {
    const toFind = (query.name && query.lastname) ? 'name = ? OR last_name = ?' : (query.name) ? 'name = ?' : 'last_name = ?'
    const values = []
    if (query.name) values.push(query.name)
    if (query.lastname) values.push(query.lastname)
    try {
      const [users] = await db.execute(`
        SELECT BIN_TO_UUID(user_id) userId, username, name, last_name AS lastName
        FROM users
        WHERE ${toFind}
        `, values)
      return users.length > 0
        ? {
            success: true,
            data: { users }
          }
        : {
            error: {
              message: 'No users found',
              try: 'Change name or lastname',
              url: '/users/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error',
          url: '/users/'
        }
      }
    }
  }

  static async delete ({ id }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM users
        WHERE user_id = UUID_TO_BIN(?)  
        `
      , [id])
      return result.affectedRows > 0
        ? {
            success: true,
            data: { message: 'User has been deleted' }
          }
        : {
            error: {
              message: 'Can not delete user',
              try: 'Check sent id',
              path: '/users/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/'
        }
      }
    }
  }

  static async getDataToLogin ({ input, key }) {
    try {
      const [rows] = await db.execute(`
        SELECT BIN_TO_UUID(user_id) userId, username, name, last_name AS lastName, password 
        FROM users
        WHERE ${key} = ?
        `, [input])
      return rows.length > 0
        ? {
            succes: true,
            data: { data: rows[0] }
          }
        : {
            error: {
              message: `User with this ${key} does not exists`,
              url: '/users/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error',
          url: '/users/'
        }
      }
    }
  }
}
