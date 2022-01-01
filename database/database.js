const mysql = require('mysql2/promise')


const { MYSQL_HOST, MYSQL_DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD } = process.env

const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool