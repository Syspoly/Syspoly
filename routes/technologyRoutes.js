const express = require('express');
const router = express.Router();
const {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology
} = require('../controllers/technologyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTechnologies)
  .post(protect, admin, createTechnology);

router.route('/:id')
  .put(protect, admin, updateTechnology)
  .delete(protect, admin, deleteTechnology);

module.exports = router;
