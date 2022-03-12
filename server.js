const express = require('express');

// const { createClient } = require('redis');

require('dotenv').config();

const { TEST, PORT } = process.env;

const app = express();

app.get('/', (req, res, next) => {
  return res.json({
    msg: 'Hello, here I am....',
  });
});

app.get('/api', async (req, res, next) => {
  try {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    await client.set('name', 'Kashif Ali');
    const value = await client.get('name');

    res.json({
      msg: `Welcome to the ${TEST}!`,
      redisValue: value,
    });
  } catch (error) {
    res.status(400);
    return res.json({
      msg: error.message,
    });
  }
});

const port = parseInt(process.env.PORT, 10) || 5000;

app.listen(port, () => {
  console.log(`We are listening over http://localhost:${port}`);
});
