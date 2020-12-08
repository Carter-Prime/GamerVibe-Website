'use strict';
const sharp = require('sharp');

// For making thumbnail
const makeThumbnail = async (file, size, path) => {
  return await sharp(file).
      resize({width: size, height: size}).
      toFile(path);
};

module.exports = {
  makeThumbnail,
};