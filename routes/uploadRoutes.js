const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');
const { processImageUpload } = require('../services/cloudinaryService');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imageUrl = await processImageUpload(req.file);
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: imageUrl
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
