const Statistic = require('../models/Statistic');

const getStatistics = async (req, res, next) => {
  try {
    const stats = await Statistic.find().sort({ order: 1 });
    res.json({ success: true, count: stats.length, data: stats });
  } catch (err) {
    next(err);
  }
};

const updateStatistic = async (req, res, next) => {
  try {
    const stat = await Statistic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!stat) return res.status(404).json({ success: false, message: 'Statistic not found' });
    res.json({ success: true, data: stat });
  } catch (err) {
    next(err);
  }
};

const createStatistic = async (req, res, next) => {
  try {
    const stat = await Statistic.create(req.body);
    res.status(201).json({ success: true, data: stat });
  } catch (err) {
    next(err);
  }
};

const deleteStatistic = async (req, res, next) => {
  try {
    const stat = await Statistic.findByIdAndDelete(req.params.id);
    if (!stat) return res.status(404).json({ success: false, message: 'Statistic not found' });
    res.json({ success: true, message: 'Statistic removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStatistics,
  updateStatistic,
  createStatistic,
  deleteStatistic
};
