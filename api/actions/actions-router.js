// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', (req, res) => {
  Actions.get()
  .then(actions => {
    res.status(200).json(actions)
  })
  //eslint-disable-next-line
  .catch(err => { 
    res.json({message: "Something went wrong getting the resource. sorry :("})
  })
})

module.exports = router