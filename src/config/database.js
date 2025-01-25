import mysql from 'mysql2'

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'admin123',
    database: 'desa_audio',
    multipleStatements: true
})