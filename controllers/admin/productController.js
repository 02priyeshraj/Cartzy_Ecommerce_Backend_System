const Product = require('../../models/productModel');
const { uploadToS3 } = require('../../helpers/awsUpload');

const calculateDiscountedPrice = (MRP, discountPercentage) => {
  return MRP - (MRP * discountPercentage) / 100;
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, MRP, price, stock, specifications, discount } = req.body;

    let imageUrls = [];
    if (req.files) {
      imageUrls = await Promise.all(req.files.map(file => uploadToS3(file, "product-images")));
    }

    const discountedPrice = discount ? calculateDiscountedPrice(MRP, discount.percentage) : MRP;

    const product = new Product({
      name,
      description,
      category,
      MRP,
      price,
      stock,
      images: imageUrls,
      specifications,
      discount,
      discountedPrice,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, MRP, price, stock, specifications, discount } = req.body;

    let updateData = { name, description, category, MRP, price, stock, specifications, discount };

    if (req.files) {
      updateData.images = await Promise.all(req.files.map(file => uploadToS3(file, "product-images")));
    }

    const discountedPrice = discount ? calculateDiscountedPrice(MRP, discount.percentage) : MRP;
    updateData.discountedPrice = discountedPrice;

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

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
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const discountedPrice = calculateDiscountedPrice(product.MRP, percentage);

    product.discount = { percentage, validTill };
    product.discountedPrice = discountedPrice;

    await product.save();

    res.status(200).json({ message: 'Discount assigned successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning discount', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get product by name
exports.getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product retrieved successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Search products by name (partial match)
exports.searchProductsByName = async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.find({ name: new RegExp(query, 'i') });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

