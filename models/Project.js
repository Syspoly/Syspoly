const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Web', 'Mobile', 'E-commerce', 'SaaS', 'UI/UX', 'Digital Marketing'],
      index: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    client: {
      type: String,
      default: 'Confidential Client'
    },
    industry: {
      type: String,
      default: 'Technology'
    },
    technologies: [
      {
        type: String
      }
    ],
    challenge: {
      type: String,
      default: ''
    },
    solution: {
      type: String,
      default: ''
    },
    results: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      required: [true, 'Cover image URL is required']
    },
    gallery: [
      {
        type: String
      }
    ],
    projectUrl: {
      type: String,
      default: ''
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
