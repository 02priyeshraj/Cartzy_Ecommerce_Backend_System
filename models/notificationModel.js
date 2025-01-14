const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['deal', 'update', 'announcement'], required: true },
    audience: { type: String, enum: ['all', 'admins', 'users'], default: 'all' },
    isActive: { type: Boolean, default: true }, // For marking the notification as active/inactive
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
