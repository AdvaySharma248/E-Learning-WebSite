const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['mcq', 'true-false', 'short-answer'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed // Can be index for MCQ, boolean for true/false, or null for short answer
  }
});

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a quiz description']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide quiz duration in minutes']
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);