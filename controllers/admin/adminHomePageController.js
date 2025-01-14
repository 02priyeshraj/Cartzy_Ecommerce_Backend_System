const HomePage = require('../../models/adminHomePageModel');

// Upload a new banner
exports.addBanner = async (req, res) => {
  const { image, link } = req.body;

  try {
    let homePage = await HomePage.findOne();

    if (!homePage) {
      homePage = new HomePage();
    }

    homePage.banners.push({ image, link });
    await homePage.save();

    res.status(201).json({ message: 'Banner added successfully', banners: homePage.banners });
  } catch (error) {
    res.status(500).json({ message: 'Error adding banner', error: error.message });
  }
};

// Edit an existing banner
exports.editBanner = async (req, res) => {
  const { bannerId, image, link, isActive } = req.body;

  try {
    const homePage = await HomePage.findOne();

    if (!homePage) {
      return res.status(404).json({ message: 'Home page not found' });
    }

    const banner = homePage.banners.id(bannerId);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    if (image !== undefined) banner.image = image;
    if (link !== undefined) banner.link = link;
    if (isActive !== undefined) banner.isActive = isActive;

    await homePage.save();

    res.status(200).json({ message: 'Banner updated successfully', banners: homePage.banners });
  } catch (error) {
    res.status(500).json({ message: 'Error updating banner', error: error.message });
  }
};

// Remove a banner
exports.removeBanner = async (req, res) => {
  const { bannerId } = req.params;

  try {
    const homePage = await HomePage.findOne();

    if (!homePage) {
      return res.status(404).json({ message: 'Home page not found' });
    }

    homePage.banners = homePage.banners.filter(banner => banner._id.toString() !== bannerId);
    await homePage.save();

    res.status(200).json({ message: 'Banner removed successfully', banners: homePage.banners });
  } catch (error) {
    res.status(500).json({ message: 'Error removing banner', error: error.message });
  }
};

// Add a top category
exports.addTopCategory = async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    let homePage = await HomePage.findOne();

    if (!homePage) {
      homePage = new HomePage();
    }

    homePage.topCategories.push({ name, categoryId });
    await homePage.save();

    res.status(201).json({ message: 'Top category added successfully', topCategories: homePage.topCategories });
  } catch (error) {
    res.status(500).json({ message: 'Error adding top category', error: error.message });
  }
};

// Edit a top category
exports.editTopCategory = async (req, res) => {
  const { categoryId, name, isActive } = req.body;

  try {
    const homePage = await HomePage.findOne();

    if (!homePage) {
      return res.status(404).json({ message: 'Home page not found' });
    }

    const category = homePage.topCategories.id(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Top category not found' });
    }

    if (name !== undefined) category.name = name;
    if (isActive !== undefined) category.isActive = isActive;

    await homePage.save();

    res.status(200).json({ message: 'Top category updated successfully', topCategories: homePage.topCategories });
  } catch (error) {
    res.status(500).json({ message: 'Error updating top category', error: error.message });
  }
};

// Remove a top category
exports.removeTopCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const homePage = await HomePage.findOne();

    if (!homePage) {
      return res.status(404).json({ message: 'Home page not found' });
    }

    homePage.topCategories = homePage.topCategories.filter(category => category._id.toString() !== categoryId);
    await homePage.save();

    res.status(200).json({ message: 'Top category removed successfully', topCategories: homePage.topCategories });
  } catch (error) {
    res.status(500).json({ message: 'Error removing top category', error: error.message });
  }
};

// Add products to "Best Selling" section
exports.addBestSellingProducts = async (req, res) => {
  const { productIds } = req.body;

  try {
    let homePage = await HomePage.findOne();

    if (!homePage) {
      homePage = new HomePage();
    }

    homePage.bestSellingProducts = productIds;
    await homePage.save();

    res.status(201).json({ message: 'Best selling products updated successfully', bestSellingProducts: homePage.bestSellingProducts });
  } catch (error) {
    res.status(500).json({ message: 'Error updating best selling products', error: error.message });
  }
};
