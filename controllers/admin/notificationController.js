const Notification = require('../../models/notificationModel');

// Add a notification
exports.addNotification = async (req, res) => {
  const { title, message, type, audience } = req.body;

  try {
    const notification = new Notification({
      title,
      message,
      type,
      audience,
    });

    await notification.save();

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};

// Edit a notification
exports.editNotification = async (req, res) => {
  const { id } = req.params;
  const { title, message, type, audience, isActive } = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { title, message, type, audience, isActive },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification updated successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};

// List all notifications
exports.listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Notifications fetched successfully', notifications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};
