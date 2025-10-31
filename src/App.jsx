import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserRoleProvider, useRole } from './context/UserRoleContext';

// Layout Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import Discussion from './pages/Discussion';
import AdminDashboard from './pages/AdminDashboard';
import AdminCourseManager from './pages/AdminCourseManager';
import AdminQuizManager from './pages/AdminQuizManager';

// Styles
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading } = useAuth();
  const { isAdmin } = useRole();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <div className="loading" style={{ width: '40px', height: '40px' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Root Redirect Component
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  const { isAdmin } = useRole();

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} replace />;
  }
  
  return <Navigate to="/login" replace />;
};

// Layout with Sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Public Layout (No Sidebar)
const PublicLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserRoleProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            } />
            <Route path="/register" element={
              <PublicLayout>
                <Register />
              </PublicLayout>
            } />

            {/* Learner Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/courses" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Courses />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/courses/:id" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CourseDetail />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/quiz/:id" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Quiz />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/discussions" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Discussion />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute adminOnly>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/courses" element={
              <ProtectedRoute adminOnly>
                <DashboardLayout>
                  <AdminCourseManager />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/quizzes" element={
              <ProtectedRoute adminOnly>
                <DashboardLayout>
                  <AdminQuizManager />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Default redirect */}
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
        </UserRoleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
