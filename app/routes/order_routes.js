const express = require('express')
const passport = require('passport')

const Order = require('../models/order')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// GET All orders
router.get('/orders', requireToken, (req, res, next) => {
  Order.find({owner: req.user._id})
    .then(orders => {
      return orders.map(order => order.toObject())
    })
    .then(orders => res.status(200).json({ orders: orders }))
    .catch(next)
})

// GET single order
router.get('/orders/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Order.findById(req.params.id)
    .then(handle404)
    .then((order) => (
      requireOwnership(req, order)
    ))
    .then((order) => res.status(200).json({ order: order.toObject() }))
    .catch(next)
})

// CREATE
router.post('/orders', requireToken, (req, res, next) => {
  req.body.order.owner = req.user.id
  Order.create(req.body.order)
    .then(order => {
      res.status(201).json({ order: order.toObject() })
    })
    .catch(next)
})

// UPDATE order
router.patch('/examples/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.example.owner

  Example.findById(req.params.id)
    .then(handle404)
    .then(example => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, example)

      // pass the result of Mongoose's `.update` to the next `.then`
      return example.updateOne(req.body.example)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/examples/:id', requireToken, (req, res, next) => {
  Example.findById(req.params.id)
    .then(handle404)
    .then(example => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, example)
      // delete the example ONLY IF the above didn't throw
      example.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
