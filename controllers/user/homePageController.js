const HomePage = require('../../models/homePageModel');

// 1. Fetch all active banners
exports.getActiveBanners = async (req, res, next) => {
  try {
    const homePage = await HomePage.findOne({});
    if (!homePage) {
      return res.status(404).json({ message: 'Home Page not found.' });
    }
    const activeBanners = homePage.banners.filter(banner => banner.isActive);
    res.status(200).json({ message: 'Active banners fetched successfully.', banners: activeBanners });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch all active categories
exports.getActiveCategories = async (req, res, next) => {
  try {
    const homePage = await HomePage.findOne({}).populate('topCategories.categoryId', 'name');
    if (!homePage) {
      return res.status(404).json({ message: 'Home Page not found.' });
    }
    const activeCategories = homePage.topCategories.filter(category => category.isActive);
    res.status(200).json({ message: 'Active categories fetched successfully.', categories: activeCategories });
  } catch (error) {
    next(error);
  }
};

exports.getTopCategories = async (req, res) => {
  try {
    const homePage = await HomePage.findOne().populate('topCategories.categoryId');

    if (!homePage) {
      return res.status(404).json({ message: 'Home page not found' });
    }

    res.status(200).json({ topCategories: homePage.topCategories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top categories', error: error.message });
  }
};



// 3. Fetch best-selling products
exports.getBestSellingProducts = async (req, res, next) => {
  try {
    const homePage = await HomePage.findOne({})
      .populate({
        path: 'bestSellingProducts',
        model: 'Product',
        select: '-__v', // Exclude MongoDB version key
      });

    if (!homePage) {
      return res.status(404).json({ message: 'Home Page not found.' });
    }

    res.status(200).json({
      message: 'Best-selling products fetched successfully.',
      products: homePage.bestSellingProducts,
    });
  } catch (error) {
    next(error);
  }
};