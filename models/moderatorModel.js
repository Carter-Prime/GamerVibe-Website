'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {errorJson} = require('../utils/jsonMessages');

// Get moderator with given id
const getModerator = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Moderator ' +
        'WHERE moderator_id = ? ' +
        'AND ' +
        '(' +
        'TIMESTAMPDIFF(MINUTE, NOW(), moderator_until) > 0 ' +
        'OR moderator_until IS NULL ' +
        ')', [id],
    );
    return rows[0] ? rows[0] : errorJson('No moderator with given id');
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getModerator,
};