const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  items: [
    {
      productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    }
  ]
});
const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite
