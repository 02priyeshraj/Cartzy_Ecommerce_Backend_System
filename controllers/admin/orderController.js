const Order = require('../../models/orderModel');

// Get all orders with filters
exports.getAllOrders = async (req, res) => {
  const { status } = req.query; // Optional filter for status

  try {
    const filters = status ? { status } : {};
    const orders = await Order.find(filters).populate('userId items.productId');

    res.status(200).json({ message: 'Orders retrieved successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Add or edit delivery agent details
exports.manageDeliveryAgent = async (req, res) => {
  const { orderId } = req.params;
  const { name, contact } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryAgent: { name, contact } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Delivery agent details updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery agent details', error: error.message });
  }
};
