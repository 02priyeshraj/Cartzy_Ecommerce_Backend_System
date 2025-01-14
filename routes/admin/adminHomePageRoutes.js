const express = require('express');
const {
  addBanner,
  editBanner,
  removeBanner,
  addTopCategory,
  editTopCategory,
  removeTopCategory,
  addBestSellingProducts,
} = require('../../controllers/admin/adminHomePageController');
const authenticate = require('../../middlewares/authMiddleware');

const router = express.Router();

// Banner management
router.post('/banner', authenticate, addBanner);
router.put('/banner', authenticate, editBanner);
router.delete('/banner/:bannerId', authenticate, removeBanner);

// Top categories management
router.post('/top-category', authenticate, addTopCategory);
router.put('/top-category', authenticate, editTopCategory);
router.delete('/top-category/:categoryId', authenticate, removeTopCategory);

// Best selling products management
router.post('/best-selling', authenticate, addBestSellingProducts);

module.exports = router;
