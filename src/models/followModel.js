import { db } from '../config/db/mysql.js'
export class FollowModel {
  static async follow ({ followerId, followedId }) {
    try {
      const [result] = await db.execute(`
        INSERT INTO follows(follower_id, followed_id) 
        VALUES
        (UUID_TO_BIN(?), UUID_TO_BIN(?));
        `, [followerId, followedId])
      return result.affectedRows > 0
        ? {
            success: true,
            data: { message: 'Following successfully' }
          }
        : {
            error: {
              message: 'User does not exists',
              try: 'Check sent ids',
              path: '/follows/'
            }
          }
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return {
          error: {
            message: 'You are already following this user',
            path: '/follows/'
          }
        }
      }
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/follows/'
        }
      }
    }
  }

  static async unFollow ({ followerId, followedId }) {
    try {
      const [result] = await db.execute(`
        DELETE FROM follows
        WHERE follower_id = UUID_TO_BIN(?) AND followed_id = UUID_TO_BIN(?)
        `, [followerId, followedId])
      return result.affectedRows > 0
        ? {
            success: true,
            data: { message: 'Unfollowing user' }
          }
        : {
            error: {
              message: 'User does not exists or you are not following this user',
              try: 'Check sent ids',
              path: '/follows/'
            }
          }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/follows/'
        }
      }
    }
  }

  static async getFollowers ({ followedId }) {
    try {
      const [followers] = await db.execute(`
        SELECT BIN_TO_UUID(f.follower_id) AS userId, users.username, users.name, users.last_name AS lastName
        FROM
              (
              SELECT
                follower_id
              FROM
                  follows
              WHERE
                  followed_id = UUID_TO_BIN(?)
              ) f
        INNER JOIN users
        ON users.user_id = f.follower_id;
        `, [followedId])
      return {
        success: true,
        data: {
          followers,
          followersCount: followers.length
        }
      }
    } catch (e) {
      return {
        error: {
          message: 'Unexpected error ocurred',
          url: '/follows/'
        }
      }
    }
  }
}
