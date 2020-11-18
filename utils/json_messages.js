'use strict';

const errorJson = (msg) => {
  return {error: msg};
};

const messageJson = (msg) => {
  return {message: msg};
};

module.exports = {
  errorJson,
  messageJson,
};