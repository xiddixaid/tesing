const express = require('express');

const redisClient = require('./redis');

require('dotenv').config();

const { TEST, PORT } = process.env;

const app = express();

app.get('/', async (req, res, next) => {
  try {
    await redisClient.connect();
    await redisClient.set('name', 'Kashif Ali');
    const value = await redisClient.get('name');

    res.json({
      msg: `Welcome to the ${TEST}!`,
      redisValue: value,
    });
  } catch (error) {
    next(error);
  }
});

const port = parseInt(process.env.PORT, 10) || 5000;

app.listen(port, () => {
  console.log(`We are listening over http://localhost:${port}`);
});
