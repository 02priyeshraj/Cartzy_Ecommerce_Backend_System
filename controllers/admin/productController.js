const Product = require('../../models/productModel');

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, category, price, stock, images, specifications } = req.body;

  try {
    const product = new Product({
      name,
      description,
      category,
      price,
      stock,
      images,
      specifications,
    });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

// Edit a product
exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, stock, images, specifications } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, category, price, stock, images, specifications },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Set stock for a product
exports.setStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Stock updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error: error.message });
  }
};

// Assign discount to a product
exports.assignDiscount = async (req, res) => {
  const { id } = req.params;
  const { percentage, validTill } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { discount: { percentage, validTill } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Discount assigned successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning discount', error: error.message });
  }
};
