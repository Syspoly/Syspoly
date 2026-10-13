const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res, next) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { isPublished: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    next(err);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
