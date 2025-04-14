const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  login: { type: String, required: true },
  pass: { type: String, required: true }
});

module.exports = mongoose.model('Request', requestSchema);
