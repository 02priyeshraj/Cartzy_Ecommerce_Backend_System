const express = require('express');
const {
  addNotification,
  editNotification,
  deleteNotification,
  listNotifications,
} = require('../../controllers/admin/notificationController');
const authenticate = require('../../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();

router.post('/add', authenticate, addNotification); // Add a notification
router.put('/edit/:id', authenticate, editNotification); // Edit a notification
router.delete('/delete/:id', authenticate, deleteNotification); // Delete a notification
router.get('/list', authenticate, listNotifications); // List all notifications

module.exports = router;
