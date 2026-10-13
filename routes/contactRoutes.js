const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createContact)
  .get(protect, admin, getContacts);

router.route('/:id')
  .put(protect, admin, updateContactStatus)
  .delete(protect, admin, deleteContact);

module.exports = router;
