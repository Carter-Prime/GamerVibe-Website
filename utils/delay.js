'use strict';

// Random delay works with await-async
const delay = (t) => {
  return new Promise(resolve => setTimeout(resolve, t));
};

module.exports = {
  delay,
};