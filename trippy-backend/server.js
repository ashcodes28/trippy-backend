const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
require('./config/db');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/itinerary', require('./routes/api/itinerary'));
app.use('/api/booking', require('./routes/api/booking'));
app.use('/api/review', require('./routes/api/review'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});