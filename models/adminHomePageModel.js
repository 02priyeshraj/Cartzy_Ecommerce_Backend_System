const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or file path
  link: { type: String }, // Optional link for the banner
  isActive: { type: Boolean, default: true },
});

const homePageSchema = new mongoose.Schema({
  banners: [bannerSchema],
  topCategories: [
    {
      name: { type: String, required: true },
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
      isActive: { type: Boolean, default: true },
    },
  ],
  bestSellingProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ],
}, { timestamps: true });

module.exports = mongoose.model('HomePage', homePageSchema);
