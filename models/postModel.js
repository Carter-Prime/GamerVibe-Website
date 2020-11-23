'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/json_messages');

const add_new_post = async (...params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Post(user_id, caption, imgfilename) VALUES(?,?,?)',
        params);
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  add_new_post,
};