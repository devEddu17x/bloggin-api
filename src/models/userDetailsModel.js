import { db } from '../config/db/mysql.js'
export class UserDetailsModel {
  static async updateByUserId ({ id, input }) {
    const list = []
    const values = []
    const newUserDetails = {}
    if (input.country) {
      list.push('country = ?')
      values.push(input.country)
      newUserDetails.country = input.country
    }
    if (input.phoneNumber) {
      list.push('phone_number = ?')
      values.push(input.phoneNumber)
      newUserDetails.phoneNumber = input.phoneNumber
    }
    if (input.description) {
      list.push('description = ?')
      values.push(input.description)
      newUserDetails.description = input.description
    }
    if (input.gender !== undefined) {
      list.push('gender = ?')
      values.push(input.gender)
      newUserDetails.gender = input.gender
    }
    if (input.birth) {
      list.push('birth = ?')
      values.push(input.birth)
      newUserDetails.birth = input.birth
    }
    if (list.length === 0) return { error: { error: 'No data to update' } }
    list.join(',')
    values.push(id)
    console.log(input.gender)
    console.log(list)
    console.log(values)
    const query = `
    UPDATE user_details
    SET ${list}
    WHERE user_id = UUID_TO_BIN(?)
    `
    console.log(query)
    try {
      const [result] = await db.execute(query, values)
      return result.affectedRows > 0
        ? {
            success: true,
            data: {
              message: 'User details updated',
              userDetailsUpdaetd: newUserDetails
            }
          }
        : {
            error: {
              message: 'User details not updated',
              try: 'Check sent id',
              url: '/users/userDetails/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/userDetails/'
        }
      }
    }
  }

  static async getByUserId ({ id }) {
    try {
      const [users] = await db.execute(`
        SELECT created_at, followers_count , following_count, phone_number, description, gender, birth, country
        FROM user_details
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
              url: 'users/userDetails'
            }
          }
    } catch (e) {
      console.log(e)
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/users/'
        }
      }
    }
  }
}
