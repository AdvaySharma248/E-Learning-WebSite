import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockCourses } from '../utils/mockData';

const AdminCourseManager = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    thumbnail: ''
  });

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      thumbnail: ''
    });
    setShowModal(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      thumbnail: course.thumbnail
    });
    setShowModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== courseId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCourse) {
      // Update existing course
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                ...formData
              }
            : c
        )
      );
    } else {
      // Create new course
      const newCourse = {
        id: Math.max(...courses.map((c) => c.id)) + 1,
        ...formData,
        enrolledCount: 0,
        rating: 0,
        modules: []
      };
      setCourses([...courses, newCourse]);
    }

    setShowModal(false);
  };

  // Module Management (nested within course)
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    materials: []
  });

  const handleAddModule = (course) => {
    setSelectedCourse(course);
    setModuleData({ title: '', description: '', materials: [] });
    setShowModuleModal(true);
  };

  const handleModuleSubmit = (e) => {
    e.preventDefault();

    setCourses(
      courses.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              modules: [
                ...c.modules,
                {
                  id: c.modules.length + 1,
                  ...moduleData
                }
              ]
            }
          : c
      )
    );

    setShowModuleModal(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Course Management</h1>
            <p className="page-description">
              Create, edit, and manage courses
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleCreateCourse}>
            <Plus size={20} />
            Add Course
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Modules</th>
              <th>Enrollments</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>#{course.id}</td>
                <td style={{ fontWeight: 600 }}>{course.title}</td>
                <td>{course.instructor}</td>
                <td>
                  <span className="badge badge-primary">{course.level}</span>
                </td>
                <td>{course.duration}</td>
                <td>{course.modules?.length || 0}</td>
                <td>{course.enrolledCount}</td>
                <td>{course.rating}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleAddModule(course)}
                      title="Add Module"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleEditCourse(course)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleDeleteCourse(course.id)}
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

      {/* Course Form Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="4"
                  placeholder="Enter course description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instructor</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Instructor name"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 8 weeks"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Level</label>
                  <select
                    className="form-input"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Thumbnail URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Module Form Modal */}
      {showModuleModal && (
        <div className="modal-overlay" onClick={() => setShowModuleModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Module to {selectedCourse?.title}</h2>
              <button className="modal-close" onClick={() => setShowModuleModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleModuleSubmit}>
              <div className="form-group">
                <label className="form-label">Module Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter module title"
                  value={moduleData.title}
                  onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Enter module description"
                  value={moduleData.description}
                  onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
                  required
                />
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Note: Materials (PDFs, videos) can be added after creating the module
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowModuleModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManager;
