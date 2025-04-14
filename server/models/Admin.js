const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Импорт bcrypt

const adminSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true }
});

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Хешировать только если пароль изменен
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
