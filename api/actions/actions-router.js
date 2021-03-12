// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const actionList = await Actions.get()
    res.status(200).json(actionList)
  } catch(err) {
    next(err)
  }


})
  
router.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id
    const action = await Actions.get(id)
    if(!action){
      res.status(404).json({message: `Sorry, ${id} is not a valid id. Please use a different one`})
    }else{
      res.status(200).json(action)
    }
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    if(!req.body.project_id || !req.body.description || !req.body.notes){
      res.status(400).json({message: "Needs a name and description!"})
    }else{
      const newAction = await Actions.insert(req.body)
      res.status(200).json(newAction)
    }
  } catch(err){
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const changes = req.body
    // const projectId = changes.project_id
    // const description = changes.description
    // const notes = changes.notes
    // const complete = changes.completed
    const id = req.params.id
    if(!changes.project_id || !changes.description || !changes.completed || !changes.notes){
      res.status(400).json({message: "this request must contain all fields"})
    }else{
      const updatedAction = await Actions.update(id, changes)
      res.json(updatedAction)
    }
  }catch(err){
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try{
    const deleted = await Actions.remove(id)
    res.json(deleted)
  } catch(err) {
    next(err)
  }
})

module.exports = router