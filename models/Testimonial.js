const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      default: 'CEO'
    },
    message: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    image: {
      type: String,
      default: ''
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
