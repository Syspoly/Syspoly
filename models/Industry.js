const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'Building2'
    },
    image: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Industry', IndustrySchema);
