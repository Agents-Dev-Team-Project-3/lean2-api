const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: String,
    inStock: {
      type: Boolean,
      required: true
    },
    // number of product in stock
    // for non-sized or color products
    stock: Number,
    color: String,
    size: String
  },
  {
    timestamps: true,
    minimize: false
  }
)

module.exports = mongoose.model('Product', productSchema)
