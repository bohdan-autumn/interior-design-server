const mongoose = require('mongoose');

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number },
  depth: { type: Number },
  height: { type: Number },
  unit: { type: String, enum: ['cm', 'm', 'ft', 'in'] }
});

const positionSchema = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  z: { type: Number }
});

const rotationSchema = new mongoose.Schema({
  x: { type: Number },
  y: { type: Number },
  z: { type: Number }
});

const furnitureItemSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  type: { type: String },
  dimensions: { type: dimensionsSchema },
  color: { type: String },
  material: { type: String },
  image: { type: String },
  price: { type: Number },
  isUserOwned: { type: Boolean },
  position: { type: positionSchema },
  rotation: { type: rotationSchema }
});

const customerInfoSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  zipCode: { type: String },
  country: { type: String },
  cardName: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String }
});

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  designPackageId: { type: String },
  customItems: [furnitureItemSchema],
  totalPrice: { type: Number },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  customerInfo: { type: customerInfoSchema },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema); 