const express = require('express');
const router = express.Router();
const { healthCheck } = require('../controllers/healthController');

// Health check endpoint
router.get('/', healthCheck);

module.exports = router; 