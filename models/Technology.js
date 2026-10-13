const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'CMS', 'Mobile', 'Cloud'],
      index: true
    },
    logo: {
      type: String,
      default: ''
    },
    websiteUrl: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Technology', TechnologySchema);
