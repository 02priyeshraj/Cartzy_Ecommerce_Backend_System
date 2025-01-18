const express = require('express');
const {
  addBanner,
  editBanner,
  removeBanner,
  getActiveBanners,
  addTopCategory,
  editTopCategory,
  removeTopCategory,
  addBestSellingProducts,
  getTopCategories, 
  getBestSellingProducts,  
} = require('../../controllers/admin/adminHomePageController');
const authenticate = require('../../middlewares/authMiddleware');

const router = express.Router();

// Banner management
router.post('/banner', authenticate, addBanner);
router.put('/banner', authenticate, editBanner);
router.delete('/banner/:bannerId', authenticate, removeBanner);
router.get('/banners/active', authenticate, getActiveBanners);


// Top categories management
router.post('/top-category', authenticate, addTopCategory);
router.put('/top-category', authenticate, editTopCategory);
router.delete('/top-category/:categoryId', authenticate, removeTopCategory);

// Best selling products management
router.post('/best-selling', authenticate, addBestSellingProducts);

// Get all top categories
router.get('/top-categories', authenticate, getTopCategories);

// Get all best-selling products
router.get('/best-selling', authenticate, getBestSellingProducts);

module.exports = router;
