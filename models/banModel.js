'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

// For banning user
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

// For unbanning user
const unbanUser = async (bid) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE User ' +
        'SET banned_at = NULL, ' +
        'banned_by = NULL, ' +
        'banned_reason = NULL ' +
        'WHERE user_id = ? ' +
        'AND banned_at IS NOT NULL', [bid],
    );
    return rows['affectedRows'] === 1 ?
        messageJson('User banned') :
        errorJson('User is not banned');
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  banUser,
  unbanUser,
};