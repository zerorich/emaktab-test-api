const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// POST /requests — создание заявки
router.post('/', async (req, res) => {
  const { login, pass } = req.body;
  try {
    const request = new Request({ login, pass });
    await request.save();
    res.status(201).json({ message: 'Request saved' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving request' });
  }
});

// ✅ GET /requests — получение всех заявок
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    console.error('Ошибка при получении заявок:', error);
    res.status(500).json({ error: 'Ошибка при получении заявок' });
  }
});

module.exports = router;
