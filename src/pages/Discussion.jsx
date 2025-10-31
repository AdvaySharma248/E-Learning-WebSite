import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import DiscussionThread from '../components/DiscussionThread';
import { useAuth } from '../context/AuthContext';
import { mockDiscussions, mockCourses } from '../utils/mockData';

const Discussion = () => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    courseId: mockCourses[0]?.id || 101
  });

  // Filter discussions
  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      selectedCourse === 'All' || discussion.courseId === parseInt(selectedCourse);

    return matchesSearch && matchesCourse;
  });

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (newThread.title.trim() && newThread.content.trim()) {
      const thread = {
        id: discussions.length + 1,
        courseId: newThread.courseId,
        title: newThread.title,
        author: user.name,
        authorId: user.id,
        timestamp: new Date().toISOString(),
        content: newThread.content,
        likes: 0,
        comments: []
      };

      setDiscussions([thread, ...discussions]);
      setNewThread({ title: '', content: '', courseId: mockCourses[0]?.id || 101 });
      setShowNewThreadModal(false);
    }
  };

  const handleLike = (discussionId) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId ? { ...d, likes: d.likes + 1 } : d
      )
    );
  };

  const handleComment = (discussionId, comment) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId
          ? { ...d, comments: [...(d.comments || []), { ...comment, id: Date.now() }] }
          : d
      )
    );
  };

  const handleDelete = (discussionId) => {
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      setDiscussions(discussions.filter((d) => d.id !== discussionId));
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Discussions</h1>
            <p className="page-description">
              Connect with peers and instructors
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowNewThreadModal(true)}
          >
            <Plus size={20} />
            New Thread
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)'
            }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <select
          className="form-input"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          style={{ width: '250px' }}
        >
          <option value="All">All Courses</option>
          {mockCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Showing {filteredDiscussions.length} discussion{filteredDiscussions.length !== 1 ? 's' : ''}
      </p>

      {/* Discussions List */}
      {filteredDiscussions.length > 0 ? (
        <div className="discussion-list">
          {filteredDiscussions.map((discussion) => (
            <DiscussionThread
              key={discussion.id}
              discussion={discussion}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No Discussions Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Be the first to start a discussion!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowNewThreadModal(true)}
          >
            <Plus size={20} />
            Start Discussion
          </button>
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="modal-overlay" onClick={() => setShowNewThreadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">New Discussion Thread</h2>
              <button className="modal-close" onClick={() => setShowNewThreadModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleCreateThread}>
              <div className="form-group">
                <label className="form-label">Course</label>
                <select
                  className="form-input"
                  value={newThread.courseId}
                  onChange={(e) =>
                    setNewThread({ ...newThread, courseId: parseInt(e.target.value) })
                  }
                  required
                >
                  {mockCourses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter discussion title"
                  value={newThread.title}
                  onChange={(e) =>
                    setNewThread({ ...newThread, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  className="form-input"
                  rows="6"
                  placeholder="What would you like to discuss?"
                  value={newThread.content}
                  onChange={(e) =>
                    setNewThread({ ...newThread, content: e.target.value })
                  }
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowNewThreadModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
