import mysql from 'mysql2/promise'
import { mysqConfig } from '../config/db/mysql.js'
export const connection = await mysql.createConnection(mysqConfig)
