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
} = require('../../controllers/admin/homePageController');
const authenticate = require('../../middlewares/authMiddleware');

const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Banner management
router.post('/banner', authenticate, upload.single('image'), addBanner);
router.put('/banner', authenticate, upload.single('image'), editBanner);
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
