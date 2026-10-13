const Contact = require('../models/Contact');
const { sendContactNotification } = require('../services/emailService');

// @desc    Submit new contact/enquiry
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);

    // Dispatch email notification asynchronously
    try {
      await sendContactNotification(contact);
    } catch (emailErr) {
      console.error('Email dispatch non-blocking error:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our expert team will contact you shortly.',
      data: contact
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all enquiries
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/contacts/:id
// @access  Private/Admin
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
