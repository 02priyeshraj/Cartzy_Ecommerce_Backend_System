const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    phone: { type: String }, 
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    }, // User-specific
    ordersPlaced: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], // User-specific
    isDisabled: { type: Boolean, default: false }, // Admin toggle for disabling accounts
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
