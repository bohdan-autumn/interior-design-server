const mongoose = require('mongoose');

const healthCheck = async (req, res) => {
  try {
    // Check MongoDB connection
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const status = {
      service: 'Interior Design Platform API',
      status: 'operational',
      timestamp: new Date(),
      database: {
        status: dbStatus[dbState],
        connected: dbState === 1
      },
      uptime: process.uptime()
    };

    const statusCode = dbState === 1 ? 200 : 503;
    res.status(statusCode).json(status);
  } catch (error) {
    res.status(500).json({
      service: 'Interior Design Platform API',
      status: 'error',
      timestamp: new Date(),
      error: error.message
    });
  }
};

module.exports = {
  healthCheck
}; 