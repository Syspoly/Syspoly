const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res, next) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { isActive: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single service by slug
// @route   GET /api/services/:slug
// @access  Public
const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    await service.deleteOne();
    res.json({ success: true, message: 'Service removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
};
