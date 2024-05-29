const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  imagePath: {type: String, required: true},
  offer: { type: String, default: '0' },
  category: {
    type: String,
    required: true
  },
  description: {type: String},

})

const Product = mongoose.model('Product', productSchema);
module.exports = Product

