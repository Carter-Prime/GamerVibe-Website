'use strict';
const mysql = require('mysql2');

try {
  module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
} catch (e) {
  console.error('db connection error', e.message);
}


