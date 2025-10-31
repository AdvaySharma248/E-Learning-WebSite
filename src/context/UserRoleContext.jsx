import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const UserRoleContext = createContext(null);

export const UserRoleProvider = ({ children }) => {
  const { user } = useAuth();

  const isAdmin = user?.role === 'Admin';
  const isLearner = user?.role === 'Learner';

  const value = {
    role: user?.role || null,
    isAdmin,
    isLearner
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

// Custom hook to use role context
export const useRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useRole must be used within a UserRoleProvider');
  }
  return context;
};

export default UserRoleContext;
