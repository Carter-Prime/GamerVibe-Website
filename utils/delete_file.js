'use strict'
const fs = require('fs')

// Delete uploaded file from system
const delete_file = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    // console.error('postController new_post fs.unlink', e.message);
  }
}

module.exports = {
  delete_file
}