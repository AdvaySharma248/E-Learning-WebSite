const express = require('express');
const {
  getDashboardAnalytics,
  getCourseAnalytics
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected admin routes
router.route('/dashboard')
  .get(protect, authorize('Admin'), getDashboardAnalytics);

router.route('/courses/:courseId')
  .get(protect, authorize('Admin'), getCourseAnalytics);

module.exports = router;