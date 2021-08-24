const express = require('express')
const passport = require('passport')

const Product = require('../models/product')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const User = require('../models/user')
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

// GET single products
router.get('/products/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Product.findById(req.params.id)
		.then(handle404)
		.then((product) => res.status(200).json({ product: product.toObject() }))
		.catch(next)
})

// CREATE products
router.post('/products', requireToken, (req, res, next) => {
	const reqUserId = req.user.id
    const user = User.findById(reqUserId)
    
	Order.create(req.body.order)
		.then((order) => {
            if (user.isAdmin) {
                res.status(201).json({ order: order.toObject() })
            }
          //  else (return)
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
