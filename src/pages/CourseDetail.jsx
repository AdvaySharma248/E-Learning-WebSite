import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../components/VideoPlayer';
import PDFViewer from '../components/PDFViewer';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { mockCourses, mockEnrollments } from '../utils/mockData';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    // Wait for user to be loaded
    if (!user || !user.id) return;

    // Get course details
    const foundCourse = mockCourses.find((c) => c.id === parseInt(id));
    setCourse(foundCourse);

    // Check enrollment
    const enrollment = mockEnrollments.find(
      (e) => e.userId === user.id && e.courseId === parseInt(id)
    );

    if (enrollment) {
      setIsEnrolled(true);
      setCompletedModules(enrollment.completedModules || []);
    } else {
      setIsEnrolled(false);
    }

    // Select first module by default if enrolled
    if (foundCourse && enrollment) {
      setSelectedModule(foundCourse.modules[0]);
      if (foundCourse.modules[0].materials.length > 0) {
        setSelectedMaterial(foundCourse.modules[0].materials[0]);
      }
    }
  }, [id, user]);

  const handleEnroll = () => {
    // Simulate enrollment
    setIsEnrolled(true);
    if (course) {
      setSelectedModule(course.modules[0]);
      if (course.modules[0].materials.length > 0) {
        setSelectedMaterial(course.modules[0].materials[0]);
      }
    }
    alert('Successfully enrolled in the course!');
  };

  const handleModuleComplete = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Course not found</h3>
          <button onClick={() => navigate('/courses')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigate('/courses')}
        className="btn btn-outline"
        style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeft size={16} />
        Back to Courses
      </button>

      {!isEnrolled ? (
        // Course Overview (Not Enrolled)
        <div>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <img
              src={course.thumbnail}
              alt={course.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1.5rem' }}
            />

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="badge badge-primary">{course.level}</span>
              <span className="badge badge-success">
                <Star size={12} /> {course.rating}
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{course.title}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              {course.description}
            </p>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} color="var(--primary-color)" />
                <span>{course.enrolledCount} students</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="var(--primary-color)" />
                <span>{course.duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={20} color="var(--primary-color)" />
                <span>{course.modules.length} modules</span>
              </div>
            </div>

            <button onClick={handleEnroll} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '0.875rem 2rem' }}>
              Enroll Now
            </button>
          </div>

          {/* Course Curriculum */}
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Course Curriculum</h2>
            {course.modules.map((module, index) => (
              <div
                key={module.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '1rem'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  Module {index + 1}: {module.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  {module.description}
                </p>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {module.materials.length} materials
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Course Player (Enrolled)
        <div className="split-layout">
          {/* Content Area */}
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{course.title}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Instructor: {course.instructor}</p>
            </div>

            {selectedMaterial && (
              <div>
                {selectedMaterial.type === 'video' ? (
                  <VideoPlayer url={selectedMaterial.url} title={selectedMaterial.title} />
                ) : (
                  <PDFViewer url={selectedMaterial.url} title={selectedMaterial.title} />
                )}

                {selectedModule && (
                  <div className="card" style={{ marginTop: '1.5rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>{selectedModule.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      {selectedModule.description}
                    </p>

                    {!completedModules.includes(selectedModule.id) && (
                      <button
                        onClick={() => handleModuleComplete(selectedModule.id)}
                        className="btn btn-success"
                      >
                        <CheckCircle size={20} />
                        Mark as Complete
                      </button>
                    )}
                    {completedModules.includes(selectedModule.id) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-color)' }}>
                        <CheckCircle size={20} />
                        <span style={{ fontWeight: 600 }}>Completed</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modules Sidebar */}
          <div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Course Content</h3>

              {course.modules.map((module, index) => (
                <div key={module.id} style={{ marginBottom: '1rem' }}>
                  <div
                    style={{
                      padding: '0.75rem',
                      backgroundColor: selectedModule?.id === module.id ? '#eef2ff' : 'var(--light-bg)',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onClick={() => {
                      setSelectedModule(module);
                      if (module.materials.length > 0) {
                        setSelectedMaterial(module.materials[0]);
                      }
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                        Module {index + 1}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {module.title}
                      </div>
                    </div>
                    {completedModules.includes(module.id) && (
                      <CheckCircle size={20} color="var(--secondary-color)" />
                    )}
                  </div>

                  {selectedModule?.id === module.id && (
                    <div style={{ paddingLeft: '1rem' }}>
                      {module.materials.map((material) => (
                        <div
                          key={material.id}
                          onClick={() => setSelectedMaterial(material)}
                          style={{
                            padding: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: selectedMaterial?.id === material.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                            fontWeight: selectedMaterial?.id === material.id ? 600 : 400,
                            fontSize: '0.875rem'
                          }}
                        >
                          {material.type === 'video' ? (
                            <PlayCircle size={16} />
                          ) : (
                            <FileText size={16} />
                          )}
                          <span>{material.title}</span>
                          {material.duration && (
                            <span style={{ fontSize: '0.75rem', marginLeft: 'auto' }}>
                              {material.duration}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
