'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

const banUser = async (mid, bid, reason) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE User ' +
        'SET banned_at = NOW(), ' +
        'banned_by = ?, ' +
        'banned_reason = ? ' +
        'WHERE user_id = ? ' +
        'AND deleted_at IS NULL ' +
        'AND banned_at IS NULL', [mid, reason, bid],
    );
    // console.log('banModel banUser rows', rows);
    return rows['affectedRows'] === 1 ?
        messageJson('User banned') :
        errorJson('User banned or deleted already');
  } catch (e) {
    // console.log('banModel banUser error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  banUser
};