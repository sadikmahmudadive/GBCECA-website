import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, userData } = useAuth();
  
  // Checking if the user is authenticated and has an admin role
  if (!currentUser) return <Navigate to="/login" replace />;
  if (userData?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return children;
};

export default AdminRoute;