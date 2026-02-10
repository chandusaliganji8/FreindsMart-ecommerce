const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/cart
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch cart', error: error.message });
  }
});

// POST /api/cart/add
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    const existingItem = user.cart.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate('cart.product');

    return res.status(200).json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: 'Could not add item to cart', error: error.message });
  }
});

// DELETE /api/cart/remove/:productId
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);

    await user.save();
    await user.populate('cart.product');

    return res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    return res.status(500).json({ message: 'Could not remove item from cart', error: error.message });
  }
});

module.exports = router;
