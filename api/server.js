// Complete your server here!
// Do NOT `server.listen()` inside this file!
const express = require('express');
const server = express();
const {logger} = require('./middleware/middleware')
const actionsRouter = require('./actions/actions-router')

server.use(express.json())
server.use(logger)

server.use('/api/actions', actionsRouter)

server.use('/', (req, res) => {
  res.send('<h1>Hello! Welcome to the sprint challenge!</h1>')
})

server.use('*', (req, res) => {
  res.send('<h1>There is nothing here. you have reached the end of the road. Please try another endpoint.</h1>')
})

module.exports = server;
