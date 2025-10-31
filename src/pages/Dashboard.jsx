import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardWidget from '../components/DashboardWidget';
import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';
import { mockCourses, mockEnrollments, mockQuizzes } from '../utils/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);

  useEffect(() => {
    // Wait for user to be loaded
    if (!user || !user.id) return;

    // Get user's enrolled courses
    const userEnrollments = mockEnrollments.filter((e) => e.userId === user.id);
    const courses = userEnrollments.map((enrollment) => {
      const course = mockCourses.find((c) => c.id === enrollment.courseId);
      return {
        ...course,
        progress: enrollment.progress,
        enrolledDate: enrollment.enrolledDate
      };
    });
    setEnrolledCourses(courses);

    // Get quizzes for enrolled courses
    const quizzes = mockQuizzes.filter((q) =>
      userEnrollments.some((e) => e.courseId === q.courseId)
    );
    setUpcomingQuizzes(quizzes);
  }, [user]);

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100).length;
  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length
        )
      : 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name}! 👋</h1>
        <p className="page-description">
          Here's what's happening with your learning journey
        </p>
      </div>

      {/* Stats Widgets */}
      <div className="content-grid" style={{ marginBottom: '2rem' }}>
        <DashboardWidget
          title="Enrolled Courses"
          value={totalCourses}
          description="Active learning paths"
          icon={<BookOpen size={24} />}
          color="#4f46e5"
        />
        <DashboardWidget
          title="Completed Courses"
          value={completedCourses}
          description="Successfully finished"
          icon={<Award size={24} />}
          color="#10b981"
        />
        <DashboardWidget
          title="Average Progress"
          value={`${averageProgress}%`}
          description="Overall completion"
          icon={<TrendingUp size={24} />}
          color="#f59e0b"
        />
        <DashboardWidget
          title="Upcoming Quizzes"
          value={upcomingQuizzes.length}
          description="Tests to complete"
          icon={<Clock size={24} />}
          color="#ef4444"
        />
      </div>

      {/* Enrolled Courses */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>My Courses</h2>
          <Link to="/courses" className="btn btn-outline">
            Browse All Courses
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="content-grid">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="card">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="course-thumbnail"
                  style={{ borderRadius: '0.5rem', marginBottom: '1rem' }}
                />
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                  {course.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {course.description}
                </p>

                {/* Progress Bar */}
                <div className="progress-container">
                  <div className="progress-header">
                    <span style={{ fontWeight: 500 }}>Progress</span>
                    <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                      {course.progress}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Continue Learning
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <BookOpen size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
            <h3>No Enrolled Courses</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Start your learning journey by enrolling in a course
            </p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming Quizzes */}
      {upcomingQuizzes.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Upcoming Quizzes</h2>
          <div className="content-grid">
            {upcomingQuizzes.map((quiz) => {
              const course = mockCourses.find((c) => c.id === quiz.courseId);
              return (
                <div key={quiz.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>{quiz.title}</h3>
                    <span className="badge badge-warning">Pending</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {quiz.description}
                  </p>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <div>Course: {course?.title}</div>
                    <div>Duration: {quiz.duration} minutes</div>
                    <div>Questions: {quiz.totalQuestions}</div>
                    <div>Passing Score: {quiz.passingScore}%</div>
                  </div>
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    Start Quiz
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
