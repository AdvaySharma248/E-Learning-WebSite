import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockQuizzes, mockCourses } from '../utils/mockData';

const AdminQuizManager = () => {
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: mockCourses[0]?.id || 101,
    duration: 30,
    passingScore: 70
  });

  const handleCreateQuiz = () => {
    setEditingQuiz(null);
    setFormData({
      title: '',
      description: '',
      courseId: mockCourses[0]?.id || 101,
      duration: 30,
      passingScore: 70
    });
    setShowModal(true);
  };

  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description,
      courseId: quiz.courseId,
      duration: quiz.duration,
      passingScore: quiz.passingScore
    });
    setShowModal(true);
  };

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter((q) => q.id !== quizId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingQuiz) {
      // Update existing quiz
      setQuizzes(
        quizzes.map((q) =>
          q.id === editingQuiz.id
            ? {
                ...q,
                ...formData
              }
            : q
        )
      );
    } else {
      // Create new quiz
      const newQuiz = {
        id: Math.max(...quizzes.map((q) => q.id)) + 1,
        ...formData,
        totalQuestions: 0,
        questions: []
      };
      setQuizzes([...quizzes, newQuiz]);
    }

    setShowModal(false);
  };

  const getCourseTitle = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Quiz Management</h1>
            <p className="page-description">
              Create and manage quizzes and assessments
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleCreateQuiz}>
            <Plus size={20} />
            Add Quiz
          </button>
        </div>
      </div>

      {/* Quizzes Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Course</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Passing Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>#{quiz.id}</td>
                <td style={{ fontWeight: 600 }}>{quiz.title}</td>
                <td>{getCourseTitle(quiz.courseId)}</td>
                <td>{quiz.duration} min</td>
                <td>{quiz.totalQuestions || quiz.questions?.length || 0}</td>
                <td>{quiz.passingScore}%</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleEditQuiz(quiz)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quiz Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Quiz Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter quiz title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Enter quiz description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Course</label>
                <select
                  className="form-input"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: parseInt(e.target.value) })}
                  required
                >
                  {mockCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="30"
                    min="5"
                    max="180"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Passing Score (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="70"
                    min="0"
                    max="100"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Note: Questions can be added after creating the quiz
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuizManager;
