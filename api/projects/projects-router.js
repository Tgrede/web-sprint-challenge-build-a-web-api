// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()
const {validateProjectIdExists} = require('../middleware/middleware')

router.get('/', async (req, res, next) => {
  try{
    const projectsList = await Projects.get()
    res.status(200).json(projectsList)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const id = req.params.id
    const project = await Projects.get(id)
    if(!project){
      res.status(404).json({message: `no project found with id of ${id}. sorry :(`})
    }
    res.status(200).json(project)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    if(!req.body.name || !req.body.description){
      res.status(400).json({message: `needs both a name and description to be valid`})
    }else{
      const newProject = await Projects.insert(req.body)
      res.status(200).json(newProject)
    }
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const changes = req.body
    const id = req.params.id
    if(!changes.name || !changes.description || !changes.completed){
      res.status(400).json({message: "this request must contain all fields"})
    }else{
      const updatedProject = await Projects.update(id, changes)
      res.json(updatedProject)
    }
  }catch(err){
    next(err)
  }
})

router.delete('/:id',validateProjectIdExists, async(req, res, next) => {
  const id = req.params.id
  try{
    const deleted = await Projects.remove(id)
    res.json(deleted)
  } catch(err) {
    next(err)
  }
})

router.get('/:id/actions', async(req, res, next) => {
  const id = req.params.id
  try{
    const actionsArr = await Projects.getProjectActions(id)
    res.json(actionsArr)
  }catch(err){
    next(err)
  }
})  
  
module.exports = router