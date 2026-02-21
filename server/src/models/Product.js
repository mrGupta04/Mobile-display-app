const mongoose = require('mongoose');

const emiPlanSchema = new mongoose.Schema(
  {
    fundName: {
      type: String,
      required: true,
      trim: true,
      default: 'Axis Mutual Fund',
    },
    monthlyPayment: {
      type: Number,
      required: true,
      min: 0,
    },
    tenureMonths: {
      type: Number,
      required: true,
      min: 1,
    },
    interestRate: {
      type: Number,
      required: true,
      min: 0,
    },
    cashback: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true }
);

const variantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
      validate: [(images) => images.length >= 4, 'At least four images are required'],
    },
    emiPlans: {
      type: [emiPlanSchema],
      validate: [(plans) => plans.length > 0, 'At least one EMI plan is required'],
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      default: '',
      trim: true,
    },
    variants: {
      type: [variantSchema],
      validate: [(variants) => variants.length >= 2, 'At least two variants are required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
