const express = require('express');
const {
  getDashboardAnalytics,
  getCourseAnalytics,
  exportCourseAnalytics,
  exportUserAnalytics
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected admin routes
router.route('/dashboard')
  .get(protect, authorize('Admin'), getDashboardAnalytics);

router.route('/courses/:courseId')
  .get(protect, authorize('Admin'), getCourseAnalytics);

router.route('/courses/:courseId/export')
  .get(protect, authorize('Admin'), exportCourseAnalytics);

router.route('/users/export')
  .get(protect, authorize('Admin'), exportUserAnalytics);

module.exports = router;