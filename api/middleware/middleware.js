function logger(req, res, next) {
  // DO YOUR MAGIC
  const date = new Date()
  
  req.date = date
  console.log('logger has been met! prepare to meet your doom >:)')
  console.log(`${req.method} request to http://<Base-URL>${req.url} on ${req.date}`)
  next()
}

module.exports = {
  logger
}