const Wishlist = require('../../models/wishlistModel');
const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel');

//1. Get User Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('items.productId');
    if (!wishlist) return res.status(200).json({ message: "Wishlist is empty", items: [] });

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist' });
  }
};

//2. Add Item to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [{ productId }] });
    } else {
      const exists = wishlist.items.some(item => item.productId.toString() === productId);
      if (exists) return res.status(400).json({ message: "Item already in wishlist" });

      wishlist.items.push({ productId });
    }

    await wishlist.save();
    res.status(200).json({ message: "Item added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
};

//3. Remove Item from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: "Item removed from wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ error: 'Error removing item' });
  }
};

// 4. Move Item from Wishlist to Cart
exports.moveToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    // Remove from Wishlist
    const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) return res.status(400).json({ message: "Item not found in wishlist" });

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();

    // Add to Cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [{ productId, quantity: 1 }] });
    } else {
      const cartItem = cart.items.find(item => item.productId.toString() === productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }
    await cart.save();

    res.status(200).json({ message: "Item moved to cart", wishlist, cart });
  } catch (error) {
    res.status(500).json({ error: 'Error moving item to cart' });
  }
};
