"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
const { errorJson } = require("../utils/jsonMessages");

// Get all users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.private_acc, u.imagename, " +
        "u.discord, u.youtube, u.twitch " +
        "FROM User AS u " +
        "WHERE u.deleted_at IS NULL " +
        "AND u.banned_at IS NULL"
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get user with given id
const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.imagename, " +
        "u.discord, u.youtube, u.twitch, u.private_acc, " +
        "(SELECT COUNT(*) " +
        " FROM Following AS f " +
        " WHERE f.follower_id = ? " +
        "AND f.canceled_at IS NULL " +
        ") AS following, " +
        "(SELECT COUNT(*) " +
        " FROM Following AS f " +
        " WHERE f.following_id = ? " +
        "AND f.canceled_at IS NULL " +
        ") AS followers, " +
        "(SELECT COUNT(*) " +
        " FROM Post AS p " +
        " WHERE p.user_id = ? " +
        " AND p.deleted_at IS NULL " +
        " AND p.banned_at IS NULL " +
        ") AS posts " +
        "FROM User AS u " +
        "WHERE u.user_id = ? " +
        "AND u.deleted_at IS NULL " +
        "AND u.banned_at IS NULL",
      [id, id, id, id]
    );
    return rows[0] ? rows[0] : errorJson(`No users found with id: ${id}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

// Get users login information
const getUserLogin = async (email) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.passwd, " +
        "u.imagename, u.theme, u.discord, u.youtube, u.twitch, u.created_at, " +
        "u.private_acc, m.moderator_since " +
        "FROM User AS u " +
        "LEFT JOIN Moderator AS m " +
        "ON u.user_id = m.moderator_id " +
        "AND (m.moderator_until IS NULL " +
        "OR TIMESTAMPDIFF(MINUTE, m.moderator_until, NOW()) < 0) " +
        "WHERE u.email = ? " +
        "AND u.deleted_at IS NULL " +
        "AND u.banned_at IS NULL",
      [email]
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Update users information
const updateUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      "UPDATE User " +
        "SET fname = ?, " +
        "lname = ?, " +
        "imagename = ?, " +
        "discord = ?, " +
        "youtube = ?, " +
        "twitch = ?, " +
        "private_acc = ? " +
        "WHERE user_id = ? " +
        "AND deleted_at IS NULL " +
        "AND banned_at IS NULL",
      params
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Add new user
const addUser = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO User(username, email, passwd, imagename) VALUES(?,?,?,?)",
      params
    );
    return await getUser(rows["insertId"]);
  } catch (e) {
    // Email or username is already in use
    if (e.code === "ER_DUP_ENTRY") {
      const sliced = e.message.split("'");
      const key = sliced[sliced.length - 2];
      return errorJson(`${key} already in use`);
    }
    return errorJson(e.message);
  }
};

// Search user with given name
const getupdateUserByName = async (name) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT u.user_id, u.username, u.fname, u.lname, u.email, u.imagename, " +
        "u.discord, u.youtube, u.twitch, u.private_acc " +
        "FROM User AS u " +
        "WHERE (username LIKE ?)" +
        "AND deleted_at IS NULL " +
        "AND banned_at IS NULL ",
      [name]
    );
    return rows ? [...rows] : errorJson(`No users found with name: ${name}`);
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserLogin,
  addUser,
  updateUser,
  getupdateUserByName,

};
