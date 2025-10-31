import { useState } from 'react';
import DashboardWidget from '../components/DashboardWidget';
import { Users, BookOpen, FileQuestion, TrendingUp, Download } from 'lucide-react';
import { mockAnalytics } from '../utils/mockData';
import { analyticsAPI } from '../utils/api';

const AdminDashboard = () => {
  const [exporting, setExporting] = useState({ course: false, user: false });

  const handleExportCourseStats = async () => {
    setExporting({ ...exporting, course: true });
    try {
      // In a real implementation, you would pass a specific course ID
      // For demo purposes, we'll just show an alert
      alert('In a real implementation, this would export course analytics as CSV');
      
      // Example of how to implement in a real app:
      /*
      const response = await analyticsAPI.exportCourseStats(courseId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'course-analytics.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      */
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting({ ...exporting, course: false });
    }
  };

  const handleExportUserStats = async () => {
    setExporting({ ...exporting, user: true });
    try {
      // In a real implementation, this would export user analytics as CSV
      alert('In a real implementation, this would export user analytics as CSV');
      
      // Example of how to implement in a real app:
      /*
      const response = await analyticsAPI.exportUserStats();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'user-analytics.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      */
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting({ ...exporting, user: false });
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">
          Overview of platform analytics and statistics
        </p>
      </div>

      {/* Export Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          className="btn btn-outline" 
          onClick={handleExportCourseStats}
          disabled={exporting.course}
        >
          <Download size={16} />
          {exporting.course ? 'Exporting...' : 'Export Course Analytics (CSV)'}
        </button>
        <button 
          className="btn btn-outline" 
          onClick={handleExportUserStats}
          disabled={exporting.user}
        >
          <Download size={16} />
          {exporting.user ? 'Exporting...' : 'Export User Analytics (CSV)'}
        </button>
      </div>

      {/* Stats Widgets */}
      <div className="content-grid" style={{ marginBottom: '2rem' }}>
        <DashboardWidget
          title="Total Users"
          value={mockAnalytics.totalUsers.toLocaleString()}
          description="Registered learners"
          icon={<Users size={24} />}
          color="#4f46e5"
        />
        <DashboardWidget
          title="Total Courses"
          value={mockAnalytics.totalCourses}
          description="Active courses"
          icon={<BookOpen size={24} />}
          color="#10b981"
        />
        <DashboardWidget
          title="Active Quizzes"
          value={mockAnalytics.activeQuizzes}
          description="Published assessments"
          icon={<FileQuestion size={24} />}
          color="#f59e0b"
        />
        <DashboardWidget
          title="Total Enrollments"
          value={mockAnalytics.totalEnrollments.toLocaleString()}
          description="All-time enrollments"
          icon={<TrendingUp size={24} />}
          color="#ef4444"
        />
      </div>

      {/* Engagement Chart */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Monthly Engagement</h2>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '600px', height: '300px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '1rem' }}>
            {mockAnalytics.monthlyEngagement.map((data) => {
              const maxValue = Math.max(...mockAnalytics.monthlyEngagement.map((d) => d.enrollments));
              const enrollmentHeight = (data.enrollments / maxValue) * 250;
              const completionHeight = (data.completions / maxValue) * 250;

              return (
                <div key={data.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', height: '250px' }}>
                    <div
                      style={{
                        width: '30px',
                        height: `${enrollmentHeight}px`,
                        backgroundColor: 'var(--primary-color)',
                        borderRadius: '0.25rem 0.25rem 0 0',
                        position: 'relative'
                      }}
                      title={`Enrollments: ${data.enrollments}`}
                    >
                      <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {data.enrollments}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '30px',
                        height: `${completionHeight}px`,
                        backgroundColor: 'var(--secondary-color)',
                        borderRadius: '0.25rem 0.25rem 0 0',
                        position: 'relative'
                      }}
                      title={`Completions: ${data.completions}`}
                    >
                      <span style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {data.completions}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--primary-color)', borderRadius: '0.25rem' }} />
            <span style={{ fontSize: '0.875rem' }}>Enrollments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--secondary-color)', borderRadius: '0.25rem' }} />
            <span style={{ fontSize: '0.875rem' }}>Completions</span>
          </div>
        </div>
      </div>

      {/* Top Courses */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Top Performing Courses</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Course Title</th>
                <th>Enrollments</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalytics.topCourses.map((course, index) => {
                const percentage = Math.round((course.enrollments / mockAnalytics.topCourses[0].enrollments) * 100);
                return (
                  <tr key={index}>
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : '#cd7f32',
                        color: 'white',
                        fontWeight: 600
                      }}>
                        {index + 1}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{course.title}</td>
                    <td>{course.enrollments.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '9999px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: 'var(--primary-color)',
                            borderRadius: '9999px'
                          }} />
                        </div>
                        <span style={{ fontWeight: 600, minWidth: '50px' }}>{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;