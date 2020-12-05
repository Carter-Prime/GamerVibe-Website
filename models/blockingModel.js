'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson, messageJson} = require('../utils/json_messages');

const get_users_banned_by_user = async (uid) => {
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
    // console.log('blockingModel get_users_banned_by_user rows', rows);
    return rows;
  } catch (e) {
    // console.log('blockingModel get_users_banned_by_user error', e.message);
    return errorJson(e.message);
  }
};

const checkBlocked = async (uid, bid) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * ' +
        'FROM Blocking ' +
        'WHERE blocker_id = ? ' +
        'AND blocking_id = ? ' +
        'AND unblocked_at IS NULL', [uid, bid],
    );
    // console.log('blockingModel get_users_banned_by_user rows', rows);
    return rows;
  } catch (e) {
    // console.log('blockingModel get_users_banned_by_user error', e.message);
    return errorJson(e.message);
  }
};

const blockUser = async (uid, bid) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Blocking(blocker_id, blocking_id) ' +
        'VALUES(?,?)', [uid, bid],
    );
    // console.log('blockingModel get_users_banned_by_user rows', rows);
    return rows['affectedRows'] === 1 ?
        messageJson('User blocked successfully') :
        errorJson('User already blocked');
  } catch (e) {
    // console.log('blockingModel get_users_banned_by_user error', e.message);
    return errorJson(e.message);
  }
};

module.exports = {
  get_users_banned_by_user,
  blockUser,
  checkBlocked
};