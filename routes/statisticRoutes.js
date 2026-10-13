const express = require('express');
const router = express.Router();
const {
  getStatistics,
  updateStatistic,
  createStatistic,
  deleteStatistic
} = require('../controllers/statisticController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getStatistics)
  .post(protect, admin, createStatistic);

router.route('/:id')
  .put(protect, admin, updateStatistic)
  .delete(protect, admin, deleteStatistic);

module.exports = router;
