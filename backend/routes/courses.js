const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/')
  .get(getCourses)
  .post(protect, authorize('Admin'), createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, authorize('Admin'), updateCourse)
  .delete(protect, authorize('Admin'), deleteCourse);

router.route('/:id/enroll')
  .post(protect, enrollCourse);

module.exports = router;