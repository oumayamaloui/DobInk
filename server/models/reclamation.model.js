const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reclamation = mongoose.model('Reclamation', reclamationSchema);

module.exports = Reclamation;
