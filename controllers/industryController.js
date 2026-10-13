const Industry = require('../models/Industry');

const getIndustries = async (req, res, next) => {
  try {
    const industries = await Industry.find().sort({ createdAt: 1 });
    res.json({ success: true, count: industries.length, data: industries });
  } catch (err) {
    next(err);
  }
};

const createIndustry = async (req, res, next) => {
  try {
    const industry = await Industry.create(req.body);
    res.status(201).json({ success: true, data: industry });
  } catch (err) {
    next(err);
  }
};

const updateIndustry = async (req, res, next) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!industry) return res.status(404).json({ success: false, message: 'Industry not found' });
    res.json({ success: true, data: industry });
  } catch (err) {
    next(err);
  }
};

const deleteIndustry = async (req, res, next) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) return res.status(404).json({ success: false, message: 'Industry not found' });
    res.json({ success: true, message: 'Industry removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry
};
