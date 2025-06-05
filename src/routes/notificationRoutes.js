const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const asyncHandler = require('express-async-handler');

// Create new notification
router.post('/', asyncHandler(async (req, res) => {
  const notificationData = {
    userId: req.body.userId,
    type: req.body.type,
    message: req.body.message,
    read: req.body.read !== undefined ? req.body.read : false
  };

  const notification = new Notification(notificationData);
  await notification.save();
  res.status(201).json(notification);
}));

// Get unread notifications
router.get('/unread', asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ read: false })
    .sort({ createdAt: -1 });
  res.json(notifications);
}));

// Mark notification as read
router.patch('/:id/read', asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  
  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  notification.read = true;
  await notification.save();
  res.json(notification);
}));

// Get notifications by user ID
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });
  res.json(notifications);
}));

module.exports = router; 