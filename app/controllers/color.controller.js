const Color = require('../models/color.model.js')

// Create and Save a new Color
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Color
  const color = new Color({
    label: req.body.label,
    value: req.body.value,
  })

  // Save Color in the database
  Color.create(color, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Color.',
      })
    else res.send(data)
  })
}

// Retrieve all colors from the database (with condition).
exports.findAll = (req, res) => {
  const label = req.query.label

  Color.getAll(label, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving colors.',
      })
    else res.send({ colors: data })
  })
}

// Find a single Color by Id
exports.findOne = (req, res) => {
  Color.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Color with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Color with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

// Update a Color identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Color.updateById(req.params.id, new Color(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Color with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error updating Color with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

// Delete a Color with the specified id in the request
exports.delete = (req, res) => {
  Color.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Color with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Color with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Color was deleted successfully!` })
  })
}
