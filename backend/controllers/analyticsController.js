const User = require('../models/User');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const Enrollment = require('../models/Enrollment');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get admin dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
exports.getDashboardAnalytics = asyncHandler(async (req, res, next) => {
  // Get total counts
  const totalUsers = await User.countDocuments();
  const totalCourses = await Course.countDocuments();
  const activeQuizzes = await Quiz.countDocuments();
  const totalEnrollments = await Enrollment.countDocuments();
  
  // Get monthly engagement data (simplified for demo)
  const monthlyEngagement = [
    { month: 'Jan', enrollments: 420, completions: 180 },
    { month: 'Feb', enrollments: 580, completions: 240 },
    { month: 'Mar', enrollments: 720, completions: 310 },
    { month: 'Apr', enrollments: 650, completions: 280 },
    { month: 'May', enrollments: 890, completions: 390 },
    { month: 'Jun', enrollments: 1020, completions: 450 }
  ];
  
  // Get top courses by enrollment
  const courses = await Course.find().sort({ enrolledCount: -1 }).limit(3);
  const topCourses = courses.map(course => ({
    title: course.title,
    enrollments: course.enrolledCount
  }));
  
  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalCourses,
      activeQuizzes,
      totalEnrollments,
      monthlyEngagement,
      topCourses
    }
  });
});

// @desc    Get course-specific analytics
// @route   GET /api/analytics/courses/:courseId
// @access  Private/Admin
exports.getCourseAnalytics = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: `Course not found with id of ${req.params.courseId}`
    });
  }
  
  // Get enrollment count for this course
  const enrollmentCount = await Enrollment.countDocuments({ courseId: req.params.courseId });
  
  // Get average progress for this course
  const enrollments = await Enrollment.find({ courseId: req.params.courseId });
  let totalProgress = 0;
  enrollments.forEach(enrollment => {
    totalProgress += enrollment.progress;
  });
  
  const averageProgress = enrollments.length > 0 ? Math.round(totalProgress / enrollments.length) : 0;
  
  res.status(200).json({
    success: true,
    data: {
      courseTitle: course.title,
      enrollmentCount,
      averageProgress,
      completedCount: enrollments.filter(e => e.completed).length
    }
  });
});