const express = require('express')
const passport = require('passport')

const Order = require('../models/order')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const order = require('../models/order')
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

//=============
router.patch('/orders/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.order.owner
  Order.findById(req.params.id)
    .then(handle404)
    .then((order) => {
      requireOwnership(req, order)
      return order.updateOne(req.body.order)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE order
// router.patch('/orders/:id', requireToken, removeBlanks, (req, res, next) => {
//   delete req.body.order.owner
//   Order.findById(req.params.id)
//     .then(handle404)
//     .then((order) => {
//       requireOwnership(req, order)
//       return order.updateOne(req.body.order)  
//     }
//     )
//     .then((order) => {
//       res.status(201).json({ order: order.toObject() })
//     })
//     .catch(next)
// })

// DELETE order
router.delete('/orders/:id', requireToken, (req, res, next) => {
  Order.findById(req.params.id)
    .then(handle404)
    .then(order => {
      requireOwnership(req, order)
      order.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
