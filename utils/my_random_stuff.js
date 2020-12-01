'use strict'
const fs = require('fs')
const resize = require('./resize')
const {errorJson} = require('./json_messages')

// Make thumbnail
const make_thumbnail = async (file, path) => {
  try {
    // Creates thumbnails directory if it not exists
    // https://stackoverflow.com/a/26815894
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    return await resize.makeThumbnail(file.path, 300,
        `${path}/${file.filename}`);
  } catch (e) {
    // console.error('postController make_thumbnail error', e.message);
    return errorJson(e.message);
  }
};

// Delete uploaded file from system
const delete_file = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    // console.error('postController new_post fs.unlink', e.message);
  }
}

module.exports = {
  delete_file,
  make_thumbnail
}