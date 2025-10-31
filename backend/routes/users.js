const express = require('express');
const {
  getProfile,
  updateProfile,
  getEnrollments,
  updateProgress
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.route('/enrollments')
  .get(protect, getEnrollments);

router.route('/progress')
  .post(protect, updateProgress);

module.exports = router;