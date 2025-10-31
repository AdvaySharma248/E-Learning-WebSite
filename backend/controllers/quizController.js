const Quiz = require('../models/Quiz');
const asyncHandler = require('../middleware/asyncHandler');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = asyncHandler(async (req, res, next) => {
  const quizzes = await Quiz.find();
  
  res.status(200).json({
    success: true,
    count: quizzes.length,
    data: quizzes
  });
});

// @desc    Get quizzes by course
// @route   GET /api/quizzes/course/:courseId
// @access  Public
exports.getQuizzesByCourse = asyncHandler(async (req, res, next) => {
  const quizzes = await Quiz.find({ courseId: req.params.courseId });
  
  res.status(200).json({
    success: true,
    count: quizzes.length,
    data: quizzes
  });
});

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: `Quiz not found with id of ${req.params.id}`
    });
  }
  
  res.status(200).json({
    success: true,
    data: quiz
  });
});

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
exports.createQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.create(req.body);
  
  res.status(201).json({
    success: true,
    data: quiz
  });
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: `Quiz not found with id of ${req.params.id}`
    });
  }
  
  res.status(200).json({
    success: true,
    data: quiz
  });
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: `Quiz not found with id of ${req.params.id}`
    });
  }
  
  await quiz.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private
exports.submitQuiz = asyncHandler(async (req, res, next) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: `Quiz not found with id of ${req.params.id}`
    });
  }
  
  // Calculate score
  let correctAnswers = 0;
  let totalQuestions = quiz.questions.length;
  
  for (let i = 0; i < totalQuestions; i++) {
    const question = quiz.questions[i];
    const userAnswer = answers[i];
    
    // For MCQ and True/False questions
    if (question.type === 'mcq' || question.type === 'true-false') {
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    }
    // For short answer questions, we'll mark them as correct for now
    // In a real application, this would require manual grading
    else if (question.type === 'short-answer') {
      correctAnswers++;
    }
  }
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = score >= quiz.passingScore;
  
  res.status(200).json({
    success: true,
    data: {
      score,
      passed,
      correctAnswers,
      totalQuestions
    }
  });
});