const mysql = require('mysql2')
export const db = mysql.createPool(process.env.MYSQL_URI)