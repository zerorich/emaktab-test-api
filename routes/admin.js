const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// Роут для регистрации админа
router.post('/', async (req, res) => {
  const { login, pass } = req.body;

  try {
    if (!login || !pass) {
      return res.status(400).json({ error: 'Login and password are required' });
    }

    const existingAdmin = await Admin.findOne({ login });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this login already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const admin = new Admin({ login, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin saved' });
  } catch (error) {
    console.error('Error saving admin:', error);
    res.status(500).json({ error: 'Error saving admin' });
  }
});

// Роут для авторизации админа (без токена)
router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const admin = await Admin.findOne({ login });
    if (!admin) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, admin.password); // Сравниваем хешированные пароли
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    res.json({ message: 'Успешная авторизация' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
