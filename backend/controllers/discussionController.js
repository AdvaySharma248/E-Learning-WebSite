const Discussion = require('../models/Discussion');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get discussions by course
// @route   GET /api/discussions/course/:courseId
// @access  Public
exports.getDiscussionsByCourse = asyncHandler(async (req, res, next) => {
  const discussions = await Discussion.find({ courseId: req.params.courseId });
  
  res.status(200).json({
    success: true,
    count: discussions.length,
    data: discussions
  });
});

// @desc    Create new discussion
// @route   POST /api/discussions
// @access  Private
exports.createDiscussion = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.create({
    ...req.body,
    author: req.user.name,
    authorId: req.user._id
  });
  
  res.status(201).json({
    success: true,
    data: discussion
  });
});

// @desc    Add comment to discussion
// @route   POST /api/discussions/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);
  
  if (!discussion) {
    return res.status(404).json({
      success: false,
      message: `Discussion not found with id of ${req.params.id}`
    });
  }
  
  const comment = {
    ...req.body,
    author: req.user.name,
    authorId: req.user._id
  };
  
  discussion.comments.push(comment);
  await discussion.save();
  
  res.status(201).json({
    success: true,
    data: discussion
  });
});

// @desc    Like discussion
// @route   POST /api/discussions/:id/like
// @access  Private
exports.likeDiscussion = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);
  
  if (!discussion) {
    return res.status(404).json({
      success: false,
      message: `Discussion not found with id of ${req.params.id}`
    });
  }
  
  discussion.likes += 1;
  await discussion.save();
  
  res.status(200).json({
    success: true,
    data: discussion
  });
});

// @desc    Delete discussion
// @route   DELETE /api/discussions/:id
// @access  Private/Admin
exports.deleteDiscussion = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);
  
  if (!discussion) {
    return res.status(404).json({
      success: false,
      message: `Discussion not found with id of ${req.params.id}`
    });
  }
  
  // Only admin or discussion author can delete
  if (req.user.role !== 'Admin' && discussion.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this discussion'
    });
  }
  
  await discussion.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Delete comment
// @route   DELETE /api/discussions/:id/comments/:commentId
// @access  Private/Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const discussion = await Discussion.findById(req.params.id);
  
  if (!discussion) {
    return res.status(404).json({
      success: false,
      message: `Discussion not found with id of ${req.params.id}`
    });
  }
  
  const comment = discussion.comments.id(req.params.commentId);
  
  if (!comment) {
    return res.status(404).json({
      success: false,
      message: 'Comment not found'
    });
  }
  
  // Only admin or comment author can delete
  if (req.user.role !== 'Admin' && comment.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this comment'
    });
  }
  
  comment.remove();
  await discussion.save();
  
  res.status(200).json({
    success: true,
    data: discussion
  });
});