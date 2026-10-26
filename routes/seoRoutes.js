const express = require('express');
const router = express.Router();
const {
  getAllSeo,
  getSeoByPage,
  createSeo,
  updateSeo,
  deleteSeo
} = require('../controllers/seoController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllSeo)
  .post(protect, admin, createSeo)
  .put(protect, admin, createSeo);

router.route('/page/:page')
  .get(getSeoByPage)
  .put(protect, admin, updateSeo)
  .post(protect, admin, updateSeo);

router.route('/:id')
  .put(protect, admin, updateSeo)
  .delete(protect, admin, deleteSeo);

module.exports = router;
