const express = require('express');
const {
  addCategory,
  editCategory,
  deleteCategory,
  getAllCategories,
} = require('../../controllers/admin/categoryController');
const authenticate = require('../../middlewares/authMiddleware'); // Authentication middleware

const router = express.Router();

router.post('/add', authenticate, addCategory); // Add a category
router.put('/edit/:id', authenticate, editCategory); // Edit a category
router.delete('/delete/:id', authenticate, deleteCategory); // Delete a category
router.get('/', authenticate, getAllCategories); // Get all categories

module.exports = router;
