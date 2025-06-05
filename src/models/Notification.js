const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String },
  type: {
    type: String,
    enum: ['NEW_ORDER', 'ORDER_STATUS_CHANGE', 'PAYMENT_RECEIVED', 'CUSTOMER_MESSAGE']
  },
  message: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema); 