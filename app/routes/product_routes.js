const express = require('express')
const passport = require('passport')

const Product = require('../models/product')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const product = require('../models/product')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// GET All products
router.get('/products', (req, res, next) => {
	Product.find()
		.then((products) => {
			return products.map((product) => product.toObject())
		})
		.then((products) => res.status(200).json({products: products }))
		.catch(next)
})

// GET single order
router.get('/orders/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Order.findById(req.params.id)
		.then(handle404)
		.then((order) => requireOwnership(req, order))
		.then((order) => res.status(200).json({ order: order.toObject() }))
		.catch(next)
})

// CREATE
router.post('/orders', requireToken, (req, res, next) => {
	req.body.order.owner = req.user.id
	Order.create(req.body.order)
		.then((order) => {
			res.status(201).json({ order: order.toObject() })
		})
		.catch(next)
})

// UPDATE order
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

// DELETE order
router.delete('/orders/:id', requireToken, (req, res, next) => {
	Order.findById(req.params.id)
		.then(handle404)
		.then((order) => {
			requireOwnership(req, order)
			order.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

module.exports = router
