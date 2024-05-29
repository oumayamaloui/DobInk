const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  status: {type: String, default: 'active'},
  resetToken: String,
  resetTokenExpires: Date,
  address: String,
  phone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
