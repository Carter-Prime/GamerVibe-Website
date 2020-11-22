'use strict';
const connection = require('../database/db');
const {errorJson} = require('../utils/json_messages');

// TODO: Get correct information from users
const getAllUsers = async () => {
  try {
    const [rows] = await connection.execute(
        'SELECT username, email FROM User',
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// TODO: Get correct information from user
const getUser = async (id) => {
  try {
    const [user] = await connection.execute(
        'SELECT username, email FROM User WHERE userid = ?', id,
    );
    return user[0] || errorJson(`No users found with id: ${id}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

// TODO: Get correct information for login
const getUserLogin = async (email) => {
  try {
    const [rows] = await connection.execute(
        'SELECT * FROM User WHERE email = ?', email,
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// TODO: Add correct information to user table
const addUser = async (params) => {
  try {
    const [status] = await connection.execute(
        'INSERT INTO User(username, email, passwd) VALUES(?,?,?)', params,
    );

    console.log('addUser status', status)

    return await getUser(status['insertId']);
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
  addUser,
};