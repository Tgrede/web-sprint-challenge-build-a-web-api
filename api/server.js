// Complete your server here!
// Do NOT `server.listen()` inside this file!
const express = require('express');
const server = express();
const {logger} = require('./middleware/middleware')
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())
server.use(logger)

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.use('/', (req, res) => {
  res.send('<h1>Hello! Welcome to the sprint challenge!</h1>')
})

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message, // DEV
    stack: err.stack, // DEV
    custom: 'something went wrong here. sorry :(', // PRODUCTION
  })
})

module.exports = server;
