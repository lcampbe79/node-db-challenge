const express = require('express');

const server = express();


server.use(express.json())

//initial GET
server.get('/', (req, res) => {
  res.send('Welcome to my Projects!')
})

module.exports = server;