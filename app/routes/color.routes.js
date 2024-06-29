module.exports = (app) => {
  const colors = require('../controllers/color.controller.js')

  var router = require('express').Router()

  // Create a new Colors
  router.post('/', colors.create)

  // Retrieve all Colors
  router.get('/', colors.findAll)

  // Retrieve a single Colors with id
  router.get('/:id', colors.findOne)

  // Update a Colors with id
  router.put('/:id', colors.update)

  // Delete a Colors with id
  router.delete('/:id', colors.delete)

  app.use('/api/colors', router)
}
