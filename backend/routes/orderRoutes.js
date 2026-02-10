const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      return res.status(400).json({ message: 'shippingAddress is required' });
    }

    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user.cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = user.cart.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount
    });

    user.cart = [];
    await user.save();

    return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    return res.status(500).json({ message: 'Could not place order', error: error.message });
  }
});

// GET /api/orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name imageUrl')
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch orders', error: error.message });
  }
});

module.exports = router;
