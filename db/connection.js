const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Password2023',
      database: 'employee'
    },
    console.log(`Connected to the Employee database.`)
  );

  module.exports = db;