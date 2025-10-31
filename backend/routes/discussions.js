const express = require('express');
const {
  getDiscussionsByCourse,
  createDiscussion,
  addComment,
  likeDiscussion,
  deleteDiscussion,
  deleteComment
} = require('../controllers/discussionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public route
router.route('/course/:courseId')
  .get(getDiscussionsByCourse);

// Protected routes
router.route('/')
  .post(protect, createDiscussion);

router.route('/:id')
  .post(protect, likeDiscussion)
  .delete(protect, deleteDiscussion);

router.route('/:id/comments')
  .post(protect, addComment);

router.route('/:id/comments/:commentId')
  .delete(protect, deleteComment);

module.exports = router;