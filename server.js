const express = require('express');

require('dotenv').config();

const { TEST, PORT } = process.env;

const app = express();

app.get('/', (req, res, next) => {
  try {
    res.json({
      msg: `Welcome to the ${TEST}!`,
    });
  } catch (error) {
    next(error);
  }
});

const port = parseInt(process.env.PORT, 10) || 5001;

app.listen(port, () => {
  console.log(`We are listening over http://localhost:${port}`);
});
