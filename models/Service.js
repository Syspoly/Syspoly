const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required']
    },
    description: {
      type: String,
      required: [true, 'Full description is required']
    },
    icon: {
      type: String,
      default: 'Code'
    },
    image: {
      type: String,
      default: ''
    },
    features: [
      {
        type: String
      }
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', ServiceSchema);
