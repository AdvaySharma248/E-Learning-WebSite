const express = require('express');
const {
  getQuizzes,
  getQuizzesByCourse,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.route('/')
  .get(getQuizzes)
  .post(protect, authorize('Admin'), createQuiz);

router.route('/course/:courseId')
  .get(getQuizzesByCourse);

router.route('/:id')
  .get(getQuiz)
  .put(protect, authorize('Admin'), updateQuiz)
  .delete(protect, authorize('Admin'), deleteQuiz);

router.route('/:id/submit')
  .post(protect, submitQuiz);

module.exports = router;