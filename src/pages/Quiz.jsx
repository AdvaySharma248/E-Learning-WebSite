import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizTimer from '../components/QuizTimer';
import { CheckCircle, Circle, Flag, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { mockQuizzes, mockCourses } from '../utils/mockData';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const foundQuiz = mockQuizzes.find((q) => q.id === parseInt(id));
    setQuiz(foundQuiz);

    if (foundQuiz) {
      const foundCourse = mockCourses.find((c) => c.id === foundQuiz.courseId);
      setCourse(foundCourse);
    }
  }, [id]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleMarkForReview = (questionIndex) => {
    if (markedForReview.includes(questionIndex)) {
      setMarkedForReview(markedForReview.filter((i) => i !== questionIndex));
    } else {
      setMarkedForReview([...markedForReview, questionIndex]);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      // Calculate score
      let correctAnswers = 0;
      let totalObjectiveQuestions = 0;

      quiz.questions.forEach((question) => {
        if (question.type !== 'short-answer') {
          totalObjectiveQuestions++;
          const userAnswer = answers[question.id];

          if (question.type === 'mcq' && userAnswer === question.correctAnswer) {
            correctAnswers++;
          } else if (question.type === 'true-false' && userAnswer === question.correctAnswer) {
            correctAnswers++;
          }
        }
      });

      const calculatedScore = Math.round((correctAnswers / totalObjectiveQuestions) * 100);
      setScore(calculatedScore);
      setSubmitted(true);
    }
  };

  const handleTimeUp = () => {
    alert('Time is up! Your quiz will be auto-submitted.');
    handleSubmit();
  };

  const getQuestionStatus = (index) => {
    const question = quiz.questions[index];
    if (answers[question.id] !== undefined) return 'answered';
    if (markedForReview.includes(index)) return 'marked';
    return 'unanswered';
  };

  if (!quiz || !course) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Quiz not found</h3>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const passed = score >= quiz.passingScore;

    return (
      <div className="page-container">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: passed ? '#d1fae5' : '#fee2e2',
              color: passed ? '#065f46' : '#991b1b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 auto 1.5rem'
            }}
          >
            {score}%
          </div>

          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {passed
              ? `You've passed the quiz! Your score: ${score}%`
              : `You scored ${score}%. Passing score is ${quiz.passingScore}%. Try again!`}
          </p>

          {/* Answer Review */}
          <div style={{ textAlign: 'left', marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Answer Review</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect =
                question.type === 'short-answer' ||
                (question.type === 'mcq' && userAnswer === question.correctAnswer) ||
                (question.type === 'true-false' && userAnswer === question.correctAnswer);

              return (
                <div
                  key={question.id}
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: 'var(--light-bg)',
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${
                      question.type === 'short-answer'
                        ? 'var(--warning-color)'
                        : isCorrect
                        ? 'var(--secondary-color)'
                        : 'var(--danger-color)'
                    }`
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                    Question {index + 1}
                  </div>
                  <p style={{ marginBottom: '0.5rem' }}>{question.question}</p>

                  {question.type === 'short-answer' ? (
                    <div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <strong>Your Answer:</strong> {userAnswer || 'Not answered'}
                      </p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--warning-color)', marginTop: '0.5rem' }}>
                        ⚠️ This answer will be graded manually
                      </p>
                    </div>
                  ) : (
                    <div>
                      {question.type === 'mcq' && (
                        <div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <strong>Your Answer:</strong>{' '}
                            {userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                            <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      )}
                      {question.type === 'true-false' && (
                        <div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <strong>Your Answer:</strong>{' '}
                            {userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'Not answered'}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                            <strong>Correct Answer:</strong> {question.correctAnswer ? 'True' : 'False'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button onClick={() => navigate('/dashboard')} className="btn btn-outline">
              Back to Dashboard
            </button>
            {!passed && (
              <button onClick={() => window.location.reload()} className="btn btn-primary">
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const totalAnswered = Object.keys(answers).length;
  const progressPercentage = Math.round((totalAnswered / quiz.questions.length) * 100);

  return (
    <div className="page-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        {/* Quiz Content */}
        <div>
          <div className="quiz-container">
            {/* Quiz Header */}
            <div className="quiz-header">
              <div>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{quiz.title}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {course.title}
                </p>
              </div>
              <QuizTimer duration={quiz.duration} onTimeUp={handleTimeUp} />
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress">
              <div className="progress-header">
                <span>Overall Progress</span>
                <span>
                  {totalAnswered} / {quiz.questions.length} Answered ({progressPercentage}%)
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>

            {/* Question */}
            <div className="question-container">
              <p className="question-number">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
              <h2 className="question-text">{question.question}</h2>

              {/* MCQ Options */}
              {question.type === 'mcq' && (
                <div className="options-container">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`option ${answers[question.id] === index ? 'selected' : ''}`}
                      onClick={() => handleAnswer(question.id, index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {/* True/False */}
              {question.type === 'true-false' && (
                <div className="options-container">
                  <div
                    className={`option ${answers[question.id] === true ? 'selected' : ''}`}
                    onClick={() => handleAnswer(question.id, true)}
                  >
                    True
                  </div>
                  <div
                    className={`option ${answers[question.id] === false ? 'selected' : ''}`}
                    onClick={() => handleAnswer(question.id, false)}
                  >
                    False
                  </div>
                </div>
              )}

              {/* Short Answer */}
              {question.type === 'short-answer' && (
                <div>
                  <textarea
                    className="form-input"
                    rows="6"
                    placeholder="Type your answer here..."
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="question-navigation">
              <div>
                <button
                  className="btn btn-outline"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              </div>

              <button
                className="btn btn-outline"
                onClick={() => handleMarkForReview(currentQuestion)}
                style={{
                  backgroundColor: markedForReview.includes(currentQuestion) ? 'var(--warning-color)' : '',
                  color: markedForReview.includes(currentQuestion) ? 'var(--white)' : ''
                }}
              >
                <Flag size={16} />
                {markedForReview.includes(currentQuestion) ? 'Unmark' : 'Mark for Review'}
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {currentQuestion < quiz.questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleSubmit}>
                    <Send size={16} />
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Question Sidebar */}
        <div className="question-sidebar">
          <h3 style={{ marginBottom: '1rem' }}>Questions</h3>
          <div className="question-grid">
            {quiz.questions.map((q, index) => {
              const status = getQuestionStatus(index);
              return (
                <div
                  key={q.id}
                  className={`question-badge ${index === currentQuestion ? 'current' : ''} ${
                    status === 'answered' ? 'answered' : ''
                  } ${status === 'marked' ? 'marked' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ marginTop: '1.5rem', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--primary-color)', borderRadius: '0.25rem' }} />
              <span>Current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--secondary-color)', borderRadius: '0.25rem' }} />
              <span>Answered</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--warning-color)', borderRadius: '0.25rem' }} />
              <span>Marked</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', border: '2px solid var(--border-color)', borderRadius: '0.25rem' }} />
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
