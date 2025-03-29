import mysql from 'mysql2'
import { Constants } from './constants.js'

export const pool = mysql.createPool({
    host: Constants.ADMINISTRATION_DATABASE_HOST,
    user: Constants.ADMINISTRATION_DATABASE_USER_NAME,
    port: Constants.ADMINISTRATION_DATABASE_PORT,
    password: Constants.ADMINISTRATION_DATABASE_PASSWORD,
    database: Constants.ADMINISTRATION_DATABASE_NAME,
    multipleStatements: true,
    ssl: {
        rejectUnauthorized: true
    }
})