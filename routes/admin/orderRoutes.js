const express = require('express');
const { getAllOrders, updateOrderStatus, manageDeliveryAgent } = require('../../controllers/admin/orderController');
const authenticate = require('../../middlewares/authMiddleware'); // Middleware for admin authentication

const router = express.Router();

router.get('/', authenticate, getAllOrders); // Admin views all orders
router.put('/:orderId/status', authenticate, updateOrderStatus); // Admin updates order status
router.put('/:orderId/delivery-agent', authenticate, manageDeliveryAgent); // Admin adds/edits delivery agent details

module.exports = router;
