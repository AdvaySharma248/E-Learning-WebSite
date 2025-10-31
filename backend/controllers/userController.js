const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/auth');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get user enrollments
// @route   GET /api/users/enrollments
// @access  Private
exports.getEnrollments = asyncHandler(async (req, res, next) => {
  const enrollments = await Enrollment.find({ userId: req.user.id })
    .populate('courseId');
  
  res.status(200).json({
    success: true,
    count: enrollments.length,
    data: enrollments
  });
});

// @desc    Update user progress
// @route   POST /api/users/progress
// @access  Private
exports.updateProgress = asyncHandler(async (req, res, next) => {
  const { courseId, moduleId } = req.body;
  
  // Find enrollment
  let enrollment = await Enrollment.findOne({
    userId: req.user.id,
    courseId
  });
  
  if (!enrollment) {
    return res.status(404).json({
      success: false,
      message: 'Enrollment not found'
    });
  }
  
  // Add module to completed modules if not already there
  if (!enrollment.completedModules.includes(moduleId)) {
    enrollment.completedModules.push(moduleId);
  }
  
  // Calculate progress (simplified - in a real app, you might want more complex logic)
  const course = await require('../models/Course').findById(courseId);
  const totalModules = course.modules.length;
  const completedModules = enrollment.completedModules.length;
  
  enrollment.progress = Math.round((completedModules / totalModules) * 100);
  
  // Mark as completed if all modules are done
  if (completedModules === totalModules) {
    enrollment.completed = true;
  }
  
  await enrollment.save();
  
  res.status(200).json({
    success: true,
    data: enrollment
  });
});