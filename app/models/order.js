const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    contents: [
      // {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Product',
      // },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    coupon: String,
    completed: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    minimize: false
  }
)

module.exports = mongoose.model('Order', orderSchema)
