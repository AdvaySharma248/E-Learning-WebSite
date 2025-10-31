import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/UserRoleContext';
import { GraduationCap, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="navbar-brand">
          <GraduationCap size={32} />
          <span>SkillNest</span>
        </Link>

        {user && (
          <div className="navbar-user">
            <div className="user-avatar">
              {getInitials(user.name)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
