const Category = require('../../models/categoryModel');

// Add a new category
exports.addCategory = async (req, res) => {
  const { name, parent, image } = req.body;

  try {
    const category = new Category({ name, parent, image });
    await category.save();

    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error: error.message });
  }
};

// Edit an existing category
exports.editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parent, image } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, parent, image },
      { new: true } // Return the updated document
    );

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if category has subcategories
    const hasSubcategories = await Category.exists({ parent: id });
    if (hasSubcategories) {
      return res.status(400).json({ message: 'Cannot delete a category with subcategories' });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent', 'name'); // Populate parent category name
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};
