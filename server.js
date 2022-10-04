const express = require('express');

const vhost = require('vhost');

const { createClient } = require('redis');

require('dotenv').config();

const firstApp = require('./firstApp');

const { TEST, PORT } = process.env;
const app = express();

const secondApp = express();

secondApp.get('/', async (req, res, next) => {
  return res.json({
    msg: 'Testing...',
  });

  // try {
  //   const client = createClient();

  //   client.on('error', (err) => console.log('Redis Client Error', err));

  //   await client.connect();
  //   await client.set('name', 'Kashif Ali');
  //   const value = await client.get('name');

  //   res.json({
  //     msg: `Welcome to the ${TEST}!`,
  //     redisValue: value,
  //   });
  // } catch (error) {
  //   res.status(400);
  //   return res.json({
  //     msg: error.message,
  //   });
  // }
});

app.use(vhost('blog.hoxxain.com', firstApp)); // Serves second app
app.use(vhost('dev.hoxxain.com', secondApp)); // Serves first app

app.get('*', async (req, res, next) => {});

const port = parseInt(process.env.PORT, 10) || 5002;

app.listen(port, () => {
  console.log(`We are listening over http://localhost:${port}`);
});
