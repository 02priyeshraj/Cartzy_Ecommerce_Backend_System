const express = require('express');
const {
  getActiveBanners,
  getActiveCategories,
  getBestSellingProducts,
} = require('../../controllers/user/userHomePageController');

const router = express.Router();

router.get('/banners', getActiveBanners);
router.get('/categories', getActiveCategories);
router.get('/best-selling-products', getBestSellingProducts);

module.exports = router;
