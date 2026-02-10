const express = require('express');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const query = {};

    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch products', error: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch product details', error: error.message });
  }
});

// POST /api/products (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    if (!name || !description || price === undefined) {
      return res.status(400).json({ message: 'name, description and price are required' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create product', error: error.message });
  }
});

// PUT /api/products/:id (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: 'Could not update product', error: error.message });
  }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete product', error: error.message });
  }
});

module.exports = router;
