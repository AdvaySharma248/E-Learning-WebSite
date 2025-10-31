const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find();
  
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course not found with id of ${req.params.id}`
    });
  }
  
  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);
  
  res.status(201).json({
    success: true,
    data: course
  });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course not found with id of ${req.params.id}`
    });
  }
  
  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course not found with id of ${req.params.id}`
    });
  }
  
  await course.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollCourse = asyncHandler(async (req, res, next) => {
  // Check if course exists
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course not found with id of ${req.params.id}`
    });
  }
  
  // Check if already enrolled
  const existingEnrollment = await Enrollment.findOne({
    userId: req.user.id,
    courseId: req.params.id
  });
  
  if (existingEnrollment) {
    return res.status(400).json({
      success: false,
      message: 'Already enrolled in this course'
    });
  }
  
  // Create enrollment
  const enrollment = await Enrollment.create({
    userId: req.user.id,
    courseId: req.params.id
  });
  
  // Increment enrolled count
  course.enrolledCount += 1;
  await course.save();
  
  res.status(201).json({
    success: true,
    data: enrollment
  });
});