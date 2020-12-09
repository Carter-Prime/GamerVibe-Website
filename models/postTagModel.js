"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
const { errorJson } = require("../utils/jsonMessages");

// Get given post tags
const getTags = async (postId) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT t.post_id, t.tag, t.tagged_at " +
        "FROM PostTag AS t " +
        "WHERE post_id = ? " +
        "AND untagged_at IS NULL",
      [postId]
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

// Add one tag to given post
const addTag = async (postId, tag) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "INSERT INTO PostTag(post_id, tag) VALUES(?, ?) ",
      [postId, tag]
    );
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getTags,
  addTag,
};
