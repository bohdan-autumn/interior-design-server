const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// Create new order
router.post('/', asyncHandler(async (req, res) => {
  const orderData = {
    userId: req.body.userId,
    designPackageId: req.body.designPackageId,
    customItems: req.body.customItems,
    totalPrice: req.body.totalPrice,
    customerInfo: req.body.customerInfo,
    status: req.body.status || 'PENDING'
  };

  const order = new Order(orderData);
  await order.save();
  res.status(201).json(order);
}));

// Get order by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
}));

// Update order status
router.patch('/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  if (status && !['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (status) {
    order.status = status;
  }
  await order.save();
  res.json(order);
}));

// Get orders by user ID
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });
  res.json(orders);
}));

module.exports = router; 