require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Миддлвар для CORS
app.use(cors());

// Импорт маршрутов
const adminRoutes = require('./routes/admin');
const requestRoutes = require('./routes/requests');

app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Используем роуты для админа и запросов (без защиты токеном)
app.use('/admin', adminRoutes);
app.use('/requests', requestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
