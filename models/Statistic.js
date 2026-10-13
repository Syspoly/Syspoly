const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true
    },
    suffix: {
      type: String,
      default: '+'
    },
    icon: {
      type: String,
      default: 'Award'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Statistic', StatisticSchema);
