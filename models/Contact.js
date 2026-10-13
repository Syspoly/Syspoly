const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    company: {
      type: String,
      default: ''
    },
    service: {
      type: String,
      required: [true, 'Service selection is required']
    },
    budget: {
      type: String,
      default: 'Flexible'
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
      default: 'New',
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
