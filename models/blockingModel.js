'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

// Get list of users that are
const getUsersBlockedByUser = async (uid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT DISTINCT b.blocker_id, b.blocking_id, b.blocked_at, b.unblocked_at, ' +
        '( ' +
        'SELECT username ' +
        'FROM User bu ' +
        'WHERE b.blocking_id = bu.user_id ' +
        ') BlockedUsername ' +
        'FROM ' +
        'User AS u, ' +
        'Following AS f, ' +
        'Blocking AS b ' +
        'WHERE u.user_id = b.blocker_id ' +
        'AND u.user_id = ? ' +
        'AND b.unblocked_at IS NULL', [uid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Checks if user is already blocked by user
const checkBlocked = async (uid, bid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * ' +
        'FROM Blocking ' +
        'WHERE blocker_id = ? ' +
        'AND blocking_id = ? ' +
        'AND unblocked_at IS NULL', [uid, bid],
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// For blocking user
const blockUser = async (uid, bid) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Blocking(blocker_id, blocking_id) ' +
        'VALUES(?,?)', [uid, bid],
    );
    return rows['affectedRows'] === 1 ?
        messageJson('User blocked successfully') :
        errorJson('User already blocked');
  } catch (e) {
    return errorJson(e.message);
  }
};

// For unblocking user
const unblockUser = async (uid, bid) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE Blocking ' +
        'SET unblocked_at = NOW() ' +
        'WHERE blocker_id = ? ' +
        'AND blocking_id = ? ' +
        'AND unblocked_at IS NULL', [uid, bid],
    );
    return rows['affectedRows'] === 1 ?
        messageJson('User unblocked successfully') :
        errorJson('User is not blocked');
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getUsersBlockedByUser,
  blockUser,
  checkBlocked,
  unblockUser
};