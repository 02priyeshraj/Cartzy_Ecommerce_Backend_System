const express = require('express');
const {
  addProduct,
  editProduct,
  deleteProduct,
  setStock,
  assignDiscount,
  getAllProducts,
  getProductByName,
  searchProductsByName,
} = require('../../controllers/admin/productController');
const authenticate = require('../../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();

router.post('/add', authenticate, addProduct); // Add a product
router.put('/edit/:id', authenticate, editProduct); // Edit a product
router.delete('/delete/:id', authenticate, deleteProduct); // Delete a product
router.patch('/set-stock/:id', authenticate, setStock); // Set stock
router.patch('/assign-discount/:id', authenticate, assignDiscount); // Assign discount
router.get('/all', authenticate, getAllProducts); // Get all products
router.get('/name/:name', authenticate, getProductByName); // Get product by exact name
router.get('/search', authenticate, searchProductsByName); // Search products by partial name


module.exports = router;
