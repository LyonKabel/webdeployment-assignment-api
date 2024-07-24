// server/models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number
});

module.exports = mongoose.model('Car', carSchema);
