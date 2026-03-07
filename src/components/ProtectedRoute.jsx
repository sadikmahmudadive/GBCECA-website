import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userData } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (adminOnly && userData?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
