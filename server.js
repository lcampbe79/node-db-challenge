const express = require('express');
const helmet = require('helmet');

const ProjectsRouter = require('./projects/projects_router')
const server = express();

server.use(helmet())
server.use(express.json())

server.use('/api/projects', ProjectsRouter)

//initial GET
server.get('/', (req, res) => {
  res.send('Welcome to my Projects!')
})

module.exports = server;