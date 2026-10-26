const mongoose = require('mongoose');

const SeoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: [true, 'Page identifier is required (e.g. home, about, services, projects, contact)'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    pageName: {
      type: String,
      required: [true, 'Page display name is required (e.g. Home Page)'],
      trim: true
    },
    title: {
      type: String,
      required: [true, 'SEO Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'SEO Meta Description is required'],
      trim: true
    },
    keywords: {
      type: String,
      default: '',
      trim: true
    },
    ogTitle: {
      type: String,
      default: '',
      trim: true
    },
    ogDescription: {
      type: String,
      default: '',
      trim: true
    },
    ogImage: {
      type: String,
      default: '',
      trim: true
    },
    canonicalUrl: {
      type: String,
      default: '',
      trim: true
    },
    robots: {
      type: String,
      default: 'index, follow',
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seo', SeoSchema);
