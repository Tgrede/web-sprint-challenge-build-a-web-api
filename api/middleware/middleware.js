const Projects = require('../projects/projects-model')
const Actions = require('../actions/actions-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date()
  
  req.date = date
  console.log('logger has been met! prepare to meet your doom >:)')
  console.log(`${req.method} request to http://<Base-URL>${req.url} on ${req.date}`)
  next()
}

async function validateProjectIdExists(req, res, next){
  const checkId = req.params.id
  const project = await Projects.get(checkId)
  
  if(!project){
    res.status(404).json({message: "sorry, not found :("})
  } else {
    next()
  }
}
module.exports = {
  logger,
  validateProjectIdExists
}