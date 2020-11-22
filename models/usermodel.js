'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

// TODO: Get correct information from users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute(
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
    const [user] = await promisePool.execute(
        'SELECT username, email FROM User WHERE userid = ?', [id],
    );
    return user[0] || errorJson(`No users found with id: ${id}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

// TODO: Get correct information for login
const getUserLogin = async (email) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM User WHERE email = ?', [email],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// TODO: Add correct information to user table
const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO User(username, email, passwd) VALUES(?,?,?)', params);
    // console.log('addUser rows', rows);

    return await getUser(rows['insertId']);
  } catch (e) {
    console.error('addUser error', e.message);
    if (e.code === 'ER_DUP_ENTRY') {
      const sliced = e.message.split('\'');
      const key = sliced[sliced.length - 2];
      return errorJson(`${key} already in use`);
    }
    return errorJson(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
  addUser,
};