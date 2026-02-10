const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate('items.product');
  }
  return cart;
};

const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch cart', error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find((item) => item.product._id.toString() === productId);

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => item.product._id.toString() !== productId);

    await cart.save();
    await cart.populate('items.product');

    return res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
