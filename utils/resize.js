'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, size, path) => {
  return await sharp(file).
      resize({width: size, height: size}).
      toFile(path);
};

module.exports = {
  makeThumbnail,
};