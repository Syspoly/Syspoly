const Technology = require('../models/Technology');

const getTechnologies = async (req, res, next) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { isActive: true };
    const technologies = await Technology.find(filter).sort({ order: 1 });
    res.json({ success: true, count: technologies.length, data: technologies });
  } catch (err) {
    next(err);
  }
};

const createTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.create(req.body);
    res.status(201).json({ success: true, data: tech });
  } catch (err) {
    next(err);
  }
};

const updateTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
    res.json({ success: true, data: tech });
  } catch (err) {
    next(err);
  }
};

const deleteTechnology = async (req, res, next) => {
  try {
    const tech = await Technology.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ success: false, message: 'Technology not found' });
    res.json({ success: true, message: 'Technology removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology
};
