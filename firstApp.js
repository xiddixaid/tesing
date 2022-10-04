const express = require('express');

const firstApp = express();

firstApp.get('/', (req, res, next) => {
  return res.json({
    msg: 'Hello, here I am....',
  });
});

module.exports = firstApp;
