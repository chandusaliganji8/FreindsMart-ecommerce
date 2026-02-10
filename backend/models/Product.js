const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    brand: {
      type: String,
      default: 'Generic',
    },
    category: {
      type: String,
      default: 'General',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/400x300?text=Product',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
