const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find({}, { name: 1, slug: 1, shortDescription: 1, variants: 1 })
      .sort({ name: 1 })
      .lean();

    const payload = products.map((product) => {
      const defaultVariant = product.variants[0];

      return {
        id: product._id,
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        startingPrice: defaultVariant?.price ?? null,
        imageUrl: defaultVariant?.imageUrl ?? null,
        variantCount: product.variants.length,
      };
    });

    res.json(payload);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
