const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},

  items: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
      amount: {type: Number, required: true, default: 1},
      filePath: {type: String},
    }
  ]
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart
